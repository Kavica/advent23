const Day_1_1 = () => {
    const calibrationData = calibration.split(/\r?\n/)
    let calibrationNumbers = getCalibrationNumbers(calibrationData)
    const sum = sumArray(calibrationNumbers)
    displayAnswer(sum)
}

const sumArray = (arrayToSum) =>{
    return arrayToSum.reduce((partialSum, a) => partialSum + a, 0)
}

const getCalibrationNumbers = (calibrationData) =>{
    const combinedNumbers = []
    for(let line of calibrationData){
        let twoNumbers = ''
        line = line.replace(/\D/g,'')
        twoNumbers = line.charAt(0)
        line = line.split('').reverse().join('')
        twoNumbers += line.charAt(0)
        combinedNumbers.push(parseInt(twoNumbers))
    }
    return combinedNumbers
}

const Day_1_2 = () => {
    const calibrationData = calibration.split(/\r?\n/)
    let convertedData = converAlphaToNumeric(calibrationData)
    let calibrationNumbers = getCalibrationNumbers(convertedData)
    const sum = sumArray(calibrationNumbers)
    displayAnswer(sum)
}

const converAlphaToNumeric = (calibrationData) =>{
    const updatedLines = []
    for(let line of calibrationData){
        let newLine = ''
        characterLoop:
        for(let i = 0; i < line.length; i++){
            if(numbers.includes(line[i])){
                newLine += line[i]
                continue characterLoop
            }else{
                for(let number of numbersSpelledOut){
                    if(number == line.substring(i, i + number.length)){
                        newLine += getNumberValue(number)
                        continue characterLoop
                    }
                }
            }
        }
        updatedLines.push(newLine)
    }
    return updatedLines
}

const getNumberValue = (number) =>{
    switch(number){
        case 'one':
            return '1'
        case 'two': 
            return '2'
        case 'three':
            return '3'
        case 'four':
            return '4'
        case 'five':
            return '5'
        case 'six':
            return '6'
        case 'seven':
            return '7'
        case 'eight': 
            return '8'
        case 'nine': 
            return '9'

    }
}

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
const numbersSpelledOut = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']


const Day_2_1 = () => {
    let organizedData = organizeGameData()
    let sum = 0
    for(score of organizedData){
        sum += score.id
    }
    displayAnswer(sum)
}

const maxCube = {
    red: 12,
    green: 13,
    blue: 14
}

const organizeGameData = () =>{
    const games = gameTracker.split(/\r?\n/)
    const organizedGames = []
    for(const game of games){
        let id = 0
        let high = {
            red: 0,
            blue: 0,
            green: 0
        }
        let firstSplit = game.split(':')
        id = parseInt(firstSplit[0].split(' ')[1])
        for(let round of firstSplit[1].split(';')){
            for(let color of round.split(',')){
                color = color.trim()
                if(high[color.split(' ')[1].replace(/\s/g, '')] < parseInt(color.split(' ')[0].replace(/\s/g))){
                    high[color.split(' ')[1].replace(/\s/g, '')] = parseInt(color.split(' ')[0].replace(/\s/g))
                }
            }
        }
        organizedGames.push(new GameObject(id, high))
    }
    return organizedGames
}

class GameObject{
    constructor(id, values){
        this._id = id
        this._red = values.red
        this._green = values.green
        this._blue = values.blue
        this._power = 0

        this.checkValid()
        this.setPower()
    }
    
    get power(){
        return this._power
    }

    get id(){
        return this._id
    }
    setPower(){
        this._power = this._red * this._blue * this._green
    }

    checkValid(){
        if(this._red > maxCube.red) this._id = 0
        if(this._green > maxCube.green) this._id = 0
        if(this._blue > maxCube.blue) this._id = 0
    }
}



const Day_2_2 = () => {
    let organizedData = organizeGameData()
    let sum = 0
    for(score of organizedData){
        sum += score.power
    }
    displayAnswer(sum)
}

const inNumeric = (input) =>{
    return /^\d+$/.test(input)
}

const Day_3_1 = () => {
    const cleanPartsData = cleanUpPartsData()
    const partNumbers = getPartNumber(cleanPartsData)
    displayAnswer(sumArray(partNumbers))

}

const cleanUpPartsData = () =>{
    const partsData = parts.split(/\r?\n/)
    buildDirectionIndices(partsData[0].length)
    let cleanPartsData = []
    for(let line of partsData){
        cleanPartsData.push(line)
    }
    const partsInOneLine = cleanPartsData.join('')

    let convertedData = ''
    for(let i = 0; i < partsInOneLine.length; i++){
        if(inNumeric(partsInOneLine[i])){
            convertedData += partsInOneLine[i]
        }else if(partsInOneLine[i] == '.'){
            convertedData += 'a'
        }else{
            convertedData += 's'
        }
    }

    return convertedData
}

let directionIndices = []

