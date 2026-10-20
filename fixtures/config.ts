import type { AuditConfig, Target } from '../src/schema.js';

const label = (value: string): Target => ({ by: 'label', value });
const button = (value: string): Target => ({ by: 'role', role: 'button', value });
const testId = (value: string): Target => ({ by: 'testId', value });

export function fixtureConfig(baseUrl: string): AuditConfig {
  const origin = new URL(baseUrl).origin;
  return {
    name: 'Synthetic HVAC owner usability laboratory', baseUrl: origin, environment: 'fixture',
    allowedOrigins: [origin], allowedPaths: ['/setup', '/pricebook', '/enquiries', '/widget', '/scope'],
    mutationPaths: [], isolatedTenant: 'fictional-local-fixture', seed: 42, redactSelectors: [],
    captureScreenshots: true, allowModelDataTransfer: false,
    journeys: [
      {
        id: 'setup-resume', name: 'Save a setup draft and resume after a call', scope: 'supported',
        goal: 'Save your fictional company name and service area, leave for a phone call, and find both values restored.',
        path: '/setup', personas: ['paper-to-digital', 'operations-hawk', 'solo-operator'],
        budgetSeconds: 45, maxSteps: 12,
        actions: [
          { type: 'fill', target: label('Business name'), value: 'Example HVAC Workshop' },
          { type: 'fill', target: label('Areas you serve'), value: 'Fictional North District' },
          { type: 'click', target: button('Save setup draft') },
          { type: 'interrupt', durationMs: 250, note: 'Model a task switch and reload. This does not reproduce a real phone OS interruption.' },
        ],
        success: testId('setup-resume-complete'), expectedText: 'Your business name and service area were restored.',
        notes: ['EXPECTED DELIBERATE FAILURE: this fixture saves the business name but drops the service area after reload.', 'This is an instrumented synthetic defect, not a claim about LeadQuote.', 'Setup data stays in this browser context only.'],
        allowedControls: [label('Business name'), label('Areas you serve'), button('Save setup draft')],
      },
      {
        id: 'pricing-recovery', name: 'Correct a price entry mistake', scope: 'supported',
        goal: 'Enter an intended Good tier price of 6500, recover from a trailing-character typo, and save a draft.',
        path: '/pricebook', personas: ['paper-to-digital', 'operations-hawk', 'commercial-estimator', 'solo-operator'],
        budgetSeconds: 40, maxSteps: 12,
        actions: [
          { type: 'typo', target: label('Good tier price'), value: '6500', note: 'Append x, blur to see validation, then restore the intended value.' },
          { type: 'fill', target: label('Better tier price'), value: '7800' },
          { type: 'click', target: button('Save price draft') },
        ],
        success: testId('price-saved'), expectedText: 'Draft saved for review. Nothing has been published.',
        notes: ['Deliberate jargon: Configuration Matrix, Database Record and Serialize payload appear in the fixture.', 'Saving only updates synthetic browser-local state.'],
        allowedControls: [label('Good tier price'), label('Better tier price'), button('Save price draft')],
      },
      {
        id: 'find-enquiry', name: 'Find a homeowner enquiry and read its estimate', scope: 'supported',
        goal: 'Find synthetic request DEMO-001 and open its saved quote details.', path: '/enquiries',
        personas: ['paper-to-digital', 'mobile-dispatcher', 'operations-hawk'], budgetSeconds: 30, maxSteps: 10,
        actions: [
          { type: 'fill', target: label('Find a request'), value: 'DEMO-001' },
          { type: 'click', target: button('Open request DEMO-001') },
        ],
        success: testId('enquiry-detail'), expectedText: 'DEMO-001: Heat pump, Good tier, estimate USD 6500.',
        notes: ['All enquiry rows are fictional and contain no real contact details.', 'The Open request button is intentionally only 28 by 22 pixels to exercise target-size checks.'],
        allowedControls: [label('Find a request'), button('Open request DEMO-001')],
      },
      {
        id: 'quote-backtrack', name: 'Preview a quote and correct the system choice', scope: 'supported',
        goal: 'Choose furnace, go back, select heat pump and inspect the preview without submitting an enquiry.',
        path: '/widget', personas: ['mobile-dispatcher', 'commercial-estimator', 'solo-operator'],
        budgetSeconds: 35, maxSteps: 14,
        actions: [
          { type: 'click', target: button('Furnace') },
          { type: 'click', target: button('Back to systems') },
          { type: 'misclick', note: 'A safe neutral viewport click models imprecise touch; no destructive target is nearby.' },
          { type: 'click', target: button('Heat pump') },
          { type: 'click', target: button('Preview estimate') },
        ],
        success: testId('quote-result'), expectedText: 'Heat pump preview: USD 6500–7800. No enquiry was sent.',
        notes: ['There is no enquiry submission endpoint or outbound delivery in this fixture.', 'Results are fictional estimate examples, not contractor prices.'],
        allowedControls: [button('Furnace'), button('Back to systems'), button('Heat pump'), button('Preview estimate')],
      },
      {
        id: 'product-fit', name: 'Explore commercial proposal and dispatch expectations', scope: 'exploratory',
        goal: 'Determine whether dispatch, invoicing or multi-page commercial proposals are supported, then read the scope explanation.',
        path: '/scope', personas: ['mobile-dispatcher', 'operations-hawk', 'commercial-estimator'],
        budgetSeconds: 25, maxSteps: 8,
        actions: [{ type: 'click', target: button('Explain supported quote work') }],
        success: testId('scope-detail'), expectedText: 'Product-fit opportunity: dispatch, invoices and multi-page commercial proposals are outside this fixture.',
        notes: ['Exploratory scope mismatches are opportunities and do not reduce the supported-task usability score.', 'This fixture exercises truthful scope handling rather than declaring absent features defective.'],
        allowedControls: [button('Explain supported quote work')],
      },
    ],
  };
}
