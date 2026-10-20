import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { inspectWithAgentBrowser } from '../src/integrations/agent-browser.js';

test('optional native inspector rejects remote, credentials, query and implicit ports before execution', async () => {
  for (const url of [
    'https://app.example.com/leadquote',
    'http://localhost:3000/',
    'http://127.0.0.1/',
    'http://127.0.0.1:80/',
    'http://user:password@127.0.0.1:3000/',
    'http://127.0.0.1:3000/?token=test',
    'file:///tmp/fixture.html',
  ]) {
    await assert.rejects(inspectWithAgentBrowser(url, 'does-not-exist'), /accepts only/);
  }
});

test('optional native inspector rejects Windows command shims', async () => {
  await assert.rejects(inspectWithAgentBrowser('http://127.0.0.1:3000/', 'agent-browser.cmd'), /native/);
});

test('optional native inspector requires the fixture marker and refuses redirects', async () => {
  const requests: string[] = [];
  const server = createServer((req, res) => {
    requests.push(req.method ?? '');
    if (req.url === '/redirect') {
      res.writeHead(302, { location: '/unmarked' });
    } else {
      res.writeHead(200);
    }
    res.end();
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const address = server.address();
  assert.ok(address && typeof address !== 'string');
  try {
    const origin = 'http://127.0.0.1:' + address.port;
    await assert.rejects(inspectWithAgentBrowser(origin + '/unmarked', 'does-not-exist'), /not identified/);
    await assert.rejects(inspectWithAgentBrowser(origin + '/redirect', 'does-not-exist'));
    assert.deepEqual(requests, ['HEAD', 'HEAD']);
  } finally {
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
});