const buildDirectionIndices = (length) =>{
    directionIndices.push(1)
    directionIndices.push(length - 1)
    directionIndices.push(length)
    directionIndices.push(length + 1)
    let negativeArray = []
    for(let i = 0; i < directionIndices.length; i++){
        negativeArray.push(directionIndices[i] * -1)
    }
    directionIndices = directionIndices.concat(negativeArray)
}
const getPartNumber = (data) =>{
    const verifiedPartNumbers = []
    let setOfNumbers = []
    let indicesToCheck = []
    for(let position = 0; position < data.length; position++){
        if(inNumeric(data[position])){
            setOfNumbers.push(data[position])
            for(let number of directionIndices){
                if(!indicesToCheck.includes(number + position)) indicesToCheck.push(number + position)
            }
        }else{
            let special = false
            console.log(indicesToCheck)
            checkingForSpecial:
            for(let i = 0; i < indicesToCheck.length; i++){
                if(data[indicesToCheck[i]] === 's'){
                    special = true
                    break checkingForSpecial
                }
            }
            if(special) verifiedPartNumbers.push(parseInt(setOfNumbers.join('')))
            setOfNumbers = []
            indicesToCheck = []
        }
    }
    return verifiedPartNumbers
}

const Day_3_2 = () => {

}

// const formatCleanupAssignmentPairs = () =>{
//     const formattedPairs = []
//     const pairs = cleanupAssignments.split(/\r?\n/)
//     for(let pair of pairs){
//         let individuals = pair.split(',')
//         let formatted = {
//             first: {
//                 low: parseInt(individuals[0].split('-')[0]),
//                 high: parseInt(individuals[0].split('-')[1])
//             }, 
//             second: {
//                 low: parseInt(individuals[1].split('-')[0]),
//                 high: parseInt(individuals[1].split('-')[1])
//             }
//         }
//         formattedPairs.push(formatted)
//     }
//     return formattedPairs
// }

// const checkForInclusion = (pair) =>{
//     if(pair.first.low >= pair.second.low && pair.first.high <= pair.second.high) return true
//     if(pair.second.low >= pair.first.low && pair.second.high <= pair.first.high) return true
//     return false
// }

// const Day_4_1 = () => {
//     let totalInclusionCount = 0
//     let formattedPairs = formatCleanupAssignmentPairs()
//     for(let pair of formattedPairs){
//         if(checkForInclusion(pair)) totalInclusionCount++
//     }
//     displayAnswer(totalInclusionCount)
// }

// const checkForOverlaps = (pair) =>{
//     if(pair.first.low >= pair.second.low && pair.first.low <= pair.second.high) return true
//     if(pair.first.high >= pair.second.low && pair.first.high <= pair.second.high) return true
//     if(pair.second.low >= pair.first.low && pair.second.low <= pair.first.high) return true
//     if(pair.second.high >= pair.first.low && pair.second.high <= pair.first.high) return true
//     return false
// }

// const Day_4_2 = () => {
//     let totalOverlaps = 0
//     let formattedPairs = formatCleanupAssignmentPairs()
//     for(let pair of formattedPairs){
//         if(checkForOverlaps(pair)) totalOverlaps++
//     }
//     displayAnswer(totalOverlaps)
// }

// const separateCratesAndDirections = () =>{
//     const lines = crateData.split(/\r?\n/)
//     let crates = []
//     let directions = []
//     let switchDestination = false
//     for(let line of lines){
//         if(switchDestination){
//             directions.push(line)
//         }else if(line == ''){
//             switchDestination = true
//         }else{
//             crates.push(line)
//         }
//     }
//     crates.pop()
//     return [crates, directions]
// }

// const formatDirections = (vanillaDirections) =>{
//     const formattedDirections = []
//     for(let line of vanillaDirections){
//         let splitDirections = line.split(' ')
//         formattedDirections.push({
//             move: parseInt(splitDirections[1]),
//             from: (parseInt(splitDirections[3]) - 1),
//             to: (parseInt(splitDirections[5]) - 1)
//         })
//     }
//     return formattedDirections
// }

// const orientStrings = (formattedCrates) =>{
//     let words = new Array(formattedCrates.length).fill('')
//     for(let row of formattedCrates){
//         for(let index = 0; index < row.length; index++){
//             if(row[index] == '-') continue
//             words[index] += row[index]
//         }
//     }
//     return words
// }

// const formatCratesToStrings = (crates) =>{
//     let stacks = []
//     for(let i = crates.length - 1; i >= 0; i--){
//         let word = ''
//         for(let character of crates[i]){
//             switch(character){
//                 case '[':
//                 case ']':
//                     spaceCount = 0
//                     break
//                 case ' ':
//                     spaceCount++
//                     if(spaceCount == 4){
//                         spaceCount = 0
//                         word += '-'
//                     }
//                     break
//                 default:
//                     word += character
//             }
//         }
//         stacks.push(word)
//     }
//     return orientStrings(stacks)
// }

