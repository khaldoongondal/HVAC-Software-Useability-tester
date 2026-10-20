import type { Persona } from './schema.js';

/** Fictional evaluation lenses, not research participants or demographic predictions. */
export const personas: Persona[] = [
  {
    id: 'paper-to-digital', name: 'The Paper-to-Digital Transitioner', age: 58,
    profile: 'Built a heating and cooling business using carbon-copy invoices. This fictional owner wants familiar, shallow navigation and clear confirmation while learning a new tool.',
    business: 'Four-person residential HVAC business', techLiteracy: 'low',
    goals: ['Understand included setup help', 'Save business details without losing work', 'Find and follow up a quote request'],
    context: ['High workload', 'Desktop at a busy service counter', 'Unfamiliar software language'],
    viewport: { width: 1280, height: 800 }, touch: false, typingDelayMs: 65, thinkDelayMs: 450,
    networkLatencyMs: 120, downloadKbps: 1800, targetSizePx: 44, patienceSteps: 18,
  },
  {
    id: 'mobile-dispatcher', name: 'The High-Volume Mobile Dispatcher', age: 42,
    profile: 'Coordinates 15 trucks from a service vehicle and checks incoming homeowner enquiries on a small touch screen. Dispatch itself is outside the LeadQuote scope.',
    business: 'Fifteen-truck residential HVAC company', techLiteracy: 'medium',
    goals: ['Identify a new enquiry quickly', 'Read quote details on a phone', 'Preview the quote experience with touch-sized controls'],
    context: ['Small screen', 'Glare hypothesis', 'Greasy-hand touch accuracy hypothesis', 'Slow cellular link simulation'],
    viewport: { width: 390, height: 844 }, touch: true, typingDelayMs: 35, thinkDelayMs: 200,
    networkLatencyMs: 400, downloadKbps: 400, targetSizePx: 48, patienceSteps: 12,
  },
  {
    id: 'operations-hawk', name: 'The Office-Bound Operations Hawk', age: 35,
    profile: 'Co-owner working from an office desktop, focused on a fast, consistent setup and minimal repeated entry. Treat dispatch and billing-system automation as scope questions.',
    business: 'Eight-truck HVAC company with an office team', techLiteracy: 'medium',
    goals: ['Prepare a price draft efficiently', 'Recover cleanly from an entry mistake', 'Find a saved enquiry without unnecessary steps'],
    context: ['Desktop and keyboard', 'Repeated daily tasks', 'Limited tolerance for duplicate data entry'],
    viewport: { width: 1440, height: 900 }, touch: false, typingDelayMs: 10, thinkDelayMs: 80,
    networkLatencyMs: 60, downloadKbps: 10000, targetSizePx: 24, patienceSteps: 14,
  },
  {
    id: 'commercial-estimator', name: 'The Commercial Contract Estimator', age: 49,
    profile: 'Experienced commercial retrofit estimator exploring whether an instant-estimate price book fits the early enquiry stage. Multi-page proposals and arbitrary commercial line items are not assumed capabilities.',
    business: 'Commercial and residential HVAC retrofit company', techLiteracy: 'high',
    goals: ['Understand supported products and quote limitations', 'Review pricing controls on a tablet', 'Identify product-fit gaps without confusing them with defects'],
    context: ['Tablet at a site office', 'Complex installation scope', 'Uses specialist proposal software separately'],
    viewport: { width: 1024, height: 768 }, touch: true, typingDelayMs: 20, thinkDelayMs: 150,
    networkLatencyMs: 100, downloadKbps: 3000, targetSizePx: 44, patienceSteps: 22,
  },
  {
    id: 'solo-operator', name: 'The Micro-Business Solo Operator', age: 29,
    profile: 'Runs a one-person HVAC business, switches between customer calls and field work, and needs to resume setup without remembering previous inputs.',
    business: 'One-person residential HVAC business', techLiteracy: 'medium',
    goals: ['Resume interrupted setup', 'Correct a typo without restarting', 'Check what the homeowner will see'],
    context: ['Frequent task switching', 'Phone during a break from attic work', 'Low-battery hypothesis', 'Slow cellular link simulation'],
    viewport: { width: 375, height: 812 }, touch: true, typingDelayMs: 45, thinkDelayMs: 250,
    networkLatencyMs: 500, downloadKbps: 300, targetSizePx: 48, patienceSteps: 12,
  },
];
