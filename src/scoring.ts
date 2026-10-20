import { ReportSchema, type AuditReport, type Finding, type JourneyResult } from './schema.js';

export type DimensionName = Finding['dimension'];
export const WEIGHTS: Readonly<Record<DimensionName, number>> = Object.freeze({ time: 30, cognitive: 25, language: 20, recovery: 25 });
export const SEVERITY_PENALTIES: Readonly<Record<Finding['severity'], number>> = Object.freeze({ critical: 40, high: 25, medium: 12, low: 5 });
export const RUBRIC_VERSION = 'engineering-rubric-1.0';

export type DimensionScores = Record<DimensionName, number | null>;
export interface AssessmentScore {
  personaId: string;
  journeyId: string;
  journeyName: string;
  status: JourneyResult['status'];
  assessed: boolean;
  exclusionReason: string | null;
  total: number | null;
  dimensions: DimensionScores;
  adjustedElapsedMs: number;
  budgetSeconds: number;
  partial: boolean;
  appliedFindingIds: string[];
}
export interface Coverage {
  total: number;
  assessed: number;
  excluded: number;
  percent: number;
  completed: number;
  failed: number;
  /** Completed / evidence-backed assessed cases. Null when there are no assessed cases. */
  completionRate: number | null;
  partial: boolean;
  statuses: Record<JourneyResult['status'], number>;
}
export interface PersonaScore {
  personaId: string;
  name: string;
  total: number | null;
  dimensions: DimensionScores;
  coverage: Coverage;
}
export interface ScoreSummary {
  rubricVersion: string;
  total: number | null;
  dimensions: DimensionScores;
  coverage: Coverage;
  assessments: AssessmentScore[];
  personas: PersonaScore[];
}

const dimensionNames = Object.keys(WEIGHTS) as DimensionName[];
const round = (value: number): number => Math.round(value * 10) / 10;
const blankDimensions = (): DimensionScores => ({ time: null, cognitive: null, language: null, recovery: null });

/** Reject references outside the finding's own journey result before rendering or scoring. */
export function validateReport(report: AuditReport): AuditReport {
  const parsed = ReportSchema.parse(report);
  const personaIds = new Set<string>();
  for (const persona of parsed.personas) {
    if (personaIds.has(persona.id)) throw new Error(`Duplicate persona ID: ${persona.id}`);
    personaIds.add(persona.id);
  }
  const pairs = new Set<string>();
  for (const result of parsed.results) {
    if (!personaIds.has(result.personaId)) throw new Error(`Unknown persona ID: ${result.personaId}`);
    const pair = JSON.stringify([result.personaId, result.journeyId]);
    if (pairs.has(pair)) throw new Error(`Duplicate persona/journey case: ${result.personaId}/${result.journeyId}`);
    pairs.add(pair);
    const evidenceIds = new Set<string>();
    for (const evidence of result.evidence) {
      if (evidenceIds.has(evidence.id)) throw new Error(`Duplicate evidence ID in ${result.journeyId}: ${evidence.id}`);
      evidenceIds.add(evidence.id);
    }
    const findingIds = new Set<string>();
    for (const finding of result.findings) {
      if (findingIds.has(finding.id)) throw new Error(`Duplicate finding ID in ${result.journeyId}: ${finding.id}`);
      findingIds.add(finding.id);
      for (const id of finding.evidenceIds) {
        if (!evidenceIds.has(id)) throw new Error(`Finding ${finding.id} references missing evidence ${id} in ${result.personaId}/${result.journeyId}`);
      }
    }
  }
  return parsed;
}

function weightedTotal(dimensions: DimensionScores): number | null {
  let score = 0;
  let weight = 0;
  for (const dimension of dimensionNames) {
    const value = dimensions[dimension];
    if (value !== null) { score += value * WEIGHTS[dimension]; weight += WEIGHTS[dimension]; }
  }
  return weight === 0 ? null : round(score / weight);
}

