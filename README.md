## Set up

This repository is a copy of the Bootstrap repository with a few changes to make it work with this new repository:

- Forked Bootstrap `main` branch from https://github.com/twbs/bootstrap/commit/0cbfe13adf669ad39ae9d8e873c2ad59befd3a3a
- Changed `if: github.repository == 'twbs/bootstrap'` to `if: github.repository == 'julien-deramond/bootstrap-automatic-releases'` ([3e17b6e](https://github.com/julien-deramond/bootstrap-automatic-releases/commit/3e17b6ebe37d721a33b0a10edaf4e4338c6de257))
- Removed `.github/dependabot.yml` file to avoid having Dependabot alerts
- Fixed CSpell action by adding "deramond" to the dictionary ([45bd8d9](https://github.com/julien-deramond/bootstrap-automatic-releases/commit/45bd8d9f05bb9f5c0e479ea95a83eac007a6d281))
- Disabled BrowserStack workflow because it requires a BrowserStack account. However, it should be pretty easy to make it work afterward when the automatic release is set up in Bootstrap. ([77eb394](https://github.com/julien-deramond/bootstrap-automatic-releases/commit/77eb39406c5c8f1630983ecc70738cbc45820c34))
- Configured Netlify to deploy the _main_ branch at https://bootstrap-automatic-releases.netlify.app/

## Changes

Here are the changes that could be made to the original Bootstrap repository to have automatic releases:

- Remove `dist` directory and add it to `.gitignore` ([c0797cb](https://github.com/julien-deramond/bootstrap-automatic-releases/commit/c0797cb743c6f6b839b451d66a84a558871f9c3a))
- Add eslint ignore rule `eslint-disable-line import/no-unresolved` to `/js/tests/integration/bundle.js` to fix `npm run lint` without having to build the library
- Adapt BrowserStack workflow (not done here because it requires a BrowserStack account)
