import * as fs from 'fs'
import statistic from './statisticChineseAmount'
import { OutputProcess } from './outputProcess'

export default async function processFiles(path: string, outputHandler: OutputProcess) {
	try {
		const files = await fs.promises.readdir(path)
		for (const fileName of files) {
			if (!fileName.endsWith('.json')) continue
			const fileContent = await fs.promises.readFile(`${path}/${fileName}`)
			if (fileContent.toString() === '[null]') {
				outputHandler.output(fileName, [0, 0])
				continue
			}
			const copyWriting = JSON.parse(fileContent.toString().replace(/[\\|\s*]/g, ''))
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
		}
		outputHandler.endStatistic()
	} catch (err) {
		console.error(err)
	}
}