// const formatCrateData = () =>{
//     let separated = separateCratesAndDirections()
//     return {
//         crates: formatCratesToStrings(separated[0]),
//         directions: formatDirections(separated[1])
//     }
// }

// const getTopOfEachCrate = (crates) =>{
//     let topOfStack = ''
//     for(let crateStack of crates){
//         topOfStack += crateStack.slice(-1)
//     }
//     return topOfStack
// }

// const Day_5_1 = () => {
//     let data = formatCrateData()
//     for(let direction of data.directions){
//         data.crates[direction.to] += data.crates[direction.from].slice(-direction.move).split('').reverse().join('')
//         data.crates[direction.from] = data.crates[direction.from].substring(0, data.crates[direction.from].length - direction.move)
//     }
//     displayAnswer(getTopOfEachCrate(data.crates))
// }

// const Day_5_2 = () => {
//     let data = formatCrateData()
//     for(let direction of data.directions){
//         data.crates[direction.to] += data.crates[direction.from].slice(-direction.move)
//         data.crates[direction.from] = data.crates[direction.from].substring(0, data.crates[direction.from].length - direction.move)
//     }
//     displayAnswer(getTopOfEachCrate(data.crates))
// }

// const uniqueString = (section) =>{
//     return new Set(section).size == section.length
// }

// const Day_6_1 = () => {
//     let packetMarker = null
//     for(let i = 3; i < datastream.length; i++){
//         let section = datastream.slice(i - 3, i + 1)
//         if(uniqueString(section)){
//             packetMarker = i + 1
//             break
//         }
//     }
//     displayAnswer(packetMarker)
// }

// const Day_6_2 = () => {
//     let packetMarker = null
//     for(let i = 13; i < datastream.length; i++){
//         let section = datastream.slice(i - 13, i + 1)
//         if(uniqueString(section)){
//             packetMarker = i + 1
//             break
//         }
//     }
//     displayAnswer(packetMarker)
// }

// const formatCommandData = () =>{
//     const lines = terminalOutput.split(/\r?\n/)
//     let rootDirectory = new Directory(null)
//     const directories = [rootDirectory]

//     for(let line of lines){
//         if(line.slice(0,4) == '$ cd'){
//             let specificDirectory = line.split('$ cd ')[1]
//             if(specificDirectory == '/') continue
//             specificDirectory == '..' ? directories.pop() : directories.push(directories.at(-1).getSubDirectoryByName(specificDirectory))
//         }else if(line.slice(0,4) == '$ ls'){
//             //nothing
//         }else if(line.slice(0,3) == 'dir'){
//             const newDirectoryName = line.split(' ')[1]
//             directories.at(-1).addSubDirectory(newDirectoryName, new Directory(directories.at(-1)))
//         }else{
//             directories.at(-1).addFile(parseInt(line.split(' ')[0]))
//         }
//     }
//     return rootDirectory
// }

// let sumOfDirectoriesUnder100k = 0

// const getDirectoryTotals = (directory) =>{
//     if(directory.totalSize < 100000) sumOfDirectoriesUnder100k += directory.totalSize
//     for(let dir in directory.subDirectories){
//         getDirectoryTotals(directory.subDirectories[dir])
//     }
// }

// let smallestDirectorySize = 0

// const smallestDirectoryThatClearsEnoughSpace = (spaceToclear, directory) =>{
//     if(directory.totalSize > spaceToclear && directory.totalSize < smallestDirectorySize) smallestDirectorySize = directory.totalSize
//     for(let dir in directory.subDirectories){
//         smallestDirectoryThatClearsEnoughSpace(spaceToclear, directory.subDirectories[dir])
//     }
// }

// class Directory{
//     constructor(parent){
//         this._parentDirectory = parent
//         this._subDirectories = {}
//         this._fileSize = 0
//         this._directoryTotalSize = 0
//         this._subDirectoriesSize = 0
//     }

//     get totalSize(){
//         return this._directoryTotalSize
//     }

//     get subDirectories(){
//         return this._subDirectories
//     }

//     getSubDirectoryByName(directoryName){
//         return this._subDirectories[directoryName]
//     }

//     addSubDirectory(newDirectoryName, newDirectory){
//         this._subDirectories[newDirectoryName] = newDirectory
//     }

//     addFile(newFileSize){
//         this._fileSize += newFileSize
//         this.updateTotalSize()
//     }

//     updateTotalSize(){
//         this._directoryTotalSize = this._fileSize + this._subDirectoriesSize
//         if(this._parentDirectory != null) this._parentDirectory.runUpdate()
//     }

//     runUpdate(){
//         this._subDirectoriesSize = 0
//         for(let directory in this._subDirectories){
//             this._subDirectoriesSize += this._subDirectories[directory].totalSize
//         }
//         this._directoryTotalSize = this._fileSize + this._subDirectoriesSize
//         if(this._parentDirectory != null) this._parentDirectory.runUpdate()
//     }
// }

// const Day_7_1 = () => {
//     getDirectoryTotals(formatCommandData())
//     displayAnswer(sumOfDirectoriesUnder100k)
// }

