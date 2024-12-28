## Set up

This repository is a copy of the Bootstrap repository with a few changes to make it work with this new repository:

- Forked Bootstrap `main` branch from https://github.com/twbs/bootstrap/commit/0cbfe13adf669ad39ae9d8e873c2ad59befd3a3a
- Changed `if: github.repository == 'twbs/bootstrap'` to `if: github.repository == 'julien-deramond/bootstrap-automatic-releases'` ([3e17b6e](https://github.com/julien-deramond/bootstrap-automatic-releases/commit/3e17b6ebe37d721a33b0a10edaf4e4338c6de257))
- Removed `.github/dependabot.yml` file to avoid having Dependabot alerts
- Fixed CSpell action by adding "deramond" to the dictionary ([45bd8d9](https://github.com/julien-deramond/bootstrap-automatic-releases/commit/45bd8d9f05bb9f5c0e479ea95a83eac007a6d281))
- Disabled BrowserStack workflow because it requires a BrowserStack account. However, it should be pretty easy to make it work afterward when the automatic release is set up in Bootstrap. ([77eb394](https://github.com/julien-deramond/bootstrap-automatic-releases/commit/77eb39406c5c8f1630983ecc70738cbc45820c34))
- Configured Netlify to deploy the _main_ branch at https://bootstrap-automatic-releases.netlify.app/
- Changed package name for this repository to test out the automatic release: used `bootstrap-automatic-releases`

## Changes

Here are the changes that could be made to the original Bootstrap repository to have automatic releases.

### Get rid of the `dist` directory

- Remove `dist` directory and add it to `.gitignore` ([c0797cb](https://github.com/julien-deramond/bootstrap-automatic-releases/commit/c0797cb743c6f6b839b451d66a84a558871f9c3a))
- Add eslint ignore rule `eslint-disable-line import/no-unresolved` to `/js/tests/integration/bundle.js` to fix `npm run lint` without having to build the library ([6d959ab](https://github.com/julien-deramond/bootstrap-automatic-releases/commit/6d959ab51cf97644e512e99e71f0b8b6aa1605f7))
- Change `npm run docs` to add an extra `npm run dist` command so that `/docs/5.3/customize/css-variables` can be built (it embeds the content of the dist CSS built file) ([d8d05b0](https://github.com/julien-deramond/bootstrap-automatic-releases/commit/d8d05b0d22526008959a461f3b32c36e5d897c44))
- Adapt `.github/workflows/docs.yml` to use `npm run docs` instead of several sub-commands ([8dacbe0](https://github.com/julien-deramond/bootstrap-automatic-releases/commit/8deacbe0ed3bf2cba76ebe2f34c4ce1340868588))
- Adapt BrowserStack workflow (not done here because it requires a BrowserStack account)

### Prepare the releases

- New script `prepare-version.mjs` that takes 'patch', 'minor', or 'major' as an argument and prepares the _main_ branch for the next release.
  - Changes the version in all files
  - Rename the {version} directories (e.g. 5.3 -> 5.4, or 5.3 -> 6.0) **for minor and major versions**
- New npm scripts to prepare the _main_ branch for the next release:
  ```diff
  + "prepare-patch": "node build/prepare-version.mjs patch",
  + "prepare-minor": "node build/prepare-version.mjs minor",
  + "prepare-major": "node build/prepare-version.mjs major",
  ```

## New process

### After the release

Prepare the _main_ branch for the next release by running:
- `npm run prepare-patch` for a patch release
- `npm run prepare-minor` for a minor release
- `npm run prepare-major` for a major release

This will execute the `npm run release-version <version> <next-version>`. For example, if the current version is `5.3.0`, running `npm run prepare-patch` will execute `npm run release-version 5.3.0 5.3.1`.
