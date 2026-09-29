import {access, readdir} from 'node:fs/promises'
import {spawnSync} from 'node:child_process'
import path from 'node:path'
import os from 'node:os'
import {chromium, firefox} from 'playwright-core'
const env = {...process.env, MOZ_HEADLESS: '1'}
const candidates = {
  CHROME_BIN: [env.CHROME_BIN, chromium.executablePath(), '/usr/bin/google-chrome', '/usr/bin/chromium', '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'],
  FIREFOX_BIN: [env.FIREFOX_BIN, firefox.executablePath(), '/usr/bin/firefox']
}
const cache = path.join(os.homedir(), 'Library/Caches/ms-playwright')
try {
  for (const name of await readdir(cache)) {
    if (name.startsWith('firefox-')) candidates.FIREFOX_BIN.push(path.join(cache, name, 'firefox/Nightly.app/Contents/MacOS/firefox'))
    if (name.startsWith('chromium_headless_shell-')) candidates.CHROME_BIN.push(path.join(cache, name, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'))
  }
} catch (error) { if (error.code !== 'ENOENT') throw error }
for (const [key, choices] of Object.entries(candidates)) {
  for (const candidate of choices.filter(Boolean)) {
    try {await access(candidate); env[key] = candidate; break} catch {}
  }
  if (!env[key]) throw new Error(key + ' is required for real end-to-end tests')
}
const files = (await readdir('test/e2e')).filter(name => name.endsWith('.feature')).map(name => 'test/e2e/' + name)
const run = spawnSync(process.execPath, ['node_modules/cucumber/bin/cucumber-js', ...files], {env, stdio: 'inherit', timeout: 180000})
if (run.error) throw run.error
if (run.status !== 0) throw new Error('End-to-end suite exit ' + run.status)
