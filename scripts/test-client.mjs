import {build} from 'esbuild'
import {createRequire} from 'node:module'
import {mkdir, access, readdir, writeFile} from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import {chromium} from 'playwright-core'
const require = createRequire(import.meta.url)
const {Server, config} = require('../lib/index.js')
const candidates = [process.env.CHROME_BIN, chromium.executablePath(), '/usr/bin/google-chrome', '/usr/bin/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'].filter(Boolean)
const cache = path.join(os.homedir(), 'Library/Caches/ms-playwright')
try {
  for (const name of await readdir(cache)) {
    if (name.startsWith('chromium-')) candidates.push(path.join(cache, name, 'chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'))
    if (name.startsWith('chromium_headless_shell-')) candidates.push(path.join(cache, name, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'))
  }
} catch (error) { if (error.code !== 'ENOENT') throw error }
for (const candidate of candidates) {
  try { await access(candidate); process.env.CHROME_BIN = candidate; break } catch {}
}
if (!process.env.CHROME_BIN) throw new Error('Chrome/Chromium executable required for real browser tests')
await mkdir('.stackline', {recursive: true})
await writeFile('.stackline/test-globals.mjs', "import process from 'process/browser.js'; const global=globalThis; export {process,global};\n")
await writeFile('.stackline/sinon.cjs', 'module.exports = globalThis.sinon;\n')
await build({inject: ['.stackline/test-globals.mjs'], stdin: {contents: "require('./test/client/util.spec.js');require('./test/client/stringify.spec.js');require('./test/client/karma.spec.js')", resolveDir: process.cwd()}, bundle: true, platform: 'browser', format: 'iife', target: ['es2020'], outfile: '.stackline/client-tests.js', alias: {sinon: path.resolve('.stackline/sinon.cjs'), assert: require.resolve('assert/')}})
const parsedConfig = await config.parseConfig(null, {configFile: false, basePath: process.cwd(), frameworks: ['mocha'], files: ['node_modules/sinon/pkg/sinon.js', '.stackline/client-tests.js'], reporters: ['dots'], browsers: ['StacklineChrome'], customLaunchers: {StacklineChrome: {base: 'ChromeHeadless', flags: ['--no-sandbox']}}, singleRun: true, plugins: [require('karma-mocha'), require('karma-chrome-launcher')], browserNoActivityTimeout: 30000}, {promiseConfig: true, throwErrors: true})
await new Promise((resolve, reject) => {
  const server = new Server(parsedConfig, code => code === 0 ? resolve() : reject(new Error('Browser suite exit ' + code)))
  server.start().catch(reject)
})