// const Day_7_2 = () => {
//     const directories = formatCommandData()
//     const totalSpace = 70000000
//     smallestDirectorySize = totalSpace
//     const initialAvailableSpace = totalSpace - directories.totalSize
//     const spaceNeeded = 30000000
//     const spaceToclear = spaceNeeded - initialAvailableSpace
//     smallestDirectoryThatClearsEnoughSpace(spaceToclear, directories)
//     displayAnswer(smallestDirectorySize)
// }

// const formatTreeGrid = () =>{
//     const lines = treeHeights.split(/\r?\n/)
//     const grid = []
//     for(let line of lines){
//         let gridRow = []
//         for(let character of line){
//             gridRow.push({
//                 height: parseInt(character),
//                 seen: false,
//                 edge: false
//             })
//         }
//         grid.push(gridRow)
//     }
//     return grid
// }

// const checkLeft = (grid, row, col) =>{
//     let isTallest = true
//     for(let i = col - 1; i >= 0; i--){
//         if(grid[row][i].height >= grid[row][col].height){
//             isTallest = false
//             break
//         }
//     }
//     return isTallest
// }

// const checkRight = (grid, row, col) =>{
//     let isTallest = true
//     for(let i = col + 1; i < grid[row].length ; i++){
//         if(grid[row][col].height <= grid[row][i].height){
//             isTallest = false
//             break
//         }
//     }
//     return isTallest
// }

// const checkUp = (grid, row, col) =>{
//     let isTallest = true
//     for(let i = row - 1; i >= 0; i--){
//         if(grid[i][col].height >= grid[row][col].height){
//             isTallest = false
//             break
//         }
//     }
//     return isTallest
// }

// const checkDown = (grid, row, col) =>{
//     let isTallest = true
//     for(let i = row + 1; i < grid.length ; i++){
//         if(grid[row][col].height <= grid[i][col].height){
//             isTallest = false
//             break
//         }
//     }
//     return isTallest
// }

// const checkCenter = (grid, row, col) =>{
//     let visibleAtEdge = false

//     if(col > 0) visibleAtEdge = checkLeft(grid, row, col)
//     if(!visibleAtEdge && col < grid[row].length - 1) visibleAtEdge = checkRight(grid, row, col)
//     if(!visibleAtEdge && row > 0) visibleAtEdge = checkUp(grid, row, col)
//     if(!visibleAtEdge && row < grid.length - 1) visibleAtEdge = checkDown(grid, row, col)

//     return visibleAtEdge
// }

// const markPerimeterAsSeen = (grid) =>{
//     for(let row = 0; row < grid.length; row++){
//         for(let col = 0; col < grid[row].length; col++){
//             if(row == 0 || row == grid.length - 1 || col == 0 || col == grid[row].length -1){
//                 grid[row][col].seen = true
//                 grid[row][col].edge = true
//             }else{
//                 grid[row][col].seen = checkCenter(grid, row, col)
//             }
//         }
//     }
//     return grid
// }

// const visibleTrees = (grid) =>{
//     let treeCount = 0
//     for(let row of grid){
//         for(let col of row){
//             if(col.seen) treeCount++
//         }
//     }
//     return treeCount
// }

// const Day_8_1 = () => {
//     let grid = formatTreeGrid()
//     grid = markPerimeterAsSeen(grid)
//     displayAnswer(visibleTrees(grid))
// }

// const countLeft = (grid, row, col) =>{
//     let positions = 0
//     left:
//     for(let i = col - 1; i >= 0; i--){
//         positions++
//         if(grid[row][i].height >= grid[row][col].height){
//             break left
//         }
//     }
//     return positions
// }

// const countRight = (grid, row, col) =>{
//     let positions = 0
//     right:
//     for(let i = col + 1; i < grid[row].length ; i++){
//         positions++
//         if(grid[row][col].height <= grid[row][i].height){
//             break right
//         }
//     }
//     return positions
// }

// const countUp = (grid, row, col) =>{
//     let positions = 0
//     up:
//     for(let i = row - 1; i >= 0; i--){
//         positions++
//         if(grid[i][col].height >= grid[row][col].height){
//             break up
//         }
//     }
//     return positions
// }

// const countDown = (grid, row, col) =>{
//     let positions = 0
//     down:
//     for(let i = row + 1; i < grid.length ; i++){
//         positions++
//         if(grid[row][col].height <= grid[i][col].height){
//             break down
//         }
//     }
//     return positions
// }

// const checkScenicScores = (grid) =>{
//     let highestScenicScore = 0
//     for(let row = 0; row < grid.length; row++){
//         for(let col = 0; col < grid[row].length; col++){
//             if(grid[row][col].edge) continue
//             let up = countUp(grid, row, col)
//             let left = countLeft(grid, row, col)
//             let down = countDown(grid, row, col)
//             let right = countRight(grid, row, col)
//             let product = left * right * up * down
//             if(product > highestScenicScore) highestScenicScore = product
//         }
//     }
//     return highestScenicScore
// }

