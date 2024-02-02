import readFolderByPath from './src/readFolder'
import { OutputProcess } from './src/outputProcess'

const outputHandler = new OutputProcess('../WolfACTTranslate/process.json')
outputHandler.initProcessFile()
readFolderByPath('../WolfACTTranslate/Json', outputHandler)
