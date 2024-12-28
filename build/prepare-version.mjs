#!/usr/bin/env node

// Get the current version from package.json and increment the version based on the argument passed to the script.
// Arguments: patch, minor, major

import { readFileSync } from 'node:fs'
import { execSync } from 'node:child_process'

function prepare(semver) {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
  const { version } = packageJson
  const [major, minor, patch] = version.split('.').map(Number)

  let newVersion = version

  switch (semver) {
    case 'patch': {
      newVersion = `${major}.${minor}.${patch + 1}`
      break
    }

    case 'minor': {
      newVersion = `${major}.${minor + 1}.0`
      break
    }

    case 'major': {
      newVersion = `${major + 1}.0.0`
      break
    }

    default: {
      console.error(`Unknown semver "${semver}"`)
      process.exit(1)
    }
  }

  execSync(`node build/change-version.mjs ${version} ${newVersion}`)

  if (semver === 'minor' || semver === 'major') {
    // Rename directories (e.g. 5.3 -> 5.4, or 5.3 -> 6.0)
    const versionShort = version.split('.').slice(0, 2).join('.')
    const newVersionShort = newVersion.split('.').slice(0, 2).join('.')

    execSync(`mv ./site/content/docs/${versionShort} ./site/content/docs/${newVersionShort}`)
    execSync(`mv ./site/static/docs/${versionShort} ./site/static/docs/${newVersionShort}`)
  }
}

async function main(args) {
  prepare(args[0])
}

main(process.argv.slice(2))
