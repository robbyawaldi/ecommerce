import path from 'path'

export const renameFile = (filename: string) => {
    const parser = path.parse(filename)
    const name = parser.name
    const ext = parser.ext
    return name.replace(/\s+/g, '_') + '_' + new Date().getTime() + ext;
}