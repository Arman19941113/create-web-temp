const os = require('os')
const path = require('path')
const { execSync, spawnSync } = require('child_process')

const commander = require('commander')
const chalk = require('chalk')
const tmp = require('tmp')
const fs = require('fs-extra')

let appName

// example: create-web-temp my-app -y -t vue-extend
const program = new commander.Command('create-web-temp')
    .arguments('[name]')
    .action(name => appName = name || 'my-app')
    .option('-t, --web-temp <name>', 'specify web-template-name', 'vue')
    .option('-i, --install', 'install packages when initializing')
    .option('-y, --yarn', 'use yarn instead of npm')
    .parse(process.argv)

createApp()

function createApp () {
    const appPath = path.resolve(appName)
    if (fs.pathExistsSync(appPath)) {
        console.log()
        console.error(`The directory ${chalk.green(appName)} exists.`)
        process.exit(1)
    }
    fs.ensureDirSync(appName)

    console.log()
    console.log(`Creating a new web app in ${chalk.green(appPath)}`)

    copyTemplate(appPath)
}

function copyTemplate (appPath) {
    // create temporary path
    const tmpPath = tmp.dirSync().name
    process.chdir(tmpPath)

    console.log()
    console.log('Downloading template.')

    const command = 'npm'
    const args = ['install', 'create-web-temp-packages']
    spawnSync(command, args, { stdio: 'ignore' })

    // check template directory
    const templatePath = tmpPath + '/node_modules/create-web-temp-packages/' + program.webTemp
    if (!fs.pathExistsSync(templatePath)) {
        fs.removeSync(tmpPath)
        fs.removeSync(appPath)
        console.error(`--web-temp ${program.webTemp} doesn't exist.`)
        process.exit(1)
    }

    // copy template and remove temporary path
    fs.copySync(templatePath, appPath)
    fs.removeSync(tmpPath)
    process.chdir(appPath)

    initGit(appPath)
    install(appPath)
}

function initGit (appPath) {
    try {
        const appPackage = require(path.join(appPath, 'package.json'))
        appPackage.name = appName
        fs.writeFileSync(
            path.join(appPath, 'package.json'),
            JSON.stringify(appPackage, null, 4) + os.EOL,
        )

        fs.moveSync(path.join(appPath, 'gitignore'), path.join(appPath, '.gitignore'))

        execSync('git init', { stdio: 'ignore' })
        execSync('git add -A', { stdio: 'ignore' })
        execSync('git commit -m "Initialize project using Create Web Temp"', { stdio: 'ignore' })

        console.log()
        console.log('Initialized a git repository.')
    } catch (err) {
        console.warn('Git repository not initialized', err)
    }
}

function install (appPath) {
    const useYarn = program.yarn
    const packageCommand = useYarn ? 'yarn' : 'npm'
    const isInstall = program.install

    if (isInstall) {
        console.log()
        console.log('Installing packages. This might take a couple of minutes.')
        const command = useYarn ? 'yarn install -s' : 'npm install --loglevel error'
        execSync(command, { stdio: 'inherit' })
    }

    console.log()
    console.log(`Success! Created ${appName} at ${chalk.green(appPath)}`)
    console.log()
    console.log('Inside that directory, you can run several commands:')
    console.log(chalk.cyan(`    ${packageCommand} start`))
    console.log('        To starts the development server.')
    console.log(chalk.cyan(`    ${packageCommand} ${useYarn ? '' : 'run '}build`))
    console.log('        To bundles the app into static files for production.')
    console.log()
    console.log('We suggest that you begin by typing:')
    console.log(chalk.cyan(`    cd ${appName}`))
    !isInstall && console.log(chalk.cyan(`    ${useYarn ? 'yarn' : 'npm'} install`))
    console.log(chalk.cyan(`    ${packageCommand} start`))
    console.log()
}