// const Day_8_2 = () => {
//     let grid = formatTreeGrid()
//     grid = markPerimeterAsSeen(grid)
//     displayAnswer(checkScenicScores(grid))
// }

// const formatDayNineData = () =>{
//     const entries = []
//     const lines = ropeData.split(/\r?\n/)
//     for(const line of lines){
//         entries.push({
//             direction: line.split(' ')[0],
//             value: parseInt(line.split(' ')[1])
//         })
//     }
//     return entries
// }

// const getSizeOfAndCreateGrid = (directions) =>{
//     let row = 0
//     let col = 0
//     let highestRow = 0
//     let highestCol = 0
//     for(const direction of directions){
//         switch(direction.direction){
//             case 'R':
//                 row += direction.value
//                 if(row > highestRow) highestRow = row
//                 break
//             case 'L':
//                 row -= direction.value
//                 break
//             case 'U':
//                 col += direction.value
//                 if(col > highestCol) highestCol = col
//                 break
//             case 'D':
//                 col -= direction.value
//                 break
//         }
//     }
//     let grid = []
//     for(let i = 0; i < highestCol + 1; i++){
//         let gridRow = []
//         for(let j = 0; j < highestRow + 1; j++){
//             gridRow.push({visited: false})
//         }
//         grid.push(gridRow)
//     }
//     return grid
// }

// const moveRopeRight = (steps) =>{
//     for(let i = head.location.col; i < head.location.col + steps; i++){
//         head.last = head.location
//         head.location.col++

//     }

// }

// const istailTouchingHead = () =>{
    
// }

// const moveRopeLeft = (steps) =>{
    
// }

// const moveRopeUp = (steps) =>{
    
// }

// const moveRopeDown = (steps) =>{
    
// }

// const simMovement = (directions) =>{
//     for(const direction of directions){
//         switch(direction.direction){
//             case 'R':
//                 moveRopeRight(direction.value)
//                 break
//             case 'L':
//                 moveRopeLeft(direction.value)
//                 break
//             case 'U':
//                 moveRopeUp(direction.value)
//                 break
//             case 'D':
//                 moveRopeDown(direction.value)
//                 break
//         }
//     }
// }

// let grid = null
// let head = null
// let tail = null

// const Day_9_1 = () => {
//     let directions = formatDayNineData()
//     grid = getSizeOfAndCreateGrid(directions)
//     grid[grid.length - 1][0].visited = true

//     head = {
//         location: {
//             row: grid.length - 1,
//             col: 0
//         },
//         last: null
//     }

//     tail = {
//         location: {
//             row: grid.length - 1,
//             col: 0
//         }
//     }
//     simMovement(directions)
// }

// const Day_9_2 = () => {
//     basinGrid = createSmokeGrid()
//     let gridBounds = {
//         min: 0,
//         max: basinGrid.length - 1
//     }
//     for(let [rowInex, rowValue] of basinGrid.entries()){
//         let rowBounds = {
//             min: 0,
//             max: rowValue.length - 1
//         }
//         for(let [colIndex, colValue] of rowValue.entries()){
//             if(colValue.num != 9) checkForBasin(basinGrid, gridBounds, rowBounds, rowInex, colIndex)
//         }
//     }

//     displayAnswer(basinProduct())
// }

// const basinProduct = () => {
//     let product = 1
//     for(let row of basinGrid){
//         for(let col of row){
//             if(col.basin == null) continue
//             basins[col.basin].count += 1
//         }
//     }
//     basins.sort((a, b) => (a.count > b.count) ? -1 : 1)
//     for(let i = 0; i < 3; i++){
//         product *= basins[i].count
//     }
//     return product
// }

// const checkForBasin = (basinGrid, gridBounds, rowBounds, rowIndex, colIndex) => {
//     let hasBasinID = false
//     if(rowIndex > gridBounds.min){
//         if(basinGrid[rowIndex - 1][colIndex].basin != null){
//             basinGrid[rowIndex][colIndex].basin = basinGrid[rowIndex - 1][colIndex].basin
//             hasBasinID = true
//         }
//     }
    
//     if(colIndex > rowBounds.min){
//         if(basinGrid[rowIndex][colIndex - 1].basin != null){
//             if(hasBasinID){
//                 reconcileBasins(basinGrid[rowIndex][colIndex].basin, basinGrid[rowIndex][colIndex - 1].basin)
//             }else{
//                 basinGrid[rowIndex][colIndex].basin = basinGrid[rowIndex][colIndex - 1].basin
//             }
//             hasBasinID = true
//         }
//     }
    
//     if(!hasBasinID){
//         let id = createBasinID()
//         let object = { count: 0}
//         basins[id] = object
//         basinGrid[rowIndex][colIndex].basin = id
//     }
// }

