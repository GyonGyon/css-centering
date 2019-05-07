const log = console.log.bind(console)
// const iframeWindow = (iframe) => {
//     const w = iframe.contentWindow || iframe.contentDocument.parentWindow
//     return w
// }

// const iframeDocument = (iframe) => {
//     const d = (iframe.contentWindow && iframe.contentWindow.document) || iframe.contentDocument
//     return d
// }

// const iframeHeight = (iframe) => {
//     const doc = iframe.contentDocument
//     const h = doc.scrollElement.scrollHeight || doc.body.scrollHeight
//     return h
// }

const pageHeight = (document) => {
    const h = document.scrollingElement.scrollHeight || document.body.scrollHeight
    return h
}

const currentHeight = (e) => {
    let h
    if (e.tagName === 'IFRAME') {
        h = pageHeight(e.contentDocument)
    } else {
        h = e.scrollHeight
    }
    return h
}

const cachedHeight = (e) => {
    let h
    h = e.dataset.height
    h = Number(h)
    if (h < 0 || isNaN(h)) {
        h = currentHeight(e)
    }
    return h
}

const ensureOneDataTimeout = (e, callback, time) => {
    let timeout = e.dataset.timeout
    timeout = Number(timeout)
    clearTimeout(timeout)
    timeout = setTimeout(callback, time)
    updateDatas(e, { timeout })
}

const extendContent = (e) => {
    let h
    const dynamic = e.dataset.dynamic !== undefined
    if (dynamic) {
        h = currentHeight(e)
    } else {
        h = cachedHeight(e)
    }

    const time = h / 3000
    updateStyles(e, {
        height: h + 'px',
        transition: time + 's',
    })
    updateDatas(e, {
        extend: 'true',
        height: h,
    })

    // 为了保证高度变化时正确显示内容
    if (dynamic) {
        ensureOneDataTimeout(
            e,
            () => {
                updateStyles(e, {
                    height: 'auto',
                })
            },
            time * 1000
        )
    }
}

const shrinkContent = (e) => {
    updateDatas(e, {
        extend: 'false',
    })

    const dynamic = e.dataset.dynamic !== undefined

    // 为了触发渐变动画
    if (dynamic) {
        const h = currentHeight(e)
        updateStyles(e, {
            height: h + 'px',
            transition: h / 3000 + 's',
        })
        ensureOneDataTimeout(e, () => {
            updateStyles(e, {
                height: 0,
            })
        })
    } else {
        updateStyles(e, {
            height: 0,
        })
    }
}

const shrinkAtFirst = (e) => {
    updateStyles(e, {
        height: 0,
    })
}

const bindPiece = (piece) => {
    const t = find('.title', piece)
    const e = find('.content', piece)
    shrinkAtFirst(e)
    bind(t, 'click', () => {
        const open = e.dataset.extend
        if (open === 'true') {
            shrinkContent(e)
        } else {
            extendContent(e)
        }
    })
}

const bindPieces = () => {
    const pieces = finds('.piece')
    pieces.forEach((p, i) => {
        bindPiece(p)
    })
}

const _tempCopyObj = (o) => {
    window.e = Object.create(null)
    let e = window.e
    for (let key in o) {
        e[key] = o[key]
    }
    log(e)
}

const __main = () => {
    window.onload = () => {
        bindPieces()
    }
}

__main()
