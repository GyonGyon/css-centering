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

const extendContent = (content, cache = true) => {
    const e = content
    const tag = e.tagName
    let h
    if (cache) {
        h = e.dataset.height
        h = Number(h)
    }
    if (!(h >= 0)) {
        if (tag === 'IFRAME') {
            h = pageHeight(e.contentDocument)
        } else {
            h = e.scrollHeight
        }
    }
    updateStyles(e, {
        height: h + 'px',
    })
    if (tag !== 'IFRAME') {
        setTimeout(() => {
            updateStyles(e, {
                height: 'auto',
            })
        }, 350)
    }
    updateDatas(e, {
        extend: 'true',
        height: h,
    })
}

const shrinkContent = (content) => {
    let e = content
    updateDatas(e, {
        extend: 'false',
    })
    updateStyles(e, {
        height: 0,
    })
}

const resetPieceIframe = (content) => {
    let e = content
    shrinkContent(e)
    e.onload = () => {
        shrinkContent(e)
    }
}

const bindPiece = (piece) => {
    const t = find('.title', piece)
    const c = find('.content', piece)
    resetPieceIframe(c)
    bind(t, 'click', () => {
        const open = c.dataset.extend
        if (open === 'true') {
            shrinkContent(c)
        } else {
            extendContent(c)
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
