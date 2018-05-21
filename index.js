const map = [
    "WWWWWWWW",
    "WWW   WW",
    "WOSB  WW",
    "WWW BOWW",
    "WOWWB WW",
    "W W O WW",
    "WB XBBOW",
    "W   O  W",
    "WWWWWWWW"
]

const newMap = []
let playa = undefined
const destination = document.getElementById("map")
const boxDestination = document.getElementById("box")



for(let i = 0; i < map.length; i++) {
    let mapColumn = map[i]
    let newColumn = mapColumn.split("")
    newMap.push(newColumn)
}

for(let rowIndex = 0; rowIndex < newMap.length; rowIndex++) {
    let mapRow = newMap[rowIndex]
    const rowDiv = document.createElement("div")
    rowDiv.className = "row"
    rowDiv.id = "row-" + rowIndex
    for(let colIndex = 0; colIndex < mapRow.length; colIndex++) {
        const cell = document.createElement("div")
        cell.dataset.rowIndex = rowIndex
        cell.dataset.colIndex = colIndex
        cell.className = "cell"
        cell.id = "col-" + colIndex
        if(mapRow[colIndex] === "W") {
            cell.dataset.type = "wall"
            cell.classList.add("wall")
        } else if(mapRow[colIndex] === " ") {
            cell.dataset.type = "floor"
            cell.classList.add("floor")
        } else if(mapRow[colIndex] === "S") {
            cell.dataset.type = "floor"
            cell.classList.add("floor")
            cell.id = "start"
        } else if(mapRow[colIndex] === "B") {
            cell.dataset.type = "floor"
            cell.classList.add("floor")
            addBox(cell)
        } else if(mapRow[colIndex] === "O") {
            cell.dataset.type = "emptystorage"
            cell.classList.add("emptystorage")
        } else if(mapRow[colIndex] === "X") {
            cell.dataset.type = "emptystorage"
            cell.classList.add("emptystorage")
            addFullBox(cell)
        }
        rowDiv.appendChild(cell)
    }
    destination.appendChild(rowDiv)
}

function setStart() {
    const playaDestination = document.getElementById("start")
    playa = document.createElement("div")
    playa.id = "playa"
    playaDestination.appendChild(playa)       
}

function addBox(cell) {
    const box = document.createElement("div")
    box.classList.add("peanut")
    cell.appendChild(box)
}

function addFullBox(cell) {
    const sandwich = document.createElement("div")
    sandwich.classList.add("sandwich")
    cell.appendChild(sandwich)
}

setStart()

function findNextCell (cell, rowOffset, columnOffset) {
    const targetRowIndex = Number(cell.dataset.rowIndex) + rowOffset
    const targetColIndex = Number(cell.dataset.colIndex) + columnOffset

    const rowSelector = "[data-row-index='" + targetRowIndex + "']"
    const colSelector = "[data-col-index='" + targetColIndex + "']"
    const targetCell = document.querySelector(rowSelector + colSelector)

    return targetCell
}

document.addEventListener('keydown', (event) => {
    let targetCell
    let followingCell

    if(event.key === 'ArrowDown') {
        targetCell = findNextCell(playa.parentElement, +1, 0)
        followingCell = findNextCell(targetCell, +1, 0)
    } else if(event.key === 'ArrowUp') {
        targetCell = findNextCell(playa.parentElement, -1, 0)
        followingCell = findNextCell(targetCell, -1, 0)
    } else if(event.key === 'ArrowRight') {
        targetCell = findNextCell(playa.parentElement, 0, +1)
        followingCell = findNextCell(targetCell, 0, +1)
    } else if(event.key === 'ArrowLeft') {
        targetCell = findNextCell(playa.parentElement, 0, -1)
        followingCell = findNextCell(targetCell, 0, -1)
    }
    

    if(targetCell.className === "cell floor") {
        if(targetCell.childElementCount === 0) {
            targetCell.appendChild(playa)
        } else if(targetCell.childElementCount === 1) {
            if(followingCell.className === "cell floor") {
                if(followingCell.childElementCount === 0) {
                    followingCell.appendChild(targetCell.firstElementChild)
                    targetCell.appendChild(playa)
                }
            } else if(followingCell.className === "cell emptystorage") {
                if(followingCell.childElementCount === 0) {
                    followingCell.appendChild(targetCell.firstElementChild)
                    targetCell.appendChild(playa)
                }
            }
        }
    } else if(targetCell.className === "cell emptystorage") {
        if(targetCell.childElementCount === 0) {
            targetCell.appendChild(playa)
        } else if(targetCell.childElementCount === 1) {
            if(followingCell.className === "cell floor") {
                if(followingCell.childElementCount === 0) {
                    followingCell.appendChild(targetCell.firstElementChild)
                    targetCell.appendChild(playa)
                }
            }
        }
    }
})