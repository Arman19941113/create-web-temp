#!/usr/bin/env node

const os = require('os')
const path = require('path')
const { execSync } = require('child_process')

const commander = require('commander')
const chalk = require('chalk')
const stripAnsi = require('strip-ansi')
const fs = require('fs-extra')
const { prompt } = require('enquirer')

const ORIGIN_TEMPLATES = ['vanilla', 'vue', 'vue-ts', 'vue-pro', 'react', 'react-ts']
const COLOR_TEMPLATES = [
  chalk.yellow('vanilla'),
  chalk.green('vue'),
  chalk.green('vue-ts'),
  chalk.green('vue-pro'),
  chalk.cyan('react'),
  chalk.cyan('react-ts'),
]

const cwd = process.cwd()
const program = new commander.Command('create-web-temp')
  .arguments('[name]')
  .option('-t, --web-temp <name>', 'specify web-template-name')
  .option('-i, --install', 'install packages when initializing')
  .parse(process.argv)
const programOptions = program.opts()

async function createApp() {
  // 1. get directory
  let appName = program.args[0]
  if (!appName) {
    const { name } = await prompt({
      type: 'input',
      name: 'name',
      message: `Project name:`,
      initial: 'my-app',
    })
    appName = name
  }
  const appPath = path.join(cwd, appName)

  // 2. confirm directory is empty
  if (!fs.existsSync(appPath)) {
    fs.mkdirSync(appPath, { recursive: true })
  } else {
    const existing = fs.readdirSync(appPath)
    if (existing.length) {
      const { yes } = await prompt({
        type: 'confirm',
        name: 'yes',
        initial: 'Y',
        message: `Empty ${ appName } directory and continue?`,
      })
      if (yes) {
        fs.emptyDirSync(appPath)
      } else {
        return
      }
    }
  }

  // 3. choose template
  let templateName = programOptions.webTemp
  if (!templateName || !ORIGIN_TEMPLATES.includes(templateName)) {
    const { t } = await prompt({
      type: 'select',
      name: 't',
      message: `Select a template:`,
      choices: COLOR_TEMPLATES,
    })
    templateName = stripAnsi(t)
  }

  // 4. copy template
  const templateDir = path.join(__dirname, `template-${ templateName }`)
  // copySync's performance is not good
  // fs.copySync(templateDir, appPath)
  const files = fs.readdirSync(templateDir)
  for (const file of files) {
    if (file !== 'package.json') {
      copy(path.join(templateDir, file), path.join(appPath, file))
    }
  }
  const pkg = require(path.join(templateDir, `package.json`))
  pkg.name = templateName
  fs.writeFileSync(path.join(appPath, 'package.json'), JSON.stringify(pkg, null, 4) + os.EOL)
  fs.moveSync(path.join(appPath, 'gitignore'), path.join(appPath, '.gitignore'))

  // 5. init git
  process.chdir(appPath)
  execSync('git init', { stdio: 'ignore' })
  execSync('git add -A', { stdio: 'ignore' })
  execSync('git commit -m "Initialize project with create-web-temp"', { stdio: 'ignore' })

  // 6. Install modules
  const isInstall = programOptions.install
  if (isInstall) {
    console.log()
    console.log('Installing packages. This might take a couple of minutes.')
    execSync('yarn install -s', { stdio: 'inherit' })
  }

  console.log()
  console.log(`Success! Template has been created in ${ chalk.green(appPath) }`)
  console.log()
  console.log('Inside that directory, you can run several commands:')
  console.log(chalk.cyan(`    yarn start`))
  console.log('        To starts the development server.')
  console.log(chalk.cyan(`    yarn build`))
  console.log('        To bundles the app into static files for production.')
  console.log(chalk.cyan(`    yarn serve`))
  console.log('        To preview the app built in production.')
  console.log()
  console.log('We suggest that you begin by typing:')
  console.log(chalk.cyan(`    cd ${ appName }`))
  !isInstall && console.log(chalk.cyan(`    yarn install`))
  console.log(chalk.cyan(`    yarn start`))
  console.log()
}

function copy(src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

createApp().catch(err => {
  console.error(err)
})

