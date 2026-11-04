# Changelog

## 1.0.4 - 2026-11-04

- Correct the current package version and installation examples in the published README.
- Reject stale README version claims in the packed artifact before npm publication.

## 1.0.3

- Refresh locked dependencies and constrain affected modern glob/minimatch versions.
- Use patched Node.js in CI and publication, and record raw audit findings separately from the reviewed registry-cache false positive.

## 1.0.0

- Start Stackline maintenance of the documented upstream API.
- Preserve and verify published runtime files and TypeScript declarations.
- Run upstream functional suites against both source and the final package.
- Publish the reviewed CI artifact through GitHub Actions with provenance and immutable release evidence.
- Modernize the complete server, browser and end-to-end harness; retain the original functional scenarios.
- Rebuild browser assets with esbuild, removing an unnecessary vulnerable cryptographic browser shim from development dependencies.
- Resolve patched compatible runtime dependencies and explicitly document inherited transitive deprecation warnings outside the requested direct-package scope.

- Exclude the upstream incidental local build log from the published files.

- Treat shell-completion input as a literal prefix and reject non-HTTP(S) return URLs even when a configured pattern is permissive. Keep the operator-controlled return URL allowlist for HTTP(S) navigation.
