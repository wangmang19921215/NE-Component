const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec
const execSync = require('child_process').execSync
const spawn = require('child_process').spawn
const pkg = require('./../package.json')
const semver = require('semver')
// const chalk = require('chalk')
let latestVersion = ''
let nowVersion = pkg.version
let info = exec(`npm show ${pkg.name} version`, (err, stdout, stderr) => {
  if (err) return console.error(err)
  if (stderr) return console.error(err)
  latestVersion = stdout
})

if (isNeedPublish(nowVersion, latestVersion)) {
  console.log(123)
  playTag()
  .then(() => build())
  .then(() => publish())
  .catch(err => console.error(err))
}

function isNeedPublish(nowVersion, latestVersion) {
  return semver.gt(nowVersion, latestVersion)
}
function playTag() {
  return execCommand(`npm version ${nowVersion}`)
  .then(() => execCommand(`git push origin ${nowVersion}`))
}
function build() {
  return execCommand('npm run build')
}
function publish() {
  return execCommand('npm publish')
}
function execCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) return reject(err)
      if (stderr) return reject(err)
      resolve(stdout)
    })
  })
}
