# Upstream review

Independent maintenance of karma6.4.4. Original history: https://github.com/karma-runner/karma/tree/84f85e7016efc2266fa6b3465f494a3fa151c85c

The original runtime API, CLI name, Node engine range and source notices are retained. Browser assets are rebuilt from the original client/context/common sources with esbuild; no unnecessary cryptographic browser shims are installed in the development environment. Byte hashes of the original npm package and reviewed differences are recorded in `.stackline/upstream.json`.

Evidence collected: 2026-09-29T00:21:57.433511+00:00. Latest100 open and30 closed issue/PR entries were queried and PRs removed. The table records the59 returned open issues without claiming they were all reproduced or fixed.

| Issue | Finding |
| --- | --- |
| [#3925](https://github.com/karma-runner/karma/issues/3925) Karma deprecate npm package | The Stackline scoped fork starts independent maintenance; upstream deprecation/lifecycle discussion is not an upstream endorsement. |
| [#3934](https://github.com/karma-runner/karma/issues/3934) DABH:update-colors | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3677](https://github.com/karma-runner/karma/issues/3677) Support for ESM config files (with "type": "module") | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3888](https://github.com/karma-runner/karma/issues/3888) Karma 6.4.4 Depends on "Vulnerable" inflight Library | No advisory is present in the final installed runtime graph, but deprecated inflight remains through the compatible glob dependency. This is a documented transitive scope limitation, not a claim of unrestricted closure-policy compliance. |
| [#3920](https://github.com/karma-runner/karma/issues/3920) Updating the minimatch version | The fresh lock resolves the patched compatible minimatch line; full and runtime audits report zero findings. |
| [#3919](https://github.com/karma-runner/karma/issues/3919) Remove | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3915](https://github.com/karma-runner/karma/issues/3915) Fixing it | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#2474](https://github.com/karma-runner/karma/issues/2474) Call for Contributors | Maintenance/lifecycle discussion, not an API defect. |
| [#3910](https://github.com/karma-runner/karma/issues/3910) The test runner sometimes emits browser log events and test finished in the wrong order | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3803](https://github.com/karma-runner/karma/issues/3803) Angular 14 karma gets stuck after executing tests inside Gitlab Kubernetes Pod runner for ChromeHeadless and does not exit | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3820](https://github.com/karma-runner/karma/issues/3820) Unit Tests Sporadically Disconnect on our CI:CD builds | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3854](https://github.com/karma-runner/karma/issues/3854) karma config not loading with angular 13 | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#2342](https://github.com/karma-runner/karma/issues/2342) Duplicate console log messages when conflicting reporters are defined | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3887](https://github.com/karma-runner/karma/issues/3887) "Some of your tests did a full page reload!" on MacOS when using Chrome 128.x | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#1004](https://github.com/karma-runner/karma/issues/1004) add an option to clear console when using autoWatch:true | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3267](https://github.com/karma-runner/karma/issues/3267) Disconnectedclient disconnected from CONNECTED state between every run in Angular | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3899](https://github.com/karma-runner/karma/issues/3899) Different Coverage Numbers Based On Test Run Order | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3898](https://github.com/karma-runner/karma/issues/3898) Update chokidar to v4 | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3897](https://github.com/karma-runner/karma/issues/3897) Cannot start ChromeHeadless 128, 129, 130, 131 | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3891](https://github.com/karma-runner/karma/issues/3891) Npm warn deprecated  inflight@1.0.6 rimraf@3.0.2 glob@7.2.3 | Deprecated glob7/rimraf3/inflight remain in the compatible runtime graph. This task is limited to direct parent packages; no recursive fork is created. |
| [#3884](https://github.com/karma-runner/karma/issues/3884) npm warn deprecated with karma package | Same explicitly recorded transitive maintenance limitation as3891. |
| [#3885](https://github.com/karma-runner/karma/issues/3885) npm start karma.conf.js | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3880](https://github.com/karma-runner/karma/issues/3880) SyntaxError: Unexpected token '.' | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3876](https://github.com/karma-runner/karma/issues/3876) throw Error(yargs parser supports a minimum Node.js version of ${minNodeVersion} Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`); | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3879](https://github.com/karma-runner/karma/issues/3879) Cypress - Error: certificate has expired in existing project | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3874](https://github.com/karma-runner/karma/issues/3874) Update socket.io-parser dependency to fix security vulnerability in Karma | The fresh compatible dependency graph resolves patched Socket.IO parser dependencies; runtime/full audits pass. |
| [#1706](https://github.com/karma-runner/karma/issues/1706) 'base' and 'absolute' being replaced in reporter output | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#2304](https://github.com/karma-runner/karma/issues/2304) Expose the ability to take screenshots | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3868](https://github.com/karma-runner/karma/issues/3868) ng test not working with Node version 18.18.2 . Error " Cannot read properties of undefined (reading 'range') "  | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3872](https://github.com/karma-runner/karma/issues/3872) Karma dependency ua-parser-js 2.0 license change to AGPL | ua-parser-js stays on the compatible MIT0.7 line; no AGPL2.x migration occurs. |
| [#3866](https://github.com/karma-runner/karma/issues/3866) Getting timeout issue when executing code coverage from ADO pipeline multiple times  | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3843](https://github.com/karma-runner/karma/issues/3843) Is this project dead? | Maintenance/lifecycle discussion. This independent fork preserves provenance, tests and attribution. |
| [#3857](https://github.com/karma-runner/karma/issues/3857) Latest version of socket.io causes tests to fail on macOS | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3856](https://github.com/karma-runner/karma/issues/3856) Latest packages are not working properly(lots of test cases shows error) | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3855](https://github.com/karma-runner/karma/issues/3855) the process of running cases is blocked since No binary for Chrome browser on your platform, but I have configured two browsers, one is available and one is missing. | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#440](https://github.com/karma-runner/karma/issues/440) Minimatch patterns don't work when starting with "!" | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3847](https://github.com/karma-runner/karma/issues/3847) New Chrome version 113 driver fails to start | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3842](https://github.com/karma-runner/karma/issues/3842) How to use with Typescript 5 | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3837](https://github.com/karma-runner/karma/issues/3837) Compatibility with pnpm | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#1087](https://github.com/karma-runner/karma/issues/1087) Tests Cached giving wrong results | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3835](https://github.com/karma-runner/karma/issues/3835) Karma hangs when no browsers are passed | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3834](https://github.com/karma-runner/karma/issues/3834) Cannot serve assets that don't fit its narrow view of acceptable types | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3804](https://github.com/karma-runner/karma/issues/3804) Weird behavior for top-level-await with karma runner | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3830](https://github.com/karma-runner/karma/issues/3830) Tests pass only in debug mode (with `--browsers=Chrome` flag) | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3829](https://github.com/karma-runner/karma/issues/3829) Seems like customContextFile, customClientContextFile options doesn't work | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3823](https://github.com/karma-runner/karma/issues/3823) Critical vulnerability: Insufficient validation when decoding a Socket.IO packet | Patched compatible Socket.IO dependencies are resolved by the fresh lock; no vulnerable graph is shipped. |
| [#3715](https://github.com/karma-runner/karma/issues/3715) Replace ua-parser-js or pin current version | Retains the compatible MIT0.7 line and resolves its current patched version. |
| [#3261](https://github.com/karma-runner/karma/issues/3261) Autowatch not working with karma-webpack on karma version 4.0 | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3295](https://github.com/karma-runner/karma/issues/3295) Karma sometimes generates Error: read ECONNRESET after successful test run | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3691](https://github.com/karma-runner/karma/issues/3691) Proposal: Add an API to recover after DISCONNECT | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3284](https://github.com/karma-runner/karma/issues/3284) Option to fail on skipped tests | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3777](https://github.com/karma-runner/karma/issues/3777) Karma always disconnects Chrome while CONFIGURING | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3817](https://github.com/karma-runner/karma/issues/3817) Angular 14 karma gets stuck after executing tests on Azure Devops Linux Build Agents using chrome Headless resulting in stuck pipeline | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3810](https://github.com/karma-runner/karma/issues/3810) Karma Code Coverage Exit Code is always 0 even when test coverage threshold is not met | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3811](https://github.com/karma-runner/karma/issues/3811) Karma cannot find Firefox profile [Ubuntu] | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#2740](https://github.com/karma-runner/karma/issues/2740) _ | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#2739](https://github.com/karma-runner/karma/issues/2739) _ | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3806](https://github.com/karma-runner/karma/issues/3806) Randomly: Executed 0 of 0 SUCCESS | Open report retained for follow-up; no fix claimed in this compatibility release. |
| [#3801](https://github.com/karma-runner/karma/issues/3801) Unit Test Error in Angular 13 -- TypeError: jit___pipeBind1_8(...) is not a function | Open report retained for follow-up; no fix claimed in this compatibility release. |

## Functional validation

The retained suites cover589 server/unit cases,45 client cases in real Chromium, and63 end-to-end scenarios/341 steps including Chromium and Firefox. The modern harness uses native HTTP/2, explicitly trusted2048-bit test certificates, maintained Cucumber/Mocha/Sinon, and the original minimal timer-faking behavior. A user-agent snapshot reflects the compatible updated UA parser no longer treating CPU architecture as the operating-system version.

The final package is extracted and tested with its packaged runtime and browser assets. Full source and runtime audits must report zero findings. The release requires CI/CodeQL, exact tarball identity and npm provenance, valid direct/alias consumers and matching immutable release assets.

The transitive deprecation limitation above is explicit. Only the original portfolio’s direct dependency forks are in scope; this release is not an unrestricted pass of the recursive Production Dependency Closure Policy.

## CodeQL follow-up

Completion now matches literal prefixes, and browser return navigation accepts only HTTP(S) URLs that also match an operator-supplied allowlist. Executable/local URLs are rejected even with a permissive pattern. The return navigation feature intentionally permits external HTTP(S) destinations selected by that allowlist. Runtime and test files remain scanned. Test HTTP helpers send explicit plain-text/JSON content types.

The default return-URL pattern permits any HTTP(S) destination. This preserves Karma's optional external return-navigation feature and leaves an open-redirect risk when a crafted `return_url` query is followed. Operators should restrict `allowedReturnUrlPatterns` to their intended origins with anchored, escaped hostnames and an authority boundary (including rejection of userinfo or hostname suffixes). Do not use this feature as an authentication callback or a trust decision. CodeQL's redirect alert is retained as a documented compatibility risk, not described as a fixed vulnerability; the script-execution alert is a false positive only after the mandatory HTTP(S) guard. No runtime path or query was excluded from scanning.
