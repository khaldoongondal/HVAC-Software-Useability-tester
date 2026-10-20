import { z } from 'zod';

export const Dimension = z.enum(['time', 'cognitive', 'language', 'recovery']);
export const Section = z.enum(['Eliminated Steps', 'Layout & Structural Rearrangements', 'Trade-Specific Microcopy Rewrites', 'Friction-Absorbing Engineering Enhancements']);
export const PersonaSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/), name: z.string(), age: z.number().int(),
  profile: z.string(), business: z.string(), techLiteracy: z.enum(['low', 'medium', 'high']),
  goals: z.array(z.string()), context: z.array(z.string()),
  viewport: z.object({ width: z.number().int().positive(), height: z.number().int().positive() }).strict(),
  touch: z.boolean(), typingDelayMs: z.number().min(0).max(200), thinkDelayMs: z.number().min(0).max(3000),
  networkLatencyMs: z.number().min(0).max(2000), downloadKbps: z.number().positive(),
  targetSizePx: z.number().min(24).max(64), patienceSteps: z.number().int().min(1).max(60)
}).strict();
export type Persona = z.infer<typeof PersonaSchema>;

export const TargetSchema = z.object({ by: z.enum(['role', 'label', 'text', 'testId']), value: z.string().min(1).max(300), role: z.string().max(40).optional() }).strict();
export type Target = z.infer<typeof TargetSchema>;
export const ActionSchema = z.object({
  type: z.enum(['click', 'fill', 'press', 'check', 'select', 'wait', 'reload', 'interrupt', 'typo', 'misclick']),
  target: TargetSchema.optional(), value: z.string().max(2000).optional(), durationMs: z.number().int().min(0).max(10000).optional(),
  note: z.string().max(500).optional()
}).strict();
export type Action = z.infer<typeof ActionSchema>;
export const JourneySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/), name: z.string(), goal: z.string(), path: z.string().startsWith('/'),
  scope: z.enum(['supported', 'exploratory']), personas: z.array(z.string()).min(1),
  budgetSeconds: z.number().positive(), maxSteps: z.number().int().min(1).max(60),
  actions: z.array(ActionSchema), success: TargetSchema,
  expectedText: z.string().min(1).optional(), notes: z.array(z.string()),
  allowedControls: z.array(TargetSchema).default([])
}).strict();
export type Journey = z.infer<typeof JourneySchema>;
export const ConfigSchema = z.object({
  name: z.string(), baseUrl: z.url(), environment: z.enum(['fixture', 'staging', 'production']),
  allowedOrigins: z.array(z.url()).min(1), allowedPaths: z.array(z.string().startsWith('/')).min(1),
  mutationPaths: z.array(z.string().startsWith('/')).default([]), isolatedTenant: z.string().default(''),
  journeys: z.array(JourneySchema).min(1), seed: z.number().int().default(42),
  redactSelectors: z.array(z.string()).default([]), captureScreenshots: z.boolean().default(false),
  allowModelDataTransfer: z.boolean().default(false)
}).strict();
export type AuditConfig = z.infer<typeof ConfigSchema>;

export const EvidenceSchema = z.object({
  id: z.string(), kind: z.enum(['snapshot', 'action', 'assertion', 'accessibility', 'network', 'error', 'metric']),
  summary: z.string(), url: z.string(), timestamp: z.string(), screenshot: z.string().optional(),
  details: z.string().optional()
}).strict();
export type Evidence = z.infer<typeof EvidenceSchema>;
export const FindingSchema = z.object({
  id: z.string(), rule: z.string(), title: z.string(), detail: z.string(),
  dimension: Dimension, severity: z.enum(['critical', 'high', 'medium', 'low']),
  confidence: z.enum(['measured', 'heuristic', 'hypothesis']), scope: z.enum(['in-scope', 'opportunity']),
  evidenceIds: z.array(z.string()).min(1), recommendation: z.object({ section: Section, change: z.string(), before: z.string().optional(), after: z.string().optional() }).strict()
}).strict();
export type Finding = z.infer<typeof FindingSchema>;
export const ResultSchema = z.object({
  personaId: z.string(), journeyId: z.string(), journeyName: z.string(),
  status: z.enum(['completed', 'failed', 'blocked', 'not-run', 'unsupported']),
  reason: z.string(), elapsedMs: z.number().nonnegative(), injectedDelayMs: z.number().nonnegative(),
  stepCount: z.number().int().nonnegative(), budgetSeconds: z.number().positive(),
  evidence: z.array(EvidenceSchema), findings: z.array(FindingSchema)
}).strict();
export type JourneyResult = z.infer<typeof ResultSchema>;
export const ReportSchema = z.object({
  schemaVersion: z.literal('1.0'), runId: z.string(), createdAt: z.string(), target: z.string(),
  environment: z.enum(['fixture', 'staging', 'production']), mode: z.enum(['scripted', 'agent', 'inspect']),
  seed: z.number().int(), personas: z.array(PersonaSchema), results: z.array(ResultSchema),
  limitations: z.array(z.string()), sourceRevision: z.string()
}).strict();
export type AuditReport = z.infer<typeof ReportSchema>;

export const DecisionSchema = z.object({
  action: z.enum(['click', 'fill', 'press', 'check', 'select', 'wait', 'done', 'blocked']),
  ref: z.string().regex(/^e[1-9][0-9]{0,2}$/).nullable(), value: z.string().max(2000).nullable(), rationale: z.string().max(1000)
}).strict();
export type Decision = z.infer<typeof DecisionSchema>;
