const fs = require('fs')
const Path = require('path')
const yaml = require('js-yaml')
const nunjucks = require('nunjucks')
// const chokidar = require('chokidar')
const htmlMini = require('html-minifier')
const { log, success, failure } = require('./utils/log')
const { writeFile, removeDir, copyDir } = require('./utils/fileOperations')

const readYaml = (filePath) => {
    try {
        const content = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'))
        return content
    } catch (e) {
        console.log(e)
    }
}

const initedNunjucks = (templatePath, option) => {
    const path = templatePath || './template'
    const opt = option || {
        autoescape: false,
        watch: true,
    }
    const njk = new nunjucks.configure(path, opt)
    return njk
}

const minifyHtml = (html) => {
    const s = htmlMini.minify(html, {
        collapseWhitespace: true,
        minifyCSS: true,
        removeComments: true,
        removeCommentsFromCDATA: true,
    })
    return s
}

const loadedContend = (name) => {
    const p = Path.resolve(Path.join('./content', name))
    const exist = fs.existsSync(p)
    const content = exist ? readYaml(p) : {}
    return content
}

const resolvedPath = (...names) => {
    const p = Path.resolve(Path.join(...names))
    return p
}

const buildHtmls = (templatePath) => {
    const njk = initedNunjucks()
    const names = fs.readdirSync(templatePath)
    names.forEach((name) => {
        const n = Path.basename(name, '.njk')
        const t = resolvedPath('./template/build', name)
        const c = loadedContend(n + '.yml')
        let s = njk.render(t, {content: c})
        s = minifyHtml(s)
        const p = resolvedPath('./public', n + '.html')
        writeFile(p, s)

        success(`写入 ${p}`)
    })
}

const tryBuild = (publicPath = './public', templatePath = './template/build', staticPath = './static') => {
    try {
        const p = Path.resolve(publicPath)
        removeDir(p)
        success('移除 public 目录内容')

        const t = Path.resolve(templatePath)
        buildHtmls(t)
        success('构建全部 html 文件')

        const s = Path.resolve(staticPath)
        copyDir(s, p)
        success('复制静态文件')
        success('完成\n')
    } catch (error) {
        failure(error)
    }
}

// const startWatchChange = () => {
//     tryBuild()
//     chokidar.watch(['./template', './content', './static', './utils']).on('change', (event, path) => {
//         log('event', event)
//         log('重新构建 html')
//         tryBuild()
//     })
// }

const __main = () => {
    log('开始构建 html')
    tryBuild()
    // if (process.env.npm_lifecycle_event === 'build') {
    //     tryBuild()
    //     process.exit(0)
    // } else {
    //     startWatchChange()
    // }
}

if (require.main === module) {
    __main()
}