// const createBasinID = () => {
//     let isUnique = false
// 	let id
// 	while(!isUnique){
// 		id = Math.floor(Math.random() * 99999 )
// 		if(!basins[id]) isUnique = true
// 	}
// 	return id
// }

// const reconcileBasins = (id1, id2) => {
//     for(let row of basinGrid){
//         for(let col of row){
//             if(col.basin == id2) col.basin = id1 
//         }
//     }
// }

// const createSmokeGrid = () => {
//     let grid = []
//     let lines = smoke.split(/\r?\n/)
//     for(let line of lines){
//         let formattedLine = []
//         let numbers = line.split('')
//         for(let number of numbers){
//             let obj = {
//                 num: parseInt(number),
//                 riskLevel: 0,
//                 basin: null
//             }
//             formattedLine.push(obj)
//         }
//         grid.push(formattedLine)
//     }
//     return grid
// }

// const Day_10_1 = () => {
//     let score = 0
//     let chunkLines = chunks.split(/\r?\n/)
//     chunkline:
//     for(let line of chunkLines){
//         adjustedLine = line.replace(/\s+/g, "")
//         let runningString = ''
//         for(let character of adjustedLine){
//             switch(character){
//                 case '(':
//                 case '[':
//                 case '<':
//                 case '{':
//                     runningString += character
//                     break
//                 default:
//                     let lastChar = runningString[runningString.length - 1]
//                     let pair = checkChunkPair(lastChar, character)
//                     if(!pair){
//                         score += getChunkScore(character)
//                         continue chunkline
//                     }else{
//                         runningString = runningString.slice(0, - 1)
//                     }
//             }
//         }
//     }
//     displayAnswer(score)
// }

// const getChunkScore = (character) => {
//     switch(character){
//         case ')': return 3
//         case ']': return 57
//         case '>': return 25137
//         case '}': return 1197
//     }
// }

// const checkChunkPair = (charOne, CharTwo) => {
//     let pair = ''
//     switch(charOne){
//         case '(':
//             pair = ')'
//             break
//         case '[':
//             pair = ']'
//             break
//         case '<':
//             pair = '>'
//             break
//         case '{':
//             pair = '}'
//             break
//     }
//     if(pair == CharTwo) return true
//     return false
// }

// const Day_10_2 = () => {
//     let scores = []
//     let chunkLines = chunks.split(/\r?\n/)
//     chunkline:
//     for(let line of chunkLines){
//         adjustedLine = line.replace(/\s+/g, "")
//         let runningString = ''
//         for(let character of adjustedLine){
//             switch(character){
//                 case '(':
//                 case '[':
//                 case '<':
//                 case '{':
//                     runningString += character
//                     break
//                 default:
//                     let lastChar = runningString[runningString.length - 1]
//                     let pair = checkChunkPair(lastChar, character)
//                     if(!pair){
//                         continue chunkline
//                     }else{
//                         runningString = runningString.slice(0, - 1)
//                     }
//             }
//         }
//         console.log(adjustedLine)
//         let reversed = runningString.split('').reverse().join('')
//         let score = 0
//         for(let character of reversed){
//             score *= 5
//             score += getChunkReverseScore(character)
//         }
//         scores.push(score)
//     }
//     scores.sort((a, b) => (a > b) ? -1 : 1)
//     let middleScore = scores[Math.floor(scores.length / 2)]
//     displayAnswer(middleScore)
// }

// const getChunkReverseScore = (character) => {
//     switch(character){
//         case '(': return 1
//         case '[': return 2
//         case '<': return 4
//         case '{': return 3
//     }
// }

// let octoGrid = []
// const Day_11_1 = () => {
//     octoGrid = structureOctopusData()
//     let steps = 100
//     let totalFlashes = 0
    
//     for(let i = 0; i < steps; i++){
//         increasePhase()
//         totalFlashes += flashingPhase()
//         resetPhase()
//     }
//     displayAnswer(totalFlashes)
// }

// const increasePhase = () => {
//     for(let row of octoGrid){
//         for(let col of row){
//             col.powerLevel++
//         }
//     }
// }

// const flashingPhase = () => {
//     let flashCount = 0
//     let needsToFlash = true

//     while(needsToFlash){
//         needsToFlash = false
        
//         for(let [rowIndex, rowValue] of octoGrid.entries()){
//             for(let [colIndex, colValue] of rowValue.entries()){
//                 if(colValue.powerLevel > 9 && colValue.flashed == false){
//                     colValue.flashed = true
//                     flashCount++
//                     needsToFlash = handleFlashSplash(rowIndex, colIndex, needsToFlash)
//                 }
//             }
//         }
//     }
//     return flashCount
// }

// const handleFlashSplash = (rowIndex, colIndex, needsToFlash) => {
    
//     if(rowIndex > 0 && colIndex > 0){
//         octoGrid[rowIndex - 1][colIndex - 1].powerLevel++
//         if(octoGrid[rowIndex - 1][colIndex - 1].powerLevel > 9 && octoGrid[rowIndex - 1][colIndex - 1].flashed == false) needsToFlash = true
//     }

