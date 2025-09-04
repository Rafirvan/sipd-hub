
export function toSentenceCase(str: string|undefined): string {
    if (str === undefined) return ""
    return str.toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase())
}
