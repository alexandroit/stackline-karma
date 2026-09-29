# Changelog

## 1.0.0

- Start Stackline maintenance of the documented upstream API.
- Preserve and verify published runtime files and TypeScript declarations.
- Run upstream functional suites against both source and the final package.
- Publish the reviewed CI artifact through GitHub Actions with provenance and immutable release evidence.
- Modernize the complete server, browser and end-to-end harness; retain the original functional scenarios.
- Rebuild browser assets with esbuild, removing an unnecessary vulnerable cryptographic browser shim from development dependencies.
- Resolve patched compatible runtime dependencies and explicitly document inherited transitive deprecation warnings outside the requested direct-package scope.

- Exclude the upstream incidental local build log from the published files.
