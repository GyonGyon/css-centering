const fs = require('fs')
const path = require('path')

const checkDir = (dirpath) => {
    const exist = fs.existsSync(dirpath)
    return exist
}

const checkDirByFile = (filePath) => {
    const dirpath = path.dirname(filePath)
    const exist = fs.existsSync(dirpath)
    return exist
}

const createDir = (dirPath) => {
    if (checkDir(dirPath)) {
        return
    }
    const sep = path.sep
    const dirs = dirPath.split(sep)
    const head = dirs.shift()
    let p = head + sep
    dirs.forEach((dir) => {
        p = path.join(p, dir)
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p)
        }
    })
}

const createDirByFile = (filePath) => {
    const dirPath = path.dirname(filePath)
    createDir(dirPath)
}

const writeFile = (filePath, content) => {
    createDirByFile(filePath)
    fs.writeFileSync(filePath, content)
}

const copyFile = (originalPath, targetPath) => {
    createDirByFile(targetPath)
    const file = fs.readFileSync(originalPath)
    fs.writeFileSync(targetPath, file)
}

const copyFiles = (originalPaths, targetDirPath) => {
    createDir(targetDirPath)
    originalPaths.forEach((originalPath) => {
        const file = fs.readFileSync(originalPath)
        const name = path.basename(originalPath)
        const targetPath = path.join(targetDirPath, name)
        fs.writeFileSync(targetPath, file)
    })
}

const copyDir = (originalDirPath, targetDirPath) => {
    createDir(targetDirPath)
    const paths = fs.readdirSync(originalDirPath)
    paths.forEach((p, i) => {
        const origin = path.join(originalDirPath, p)
        const target = path.join(targetDirPath, p)
        const stat = fs.statSync(origin)
        if (stat.isDirectory()) {
            fs.mkdirSync(target)
            copyDir(origin, target)
        } else {
            copyFile(origin, target)
        }
    })
}

const removeDir = (dirPath) => {
    if (!checkDir(dirPath)) {
        return
    }
    let files = fs.readdirSync(dirPath)
    for (var i = 0; i < files.length; i++) {
        let newPath = path.join(dirPath, files[i])
        let stat = fs.statSync(newPath)
        if (stat.isDirectory()) {
            removeDir(newPath)
        } else {
            fs.unlinkSync(newPath)
        }
    }
    fs.rmdirSync(dirPath)
}

module.exports = {
    checkDir,
    checkDirByFile,
    createDir,
    createDirByFile,
    writeFile,
    copyFile,
    copyFiles,
    copyDir,
    removeDir,
}
