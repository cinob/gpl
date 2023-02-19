#!/usr/bin/env node

import { execSync } from 'child_process'
import fs from 'fs'

const ignoreDir = ['source']

function traverseDir(dirPath) {
  const files = fs.readdirSync(dirPath)

  if (files.includes('.git')) {
    console.log(`当前目录: ${dirPath}`)
    const output = execSync('git pull', { cwd: dirPath })
    console.log(output.toString())
    return
  }

  if (files.includes('package.json'))
    return

  for (const file of files) {
    if (file[0] === '.')
      continue
    const filePath = `${dirPath}/${file}`
    const stat = fs.statSync(filePath)

    if (stat.isDirectory() && !ignoreDir.includes(file))
      traverseDir(filePath)
  }
}

traverseDir(process.cwd())

