
export function titleCase(str) {
    if (str == null) {
        return null
    }
    return str.split(' ')
        .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
        .join(' ')
}

export function enumToText(str) {
    if (str == null) {
        return null
    }
    let newstr = str.split('_')
        .join(' ')
        .toLowerCase()
    return newstr[0].toUpperCase() + newstr.substr(1)
}

export function formatNumber(num) {
    if (num == null) {
        return null
    }

    return num.toLocaleString()
}
