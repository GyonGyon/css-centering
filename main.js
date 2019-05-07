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
    let h
    if (cache) {
        h = e.dataset.height
        h = Number(h)
        e.setAttribute('data-height', h)
    }
    log('h >= 0', h >= 0)
    if (!(h >= 0)) {
        h = pageHeight(e.contentDocument)
    }
    e.style.height = h + 'px'
    e.setAttribute('data-extend', 'true')
}

const shrinkContent = (content) => {
    let e = content
    e.setAttribute('data-extend', 'false')
    e.style.height = 0
}

const resetPieceIframe = (iframe) => {
    shrinkContent(iframe)
    iframe.onload = () => {
        shrinkContent(iframe)
    }
}

const bindPiece = (piece) => {
    const h2 = find('h2', piece)
    const iframe = find('iframe', piece)
    resetPieceIframe(iframe)
    bind(h2, 'click', () => {
        const open = iframe.dataset.extend
        if (open === 'true') {
            shrinkContent(iframe)
        } else {
            extendContent(iframe)
        }
    })
}

const bindPieces = () => {
    const pieces = finds('.piece')
    pieces.forEach((p) => {
        bindPiece(p)
    })
}

const __main = () => {
    window.onload = () => {
        bindPieces()
    }
}

__main()
