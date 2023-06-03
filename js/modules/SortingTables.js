export class SortingTables {
  constructor(objectTable, index) {
    this.index = index
    this.attribute = objectTable.attribute
  }
  getSort(reverse = false) {
    this.type = []
    const tBody = document.querySelector('tbody')
    const tHead = document.querySelector('thead')
    const arrayHead = tHead.children[0].children
    const rows = [].slice.call(tBody.rows)
    const compare = (rowA, rowB) => {
      const rowDataA = rowA.cells[this.index].innerHTML
      const rowDataB = rowB.cells[this.index].innerHTML
      switch (this.type[this.index]) {
        case 'num':
          return rowDataA - rowDataB
        case 'text':
          if (rowDataA < rowDataB) return -1
          else if (rowDataA > rowDataB) return 1
          return 0
        case 'phone':
          return +rowDataA.match(/\d+/g).join('') - +rowDataB.match(/\d+/g).join('')
        default:
          console.error('Тип указан не верно')
          break
      }
    }
    for (let key in this.attribute) {
      this.type.push(this.attribute[key].type)
    }
    if (reverse) {
     rows.sort(compare)
      arrayHead[this.index].classList.add('down')
      arrayHead[this.index].classList.replace('up','down')
    }else {
      rows.sort(compare).reverse()
      arrayHead[this.index].classList.replace('down', 'up')
    }
    for (let elem of rows) {
      tBody.append(elem)
    }
    document.querySelector('table').append(tBody)
  }
}

