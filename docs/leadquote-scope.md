# LeadQuote audit scope

This project evaluates setup and everyday use from five fictional HVAC-owner perspectives. It does not contain LeadQuote's private application code. Source observations below were read locally on October 20, 2026 from an existing application snapshot. They are candidates for runtime discovery, not proof of the currently deployed version or completed provider acceptance.

## Product fit

LeadQuote is a branded HVAC instant-estimate widget, price book and enquiry portal. Homeowners choose supported equipment and options, provide required details and receive a configured estimate. The contractor confirms the final installation scope. Supported configuration includes product/capacity/tier prices, estimate ranges, selected modifiers, scope descriptions and financing estimates. Customer quote emails, business alerts and configured lead-routing paths must be verified separately from mere UI presence.

Dispatch boards, invoicing, payments for HVAC jobs, multi-page commercial proposals, arbitrary custom commercial line items, native customer SMS and universal CRM integrations are not assumed capabilities. Keep the commercial-estimator and dispatcher personas, but record those needs as product-fit opportunities when outside the advertised scope. Do not reduce a supported-task score for the absence of an unrelated product feature.

Setup assistance is included by default. A client-managed choice still requires the onboarding call, approved prices and completion checks. Initial price drafts do not activate or publish the widget. Ongoing price changes are client-managed with help on request. The October 20 offer includes a website build and hosting while active; the audit must not invent a page count, domain promise or website-delivery deadline.

## Candidate navigation

| Purpose | Shared-app route | Accessible labels observed in source |
|---|---|---|
| Login and app entry | `/auth/login`, `/apps` | Account menu; Where would you like to go? |
| Business setup | `/leadquote/onboarding` | Your business-specific link is needed; Save and choose a call |
| Price book | `/portal/estimator` | LeadQuote price book; Your initial price draft; Save draft for KD review; Publish changes |
| Enquiries | `/portal/leads` | Enquiries in navigation; Leads heading; Open record; current-page search |
| Delivery status | `/portal/delivery` | Lead delivery; Refresh status |
| Embed guidance | `/portal/widget` | Widget Embed; Simple Setup; Advanced; Preview |
| Settings | `/portal/settings` | General; Financing; Integrations; Save Settings |

Use the shared deployment profile by default. A separately verified standalone deployment may use `/dashboard/*` paths; do not assume those paths resolve on the configured host. Discover actual labels before interacting. Duplicate Preview buttons require a scoped locator. The business-specific onboarding link is sensitive authorization context and must not enter public configuration, logs or reports.

The setup form observed in source covers address, quote currency, service area, price approver, setup preference, price book, branding/financing references, website and access, policy links, CRM destination, follow-up owner and tracking permission. Useful recovery tests include changing country, conditional fields, backtracking, interruption, validation focus, stale updates and an uncertain submission. These require isolated fixtures or separately authorized staging, not a production form submission.

## Evidence and safety

- The supplied production profile is inspection only, has no action steps and allows no mutation endpoints. It does not grant permission to inspect real customer records.
- Default to the bundled local fictional fixture. A real-app session must belong to the operator's expressly approved isolated demo tenant. Never use Cool Aid. Demo status alone does not authorize sends, changes, payment or provider operations.
- Preserve all held approval/activation states. Distinguish unavailable access, missing setup prerequisites and paused delivery processing from demonstrated usability defects.
- Settings can contain provider credentials. Do not inspect, export or photograph credential values. Do not retain customer contact details, cookies, storage state, invitation context or full URLs containing sensitive tokens.
- Delivery acceptance is not proof of inbox receipt. Never retry or mark a delivery complete merely to test a control.
- The original application README contains historical limitations that newer source supersedes. Recheck actual behavior before presenting any limitation as current.

## Preserve the design

Recommendations must retain the application's branding, colors, typography and tokens. The shared application system uses Manrope headings, Geist body, Geist Mono references and a saved Light/Dark/System choice with dark default. Hosted customer quote widgets have a separate branding boundary. Improve flow, hierarchy, navigation, language and form logic without proposing a rebrand.

## Interpretation limits

Synthetic personas are evaluation lenses, not five real-user interviews. Age does not determine ability; each profile's interaction parameters are explicit scenario assumptions. Glare, greasy hands, stress and low battery are hypotheses, not conditions reproduced by browser automation. Report elapsed browser time and injected delays separately. A scripted task demonstrates mechanics; it does not prove natural discoverability. Require evidence IDs for observed findings and mark untested recommendations as hypotheses.

The local fixture deliberately drops a saved service-area field, uses jargon and presents undersized enquiry controls. Those defects prove the auditor can detect problems; they are not findings about the LeadQuote application.
