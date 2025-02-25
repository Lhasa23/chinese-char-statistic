import readFolderByPath from './src/readFolder'
import { OutputProcess } from './src/outputProcess'
import { Command } from 'commander'
const program = new Command()

program.version('0.0.1')
    .name('static-chinese-chars')
    .usage('<path>')
    .description('working directory and output directory')
    .arguments('<path>')
    .action(path => {
        console.log(path)
			  // ../绯月/翻译20221204/翻译器240929/
        const outputHandler = new OutputProcess(`${path}/output/process.json`)
        outputHandler.initProcessFile()
        readFolderByPath(path, outputHandler)
    })

program.parse(process.argv)
