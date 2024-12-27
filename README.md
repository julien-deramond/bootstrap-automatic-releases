## Set up

This repository is a copy of the Bootstrap repository with a few changes to make it work with this new repository:

- Forked Bootstrap `main` branch from https://github.com/twbs/bootstrap/commit/0cbfe13adf669ad39ae9d8e873c2ad59befd3a3a
- Changed `if: github.repository == 'twbs/bootstrap'` to `if: github.repository == 'julien-deramond/bootstrap-automatic-releases'` ([3e17b6e](https://github.com/julien-deramond/bootstrap-automatic-releases/commit/3e17b6ebe37d721a33b0a10edaf4e4338c6de257))
- Removed `.github/dependabot.yml` file to avoid having Dependabot alerts
- Fixed CSpell action by adding "deramond" to the dictionary
- BrowserStack workflow is disabled because it requires a BrowserStack account. However, it should be pretty easy to make it work afterward when the automatic release is set up in Bootstrap. ([77eb394](https://github.com/julien-deramond/bootstrap-automatic-releases/commit/77eb39406c5c8f1630983ecc70738cbc45820c34))

## Changes

Here are the changes that could be made to the original Bootstrap repository to have automatic releases:

- Adapt BrowserStack workflow (not done here because it requires a BrowserStack account)