//     if(rowIndex > 0){
//         octoGrid[rowIndex - 1][colIndex].powerLevel++
//         if(octoGrid[rowIndex - 1][colIndex].powerLevel > 9 && octoGrid[rowIndex - 1][colIndex].flashed == false) needsToFlash = true
//     }

//     if(rowIndex > 0 && colIndex < octoGrid[0].length - 1){
//         octoGrid[rowIndex - 1][colIndex + 1].powerLevel++
//         if(octoGrid[rowIndex - 1][colIndex + 1].powerLevel > 9 && octoGrid[rowIndex - 1][colIndex + 1].flashed == false) needsToFlash = true
//     }
    
//     if(colIndex < octoGrid[0].length - 1){
//         octoGrid[rowIndex][colIndex + 1].powerLevel++
//         if(octoGrid[rowIndex][colIndex + 1].powerLevel > 9 && octoGrid[rowIndex][colIndex + 1].flashed == false) needsToFlash = true
//     }

//     if(rowIndex < octoGrid.length - 1 && colIndex < octoGrid[0].length - 1){
//         octoGrid[rowIndex + 1][colIndex + 1].powerLevel++
//         if(octoGrid[rowIndex + 1][colIndex + 1].powerLevel > 9 && octoGrid[rowIndex + 1][colIndex + 1].flashed == false) needsToFlash = true
//     }

//     if(rowIndex < octoGrid.length - 1){
//         octoGrid[rowIndex + 1][colIndex].powerLevel++
//         if(octoGrid[rowIndex + 1][colIndex].powerLevel > 9 && octoGrid[rowIndex + 1][colIndex].flashed == false) needsToFlash = true
//     }
    
//     if(rowIndex < octoGrid.length - 1 && colIndex > 0){
//         octoGrid[rowIndex + 1][colIndex - 1].powerLevel++
//         if(octoGrid[rowIndex + 1][colIndex - 1].powerLevel > 9 && octoGrid[rowIndex + 1][colIndex - 1].flashed == false) needsToFlash = true
//     }

//     if(colIndex > 0){
//         octoGrid[rowIndex][colIndex - 1].powerLevel++
//         if(octoGrid[rowIndex][colIndex - 1].powerLevel > 9 && octoGrid[rowIndex][colIndex - 1].flashed == false) needsToFlash = true
//     }
    
//     return needsToFlash

// }

// const resetPhase = () => {
//     for(let row of octoGrid){
//         for(let col of row){
//             if(col.powerLevel > 9){
//                 col.powerLevel = 0
//                 col.flashed = false
//             }
//         }
//     }
// }

// const structureOctopusData = () => {
//     let formattedData = []
//     octopusData = octopusData.split(/\r?\n/)
//     for(let line of octopusData){
//         let temp = []
//         for(let digit of line){
//             let obj = {
//                 powerLevel: parseInt(digit),
//                 flashed: false
//             }
//             temp.push(obj)
//         }
//         formattedData.push(temp)
//     }
//     return formattedData
// }

// const Day_11_2 = () => {
//     octoGrid = structureOctopusData()
//     let steps = 0
//     let totalFlashes = 0
//     let allFlashed = false

//     while(!allFlashed){
//         increasePhase()
//         totalFlashes += flashingPhase()
//         allFlashed = true
//         for(let row of octoGrid){
//             for(let col of row){
//                 if(col.powerLevel > 9){
//                     col.powerLevel = 0
//                     col.flashed = false
//                 }else{
//                     allFlashed = false
//                 }
//             }
//         }
//         steps++
//     }
//     displayAnswer(steps)
// }

// const Day_12_1 = () => {
//     createCaves()

//     let soFar = 'start'
    
//     for(let possibilty of caves['start'].connections){
//         whereToGo(possibilty, soFar)
//     }

//     displayAnswer(paths.length)
// }

// const whereToGo = (option, soFar) => {
//     soFar += ',' + option
//     if(option == 'end') return paths.push(soFar)
//     for(let possibilty of caves[option].connections){
//         if(possibilty == 'start') continue
//         if(caves[possibilty].small && soFar.includes(possibilty)) continue
//         whereToGo(possibilty, soFar)
//     }
// }

// let caves = {}
// let paths = []
// const createCaves = () => {
//     let connectedCaves = caveArray.split(/\r?\n/)
//     let uniqueCaves = []
//     for(let cave of connectedCaves){
//         let twoCaves = cave.split('-')
//         if(!uniqueCaves.includes(twoCaves[0])) uniqueCaves.push(twoCaves[0])
//         if(!uniqueCaves.includes(twoCaves[1])) uniqueCaves.push(twoCaves[1])
//     }

//     for(let uniqueCave of uniqueCaves){
//         let connections = []
//         for(let cave of connectedCaves){
//             let twoCaves = cave.split('-')
//             if(uniqueCave == twoCaves[0]) connections.push(twoCaves[1])
//             if(uniqueCave == twoCaves[1]) connections.push(twoCaves[0])
//         }
//         new Cave(uniqueCave, connections)
//     }
// }

