import readFolderByPath from './src/readFolder'
import { initProcessFile, OutputProcess } from './src/outputProcess'

const outputHandler = new OutputProcess('../翻译20221204/process.json')
outputHandler.initProcessFile()
readFolderByPath('../翻译20221204/text', outputHandler)