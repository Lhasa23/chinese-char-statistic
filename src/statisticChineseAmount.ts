export const reg = /[\u4e00-\u9fa5]/g

export default function (sentence: string) {
	const matchResult = sentence.match(reg)
	return matchResult ? matchResult.length : 0
}