// class Cave{
//     constructor(name, connections){
//         this._name = name
//         this._connections = connections
//         this._small = this.isSmall()
//         caves[this._name] = this
//     }

//     get name(){
//         return this._name
//     }

//     get connections (){
//         return this._connections
//     }

//     get small (){
//         return this._small
//     }

//     get visited (){
//         return this._visited
//     }

//     set visited (value){
//         this._visited = value
//     }

//     isSmall(){
//         if(this._name == 'start' || this._name == 'end') return false
//         if(this._name == this._name.toLowerCase()) return true
//         return false
//     }
// }

// const Day_12_2 = () => {
//     createCaves()

//     let soFar = 'start'
    
//     for(let possibilty of caves['start'].connections){
//         whereToGoTwo(possibilty, soFar)
//     }

//     console.log(paths)
//     // displayAnswer(paths.length)
// }

// const whereToGoTwo = (option, soFar) => {
//     soFar += ',' + option
//     if(option == 'end') return paths.push(soFar)
//     for(let possibilty of caves[option].connections){
//         if(possibilty == 'start') continue
//         let smallStillOk = true
//         if(caves[possibilty].small){
//             smallStillOk = checkSmall(soFar, possibilty)
//         }
//         if(smallStillOk) whereToGoTwo(possibilty, soFar)
//     }
// }

// const checkSmall = (soFar, possibilty) => {
//     let cavesVisited = soFar.split(',')
//     let smallCaves = [possibilty]
//     for(let loneCave of cavesVisited){
//         if(loneCave == 'start' || loneCave == 'end') continue
//         if(loneCave == loneCave.toLowerCase()){
//             smallCaves.push(loneCave)
//         }
//     }
    
//     let oneTwo = false
//     let counts = {}
//     smallCaves.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; })
//     for(let count in counts){
//         if(counts[count] > 1){
//             if(oneTwo) return false
//             oneTwo = true
//         }
//     }
//     return true
// }

// const Day_13_1 = () => {

// }

// const Day_13_2 = () => {

// }   

// const Day_14_1 = () => {

// }

// const Day_14_2 = () => {

// } 

// const Day_15_1 = () => {
//     let gridRows = pathGrid.split(/\r?\n/)
//     let grid = createPathGridObjects(gridRows)
//     displayAnswer(getLeastRiskPath(grid))
// }

// const getLeastRiskPath = (pathGrid) => {
//     let maxY = pathGrid.length - 1
//     let maxX = pathGrid[0].length - 1

//     for(let y = maxY; y >= 0; y--){
//         for(let x = maxX; x >= 0; x--){
//             let lowestRisk = 0
//             if(y < maxY){
//                 lowestRisk = pathGrid[y + 1][x].risk
//             }

//             if(x < maxX){
//                 if(pathGrid[y][x + 1].risk < lowestRisk || lowestRisk == 0){
//                     lowestRisk = pathGrid[y][x + 1].risk
//                 }
//             }
//             pathGrid[y][x].risk = (lowestRisk + pathGrid[y][x].value)
//         }
//     }

//     return finalRisk = pathGrid[0][0].risk - pathGrid[0][0].value
// }

// const createPathGridObjects = (gridRows) => {
//     let formattedGrid = []
//     for(let row of gridRows){
//         let gridRow = []
//         for(let col of row){
//             let obj = {
//                 value: parseInt(col),
//                 risk: 0
                
//             }
//             gridRow.push(obj)
//         }
//         formattedGrid.push(gridRow)
//     }
//     return formattedGrid
// }

// const expandGrid = (grid) =>{
//     let gridRows = grid.split(/\r?\n/)
//     let initialLength = gridRows[0].length
//     let initialHeight = gridRows.length

//     for(let i = 0; i < 4; i++){
//         for(let row = 0; row < gridRows.length; row++){
//             let adjustableString = gridRows[row]
//             for(let j = initialLength * i; j < initialLength * (i + 1); j++){
//                 let number = parseInt(gridRows[row][j])
//                 number++
//                 if(number > 9) number = 1
//                 adjustableString += number.toString()
//             }
//             gridRows[row] = adjustableString
//         }
//     }

//     for(let i = 0; i < 4; i++){
//         for(let row = initialHeight * i; row < initialHeight * (i + 1); row++){
//             let newRow = ''
//             for(let j = 0; j < gridRows[row].length; j++){
//                 let number = parseInt(gridRows[row][j])
//                 number++
//                 if(number > 9) number = 1
//                 newRow += number.toString()
//             }
//             gridRows.push(newRow)
//         }
//     }
//     return gridRows
// }

// const Day_15_2 = () => {
//     let grid = expandGrid(pathGrid)
//     let formattedGrid = createPathGridObjects(grid)
//     displayAnswer(getLeastRiskPath(formattedGrid))
// } 