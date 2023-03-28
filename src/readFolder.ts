import * as fs from 'fs'
import statistic from './statisticChineseAmount'
import { OutputProcess } from './outputProcess'

export default function (path: string, outputHandler: OutputProcess) {
	fs.readdir(path, (err, files) => {
		if (err) {
			console.error(err)
			return
		}

		files.forEach(async (fileName, index) => {
			if (index === files.length - 1) {
				setTimeout(() => {
					outputHandler.endStatistic()
				}, 1000)
			}
			fs.readFile(`${path}/${fileName}`, (err, data) => {
				if (err) return console.log(err, fileName)
				if (data.toString() === '[null]') return outputHandler.output(fileName, [0, 0])
				const copyWriting = JSON.parse(data.toString().replace(/[\\ | \s*]/g, ''))
				const fileResult = copyWriting.map(sentence => {
					if (sentence) {
						const [origin, translation] = sentence
						const originLength = statistic(origin)
						return [translation.length && originLength, originLength]
					}
					return [0, 0]
				}) as Array<Array<number>>
				const process = fileResult.reduce((res, currentProcess) => {
					res[0] += currentProcess[0]
					res[1] += currentProcess[1]
					return res
				}, [0, 0])
				outputHandler.output(fileName, process)
			})
		})
	})
}