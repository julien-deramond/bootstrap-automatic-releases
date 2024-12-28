// Get the current version from package.json and increment the version based on the argument passed to the script.
// Arguments: patch, minor, major

import { readFileSync } from 'fs'
import { execSync } from 'child_process'

function prepare(semver) {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
  const version = packageJson.version
  const [major, minor, patch] = version.split('.').map(Number)

  let newVersion = version;
  
  switch (semver) {
    case 'patch':
      newVersion = `${major}.${minor}.${patch + 1}`
      break
    case 'minor':
      newVersion = `${major}.${minor + 1}.0`
      break
    case 'major':
      newVersion = `${major + 1}.0.0`
      break
    default:
      console.error(`Unknown semver "${semver}"`)
      process.exit(1)
  }

  execSync(`node build/change-version.mjs ${version} ${newVersion}`)
}

async function main(args) {
  prepare(args[0])
}

main(process.argv.slice(2))
