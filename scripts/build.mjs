import {build} from 'esbuild'
import assert from 'node:assert/strict'
import {readFile, writeFile} from 'node:fs/promises'

// These entry points only import Karma's own source. No cryptographic browser
// shims are needed to build them.
for (const [entry, output] of [['client/main.js', 'static/karma.js'], ['context/main.js', 'static/context.js']]) {
  const result = await build({entryPoints: [entry], bundle: true, platform: 'browser', format: 'iife', target: ['es5'], write: false, legalComments: 'inline'})
  const bytes = result.outputFiles[0].contents
  if (process.argv.includes('--check')) assert.deepEqual(Buffer.from(bytes), await readFile(output), output + ' is stale')
  else await writeFile(output, bytes)
}
