import * as fs from 'fs'
import statistic from './statisticChineseAmount'
import { OutputProcess } from './outputProcess'

export default async function (path: string, outputHandler: OutputProcess) {
	try {
		const files = await fs.promises.readdir(path)
		files.sort() // 对文件名进行排序

		for (const fileName of files) {
			const fileContent = await fs.promises.readFile(`${path}/${fileName}`)
			if (fileContent.toString() === '[null]') {
				await outputHandler.output(fileName, [0, 0])
				continue
			}
			const copyWriting = JSON.parse(fileContent.toString().replace(/[\\ | \s*]/g, ''))
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
			await outputHandler.output(fileName, process)
			if (fileName === files[files.length - 1]) {
				await new Promise(resolve => setTimeout(resolve, 400))
				await outputHandler.endStatistic()
			}
		}
	} catch (err) {
		console.error(err)
	}
}