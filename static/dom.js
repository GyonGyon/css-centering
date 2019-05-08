const find = (selector, element = document) => {
    return element.querySelector(selector)
}

const finds = (selector, element = document) => {
    return element.querySelectorAll(selector)
}

const toggleClass = (element, className) => {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

const newElement = (tagName, props) => {
    const e = document.createElement(tagName)
    Object.assign(e, props)
    return e
}

const appendBodyElement = (element) => {
    document.body.appendChild(element)
}

const insertTemplate = (template, element = document.body, position = 'beforeEnd') => {
    element.insertAdjacentHTML(position, template)
}

const insertTemplates = (template, elements = [document.body], position = 'beforeEnd') => {
    elements.forEach((e) => {
        return insertTemplate(template, e, position)
    })
}

const insertIntoHead = (t, site = 'beforeEnd') => {
    document.head.insertAdjacentHTML(site, t)
}

const addEventToTable = (eventName, callback, eventTable, eventNames) => {
    if (!eventNames.includes(eventName)) {
        eventNames.push(eventName)
        eventTable[eventName] = []
    }
    eventTable[eventName].push(callback)
}

const bind = (element, eventName, callback) => {
    element.addEventListener(eventName, callback)
}

const binds = (element, eventNames, callback) => {
    eventNames.forEach((eventName) => {
        bind(element, eventName, callback)
    })
}

const bindEventsTable = (element, eventTable, eventNames) => {
    eventNames.forEach((name) => {
        eventTable[name].forEach((callback) => {
            bind(element, eventName, callback)
        })
    })
}

const bindElements = (elements, eventName, callback) => {
    elements.forEach((element) => {
        element.addEventListener(eventName, callback)
    })
}

const unbind = (element, eventName, callback) => {
    element.removeEventListener(eventName, callback)
}

const unbindEvents = (element, eventNames, callback) => {
    eventNames.forEach((eventName) => {
        unbind(element, eventName, callback)
    })
}

const unbindEventsTable = (element, eventTable, eventNames) => {
    eventNames.forEach((name) => {
        eventTable[name].forEach((callback) => {
            unbind(element, eventName, callback)
            eventNames.shift(name)
        })
    })
}

const unbindElements = (elements, eventName, callback) => {
    elements.forEach((element) => {
        element.removeEventListener(eventName, callback)
    })
}

const classListString = (...classList) => {
    return classList.join(' ')
}

const closeClass = (className) => {
    const selector = '.' + className
    const e = f(selector)
    e.classList.remove(className)
}

const closeClassAll = (className) => {
    const selector = '.' + className
    const es = fs(selector)
    for (let i = 0; i < es.length; i++) {
        const e = es[i]
        e.classList.remove(className)
    }
}

const removeAll = (selector) => {
    const elements = fs(selector)
    for (let i = 0; i < elements.length; i++) {
        const e = elements[i]
        e.remove()
    }
}

const removeClassAll = (selector, className) => {
    const elements = fs(selector)
    for (let i = 0; i < elements.length; i++) {
        const e = elements[i]
        e.classList.remove(className)
    }
}

const removeAllChild = (selector) => {
    let elements = f(selector)
    for (let i = 0; i < elements.childNodes.length; i++) {
        const e = elements.childNodes[i]
        elements.removeChild(e)
    }
}

const addClassAll = (selector, className) => {
    const elements = fs(selector)
    for (let i = 0; i < elements.length; i++) {
        const e = elements[i]
        e.classList.add(className)
    }
}

// ---- update attribute ---
const enumerateTable = (table, callback) => {
    let i = 0
    for (let k in table) {
        if (table.hasOwnProperty(k)) {
            callback(k, i)
            i++
        }
    }
}

const updateTable = (element, table, callback) => {
    enumerateTable(table, (k) => {
        const v = table[k]
        callback(element, k, v)
    })
}

const updateAttribute = (element, name, value) => {
    element.setAttribute(name, value)
}

const updateAttributes = (element, table) => {
    updateTable(element, table, updateAttribute)
}

const updateData = (element, name, value) => {
    const k = `data-${name}`
    element.setAttribute(k, value)
}

const updateDatas = (element, table) => {
    updateTable(element, table, updateData)
}

const updateStyle = (element, name, value) => {
    element.style[name] = value
}

const updateStyles = (element, table) => {
    updateTable(element, table, updateStyle)
}

// ---- not used ----

// const _e = (selector, element = document) => {
//     return element.querySelector(selector)
// }

// const _es = (selector, element = document) => {
//     return element.querySelectorAll(selector)
// }

const dom = {
    find,
    finds,
    toggleClass,
    newElement,
    appendBodyElement,
    insertTemplate,
    insertTemplates,
    insertIntoHead,
    addEventToTable,
    bind,
    binds,
    bindEventsTable,
    bindElements,
    unbind,
    unbindEvents,
    unbindEventsTable,
    unbindElements,
    classListString,
    closeClass,
    closeClassAll,
    removeAll,
    removeClassAll,
    removeAllChild,
    addClassAll,
    enumerateTable,

    // update attributes
    updateAttribute,
    updateAttributes,
    updateData,
    updateDatas,
    updateStyle,
}
