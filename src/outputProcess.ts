import * as fs from 'fs'
import { WriteStream } from 'fs'

export class OutputProcess {
	private readonly path: string
	private ws: WriteStream
	private total: number

	constructor (path: string) {
		this.path = path
		this.total = 0
	}

	createWriteStream () {
		this.ws = fs.createWriteStream(this.path, { flags:  'w' })
	}

	createAppendStream () {
		this.ws = fs.createWriteStream(this.path, { flags: 'a'  })
	}

	initProcessFile () {
		this.createWriteStream()
		this.ws.write('')
		this.ws.end()
	}

	output (fileName: string, process: Array<number>) {
		this.createAppendStream()
		this.ws.write(`  "${fileName}": `)
		this.ws.write(`[${process}],\n`)
		this.total += process[0]
		this.ws.end()
	}

	endStatistic () {
		const content = fs.readFileSync(this.path)
		const total = `  "total": ${this.total}`
		this.createWriteStream()
		this.ws.write(`{\n${content}${total}\n}`)
		this.ws.end()
	}
}
