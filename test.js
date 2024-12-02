const input = [[1, 'xy'], [1, 'abc']]
const output = ['ya', 'bdg']

const main = () => {
  for (let i = 0; i < input.length; ++i) {
    if (execute(input[i]) !== output[i]) throw new Error(JSON.stringify(input[i]))
  }
}

const execute = (inputArr) => {
  const charArr = inputArr[1].split('')

  const countA = (i) => {
    switch (i) {
      case 0:
        return 1
      case 1:
        return 2
      case 2:
        return 4
      default:
        return countA(i - 1) + countA(i - 2) + countA(i - 3)
    }
  }
  const result = charArr.map((char, index) => {
    return String.fromCharCode(((countA(index) + char.charCodeAt(0) - 97) % 26) +97)
  })

  return result.join('')
}

main()