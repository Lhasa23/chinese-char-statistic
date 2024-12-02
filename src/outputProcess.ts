import * as fs from 'fs'
import * as path from 'path'
import { WriteStream } from 'fs'

export class OutputProcess {
    private readonly path: string
    private ws: WriteStream
    private current: number
    private total: number

    constructor(path: string) {
        this.path = path
        this.current = 0
        this.total = 0
    }

    createWriteStream() {
        if (!fs.existsSync(this.path)) {
            const dirname = path.dirname(this.path)
            fs.mkdirSync(dirname, {recursive: true})
        }
        this.ws = fs.createWriteStream(this.path, {flags: 'w'})
    }

    createAppendStream() {
        this.ws = fs.createWriteStream(this.path, {flags: 'a'})
    }

    initProcessFile() {
        this.createWriteStream()
        this.ws.write('')
        this.ws.end()
    }

    output(fileName: string, process: Array<number>) {
        this.createAppendStream()
        this.ws.write(`  "${fileName}": `)
        this.ws.write(`[${process}],\n`)
        this.current += process[0]
        this.total += process[1]
        this.ws.end()
    }

    endStatistic() {
        const content = fs.readFileSync(this.path)
        const total = `  "total": [${this.current}, ${this.total}]`
        this.createWriteStream()
        this.ws.write(`{\n${content}${total}\n}`)
        this.ws.end()
    }
}
