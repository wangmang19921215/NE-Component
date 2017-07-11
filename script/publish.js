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

isNeedPublish(nowVersion, latestVersion)
  .then(boolean => {
    boolean && playTag()
  })
  .then(() => build())
  .then(() => publish())
  .catch(err => console.error(err))

function isNeedPublish(nowVersion, latestVersion) {
  return new Promise((resolve, reject) => {
    execCommand(`npm show ${pkg.name} version`)
      .then(stdout => { latestVersion = stdout })
      .then(() => resolve(semver.gt(nowVersion, latestVersion)))
      .catch(err => reject(err))
  })
}
function playTag() {
  return execCommand(`npm version ${nowVersion}`)
    .then(() => execCommand(`git push origin ${nowVersion}`))
    .catch(err => console.error(err))
}
function build() {
  return execCommand('npm run build')
  .catch(err => console.error(err))
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
