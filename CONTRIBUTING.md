Thanks for your interest in contributing to Pulse (pulse-ts)! We welcome
contributions of any size — fixes, enhancements, docs, and tests.

Getting started

1. Fork the repository and create a feature branch from `master`:

   ```bash
   git clone https://github.com/Alazar42/pulse.git
   git checkout -b feat/my-feature
   ```

2. Install dependencies and build locally:

   ```bash
   npm install
   npm run build
   ```

3. Add tests for new behavior. We use Vitest (recommended) — please add unit
   tests that cover `on`, `off`, `emit`, grouped listeners, and type-level
   expectations where applicable.

4. Update `CHANGELOG.md` with a short note under `Unreleased` describing the
   change.

5. Run the test and build steps before submitting a PR:

   ```bash
   npm run build
   npm test
   ```

Pull request

- Push your branch to your fork and open a PR against `master`.
- Use the PR template and include a description, motivation, and test notes.
- Keep changes small and focused; split large work into multiple PRs when possible.

Code style and reviews

- Follow TypeScript best practices and prefer explicit typing for public API.
- Avoid breaking changes to the public API without a major version bump.
- CI will run builds and tests; maintainers will review and request changes if
  needed.

Thanks — contributions make Pulse better for everyone.
