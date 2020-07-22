#!/usr/bin/env node

const currentNodeVersion = process.versions.node
const major = currentNodeVersion.split('.')[0]

if (major < 8) {
    console.error(`
You are running Node ${major}.
Create Web Template requires Node 8 or higher.
Please update your version of Node.
    `)
    process.exit(1)
}

require('./createWebTemp')
