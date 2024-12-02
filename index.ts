import readFolderByPath from './src/readFolder'
import { OutputProcess } from './src/outputProcess'

const outputHandler = new OutputProcess('../绯月/翻译20221204/翻译器240929/process.json')
outputHandler.initProcessFile()
readFolderByPath('../绯月/翻译20221204/翻译器240929/text', outputHandler)