function assess(result: JourneyResult, mode: AuditReport['mode']): AssessmentScore {
  const adjustedElapsedMs = Math.max(0, result.elapsedMs - result.injectedDelayMs);
  const evidenceBacked = result.evidence.length > 0;
  const assessed = mode !== 'inspect' && (result.status === 'completed' || result.status === 'failed') && evidenceBacked;
  const dimensions = blankDimensions();
  const base = {
    personaId: result.personaId, journeyId: result.journeyId, journeyName: result.journeyName,
    status: result.status, adjustedElapsedMs, budgetSeconds: result.budgetSeconds,
  };
  if (!assessed) return { ...base, assessed: false, dimensions, total: null, partial: true, appliedFindingIds: [], exclusionReason: mode === 'inspect' ? 'Inspect-only mode does not verify a journey.' : evidenceBacked ? `Status ${result.status} is excluded from scoring.` : 'No recorded evidence supports assessment.' };

  // Time is scored only against an actual journey budget. Inspect-only visits do not
  // complete a journey and were excluded above, even if a caller mislabeled their status.
  // No rule penalty is added to time: the measured overrun already captures it.
  const ratio = adjustedElapsedMs / (result.budgetSeconds * 1000);
  dimensions.time = round(Math.max(0, 100 - Math.max(0, ratio - 1) * 50));
  dimensions.cognitive = dimensions.language = dimensions.recovery = 100;

  // Repeated observations of a single rule are one penalty for this case. Keep
  // the strongest supported severity, including when detectors disagree on dimension.
  const strongest = new Map<string, Finding>();
  for (const finding of result.findings) {
    if (finding.confidence === 'hypothesis' || finding.scope !== 'in-scope' || finding.dimension === 'time') continue;
    const previous = strongest.get(finding.rule);
    if (!previous || SEVERITY_PENALTIES[finding.severity] > SEVERITY_PENALTIES[previous.severity]) strongest.set(finding.rule, finding);
  }
  const appliedFindingIds: string[] = [];
  for (const finding of strongest.values()) {
    const previous = dimensions[finding.dimension];
    dimensions[finding.dimension] = Math.max(0, (previous ?? 100) - SEVERITY_PENALTIES[finding.severity]);
    appliedFindingIds.push(finding.id);
  }
  return { ...base, assessed: true, dimensions, total: weightedTotal(dimensions), partial: false, appliedFindingIds, exclusionReason: null };
}

function coverageFor(assessments: AssessmentScore[]): Coverage {
  const statuses: Coverage['statuses'] = { completed: 0, failed: 0, blocked: 0, 'not-run': 0, unsupported: 0 };
  for (const assessment of assessments) statuses[assessment.status] += 1;
  const eligible = assessments.filter(assessment => assessment.assessed);
  const completed = eligible.filter(assessment => assessment.status === 'completed').length;
  const failed = eligible.filter(assessment => assessment.status === 'failed').length;
  return {
    total: assessments.length, assessed: eligible.length, excluded: assessments.length - eligible.length,
    percent: assessments.length ? round(eligible.length / assessments.length * 100) : 0,
    completed, failed, completionRate: eligible.length ? round(completed / eligible.length * 100) : null,
    partial: eligible.length === 0 || eligible.length !== assessments.length || eligible.some(assessment => assessment.partial), statuses,
  };
}

function aggregate(assessments: AssessmentScore[]): { total: number | null; dimensions: DimensionScores } {
  const dimensions = blankDimensions();
  for (const dimension of dimensionNames) {
    const values = assessments.map(assessment => assessment.dimensions[dimension]).filter((value): value is number => value !== null);
    if (values.length) dimensions[dimension] = round(values.reduce((sum, value) => sum + value, 0) / values.length);
  }
  return { total: weightedTotal(dimensions), dimensions };
}

/** A reproducible engineering heuristic, never a validated human usability measurement. */
export function scoreReport(report: AuditReport): ScoreSummary {
  const validated = validateReport(report);
  const assessments = validated.results.map(result => assess(result, validated.mode));
  return {
    rubricVersion: RUBRIC_VERSION, ...aggregate(assessments), coverage: coverageFor(assessments), assessments,
    personas: validated.personas.map(persona => {
      const cases = assessments.filter(assessment => assessment.personaId === persona.id);
      return { personaId: persona.id, name: persona.name, ...aggregate(cases), coverage: coverageFor(cases) };
    }),
  };
}
