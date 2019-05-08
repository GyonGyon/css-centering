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
    if (document === null) {
        return 0
    }
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

const transitionTime = (h) => {
    let time = h / 3000
    const max = 0.3
    time = time > max ? max : time
    return time
}

const extendContent = (e) => {
    let h
    const dynamic = e.dataset.dynamic !== undefined
    if (dynamic) {
        h = currentHeight(e)
    } else {
        h = cachedHeight(e)
    }

    let time = transitionTime(h)
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
            transition: transitionTime(h) + 's',
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

const setHeightAtFirst = (e) => {
    updateStyles(e, {
        height: 0,
        // height: currentHeight(e) + 'px',
    })
    extendContent(e)
}

const bindPiece = (piece) => {
    const t = find('.title', piece)
    const c = find('.content', piece)
    setHeightAtFirst(c)
    bind(t, 'click', () => {
        const open = c.dataset.extend
        if (open === 'true') {
            shrinkContent(c)
        } else {
            extendContent(c)
        }
    })

    const name = find('.title-name', piece)
    bind(name, 'click', (e) => e.stopPropagation())
}

const bindPieces = () => {
    const pieces = finds('.piece')
    pieces.forEach((p, i) => {
        bindPiece(p)
    })
}

const delayJumpHash = () => {
    const h = location.hash
    location.hash = ''
    setTimeout(() => {
        location.hash = h
    }, 300)
}

const __main = () => {
    window.onload = () => {
        bindPieces()
        delayJumpHash()
    }
}

__main()
