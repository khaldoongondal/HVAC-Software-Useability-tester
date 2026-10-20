import { createServer } from 'node:http';

const style = `
*{box-sizing:border-box}html{font-family:system-ui,sans-serif;color:#18352b;background:#f4f7f5}body{margin:0;line-height:1.5}
header,main{max-width:960px;margin:auto;padding:24px}header{border-bottom:1px solid #c7d2cb}header p{margin:0;font-size:14px}
nav{display:flex;gap:12px;flex-wrap:wrap;margin-top:16px}a{color:#175438;text-underline-offset:3px}main{padding-bottom:64px}
h1{font-size:28px;line-height:1.15}h2{font-size:20px}label{display:block;font-weight:600;margin-top:18px}
input,textarea,select{display:block;width:100%;max-width:500px;padding:12px;font:inherit;border:1px solid #6e8579;border-radius:5px;background:white;color:inherit}
button{min-height:44px;padding:10px 18px;margin:12px 8px 12px 0;background:#175438;color:white;border:0;border-radius:5px;font:inherit;cursor:pointer}
button:focus-visible,a:focus-visible,input:focus-visible,textarea:focus-visible{outline:3px solid #bc6100;outline-offset:4px}
button:disabled{opacity:.55;cursor:not-allowed}.panel{background:white;border:1px solid #c7d2cb;border-radius:8px;padding:20px;margin:16px 0}
.notice{padding:12px;border-left:4px solid #175438;background:#e6eee8}.error{color:#a61916;font-weight:600}.tiny-target{width:28px;height:22px;min-height:22px;padding:0;font-size:10px}
[hidden]{display:none!important}table{border-collapse:collapse;width:100%}td,th{text-align:left;padding:10px;border-bottom:1px solid #c7d2cb}
@media(max-width:500px){header,main{padding:18px}h1{font-size:25px}nav{gap:10px}table{font-size:14px}td,th{padding:8px 5px}}
`;

