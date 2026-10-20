import { z } from 'zod';
import fs from 'node:fs/promises';
import { ConfigSchema, ReportSchema, DecisionSchema } from './schema.js';
await fs.mkdir('schemas', { recursive: true });
for (const [name, schema] of Object.entries({ config: ConfigSchema, report: ReportSchema, decision: DecisionSchema })) {
  await fs.writeFile(`schemas/${name}.schema.json`, `${JSON.stringify(z.toJSONSchema(schema), null, 2)}\n`);
}
console.log('Exported strict configuration, report and action JSON Schemas.');