function shell(title: string, body: string, script = ''): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | Synthetic HVAC Lab</title><style>${style}</style></head><body><header><strong>Synthetic HVAC usability laboratory</strong><p>Fictional data and deliberate defects. This is not the LeadQuote application.</p><nav aria-label="Fixture pages"><a href="/setup">Setup</a><a href="/pricebook">Price book</a><a href="/enquiries">Enquiries</a><a href="/widget">Quote preview</a><a href="/scope">Product scope</a></nav></header><main><h1>${title}</h1>${body}</main><script>${script}</script></body></html>`;
}

const pages: Record<string, string> = {
  '/setup': shell('Set up your quote tool', `
    <p>Save your business information before your setup call.</p><form id="setup-form" class="panel">
      <label for="business-name">Business name</label><input id="business-name" name="businessName" autocomplete="off" required>
      <label for="service-area">Areas you serve</label><textarea id="service-area" name="serviceArea" required></textarea>
      <button type="submit">Save setup draft</button>
    </form><p id="setup-status" role="status"></p><p id="setup-resume" hidden></p>
    <p class="notice">Training defect: the service area is deliberately not persisted. An audit must catch the lost field after interruption.</p>`, `
    const nameInput=document.getElementById('business-name'),areaInput=document.getElementById('service-area'),status=document.getElementById('setup-status');
    const draft=JSON.parse(localStorage.getItem('hvac-fixture-setup')||'null');
    if(draft){nameInput.value=draft.name||'';status.textContent='Draft restored. Check both fields before continuing.';const resumed=document.getElementById('setup-resume');resumed.hidden=false;if(nameInput.value&&areaInput.value){resumed.dataset.testid='setup-resume-complete';resumed.textContent='Your business name and service area were restored.';}else{resumed.dataset.testid='setup-resume-incomplete';resumed.textContent='Your service area was not restored. Enter it again.';}}
    document.getElementById('setup-form').addEventListener('submit',e=>{e.preventDefault();localStorage.setItem('hvac-fixture-setup',JSON.stringify({name:nameInput.value}));status.textContent='Setup draft saved. You can leave and return.';});
  `),
  '/pricebook': shell('Configuration Matrix', `
    <p>Modify the Database Record and Serialize payload to stage the quote tiers.</p><form id="pricing-form" class="panel" novalidate>
      <label for="good-price">Good tier price</label><input id="good-price" inputmode="decimal" aria-describedby="price-error" value="6000" autocomplete="off">
      <p id="price-error" class="error" role="alert"></p>
      <label for="better-price">Better tier price</label><input id="better-price" inputmode="decimal" value="7500" autocomplete="off">
      <button type="submit">Save price draft</button>
    </form><p id="price-status" role="status"></p><p class="notice">Synthetic draft only. No prices are published.</p>`, `
    const good=document.getElementById('good-price'),better=document.getElementById('better-price'),error=document.getElementById('price-error');
    function validate(){const valid=/^\\d+(\\.\\d{1,2})?$/.test(good.value)&&Number(good.value)>0;good.setAttribute('aria-invalid',String(!valid));error.textContent=valid?'':'Enter a price greater than zero using numbers only. Your other draft values are unchanged.';return valid;}
    good.addEventListener('blur',validate);good.addEventListener('input',()=>{if(good.getAttribute('aria-invalid')==='true')validate();});
    document.getElementById('pricing-form').addEventListener('submit',e=>{e.preventDefault();if(!validate()){good.focus();return;}if(!/^\\d+(\\.\\d{1,2})?$/.test(better.value)||Number(better.value)<=0){error.textContent='Enter a valid Better tier price.';better.focus();return;}localStorage.setItem('hvac-fixture-prices',JSON.stringify({good:good.value,better:better.value}));const status=document.getElementById('price-status');status.dataset.testid='price-saved';status.textContent='Draft saved for review. Nothing has been published.';});
  `),
  '/enquiries': shell('Your enquiries', `
    <label for="request-search">Find a request</label><input id="request-search" autocomplete="off" placeholder="Search synthetic request IDs">
    <div class="panel"><table><caption>Fictional quote requests</caption><thead><tr><th scope="col">Request</th><th scope="col">System</th><th scope="col">Details</th></tr></thead><tbody>
      <tr data-request="DEMO-001"><th scope="row">DEMO-001</th><td>Heat pump</td><td><button class="tiny-target" aria-label="Open request DEMO-001" data-open="DEMO-001">Open</button></td></tr>
      <tr data-request="DEMO-002"><th scope="row">DEMO-002</th><td>Furnace</td><td><button class="tiny-target" aria-label="Open request DEMO-002" data-open="DEMO-002">Open</button></td></tr>
    </tbody></table></div><section id="request-detail" class="panel" aria-live="polite" hidden><h2>Saved quote details</h2><p id="request-summary"></p></section>
    <p>Fictional requests contain no homeowner name, email, phone or address.</p>`, `
    document.getElementById('request-search').addEventListener('input',e=>{const query=e.target.value.toUpperCase();document.querySelectorAll('[data-request]').forEach(row=>{row.hidden=!row.dataset.request.includes(query);});});
    document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>{const detail=document.getElementById('request-detail');detail.hidden=false;const summary=document.getElementById('request-summary');summary.dataset.testid='enquiry-detail';summary.textContent=button.dataset.open==='DEMO-001'?'DEMO-001: Heat pump, Good tier, estimate USD 6500.':'DEMO-002: Furnace, Good tier, estimate USD 6000.';}));
  `),
  '/widget': shell('Preview an instant estimate', `
    <p>This preview never captures a lead or sends a message.</p><div data-testid="safe-misclick-zone" class="notice">Neutral practice area. Clicking here changes nothing.</div><section id="systems" class="panel"><h2>Which system do you need?</h2><button data-system="Furnace">Furnace</button><button data-system="Heat pump">Heat pump</button></section>
    <section id="options" class="panel" hidden><h2 id="chosen-system"></h2><p>Standard configuration, one unit, fictional approved prices.</p><button id="back-systems">Back to systems</button><button id="preview-quote">Preview estimate</button></section>
    <section id="quote-summary" class="panel" aria-live="polite" hidden><h2>Estimate preview</h2><p data-testid="quote-result"></p><p>Final installation scope requires contractor confirmation.</p></section>`, `
    let selected='';const systems=document.getElementById('systems'),options=document.getElementById('options'),summary=document.getElementById('quote-summary');
    document.querySelectorAll('[data-system]').forEach(button=>button.addEventListener('click',()=>{selected=button.dataset.system;systems.hidden=true;options.hidden=false;summary.hidden=true;document.getElementById('chosen-system').textContent=selected+' options';}));
    document.getElementById('back-systems').addEventListener('click',()=>{systems.hidden=false;options.hidden=true;summary.hidden=true;});
    document.getElementById('preview-quote').addEventListener('click',()=>{summary.hidden=false;document.querySelector('[data-testid="quote-result"]').textContent=selected+' preview: USD 6500–7800. No enquiry was sent.';});
  `),
  '/scope': shell('Is this the right tool for the job?', `
    <p>This fictional product helps homeowners request an instant HVAC estimate and helps an owner maintain approved prices and review enquiries.</p>
    <button id="explain-scope">Explain supported quote work</button><section id="scope-explanation" class="panel" hidden><h2>Product scope</h2><p data-testid="scope-detail">Product-fit opportunity: dispatch, invoices and multi-page commercial proposals are outside this fixture.</p><p>Evaluate whether the price-book and early-enquiry workflow help the commercial estimator. Do not mark a missing specialist proposal feature as a defect in an advertised instant-estimate tool.</p></section>`, `
    document.getElementById('explain-scope').addEventListener('click',()=>{document.getElementById('scope-explanation').hidden=false;});
  `),
};

/** Ephemeral, loopback-only and self-contained. No API writes, credentials or external assets. */
export async function startFixture(): Promise<{ baseUrl: string; close: () => Promise<void> }> {
  const server = createServer((request, response) => {
    response.setHeader('x-hvac-audit-fixture', '1');
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405, { Allow: 'GET, HEAD' }); response.end('Read-only fixture server'); return;
    }
    const pathname = new URL(request.url ?? '/', 'http://127.0.0.1').pathname;
    const page = pages[pathname];
    response.writeHead(page ? 200 : 404, {
      'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store',
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; connect-src 'none'; img-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
      'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer',
    });
    response.end(request.method === 'HEAD' ? undefined : (page ?? shell('Page not found', '<p>Choose a fixture page from the navigation.</p>')));
  });
  await new Promise<void>((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Fixture did not bind a loopback TCP port.');
  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () => new Promise<void>((resolve, reject) => { server.close(error => error ? reject(error) : resolve()); server.closeAllConnections(); }),
  };
}
