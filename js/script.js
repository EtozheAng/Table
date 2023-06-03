import { SortingTables} from "./modules/SortingTables.js";
import { filterFunction } from "./modules/filter.js"
import { urlOne, urlTwo } from "./modules/linkData.js"
import { object } from "./modules/object.js";
import { Fetch } from "./modules/Fetch.js";
import { ExtraTable } from "./modules/ExtraTable.js";
import { validateInputs } from "./modules/validate.js";


let extra
function start(promiseArray) {
  extra = new ExtraTable(promiseArray, object)
  extra.getHeaderTable().getBodyTable()
}
let promiseArray
function showData(url) {
  promiseArray = Fetch.get(url)
  document.querySelector('.data-set').style.display = 'none'
  document.querySelector('.table-wrapper').style.display = 'block'
  start(promiseArray)
}
document.querySelector('.data-set__min').addEventListener('click', () => showData(urlOne))
document.querySelector('.data-set__max').addEventListener('click', () => showData(urlTwo))

window.addEventListener('click', event => {
  let el = event.target
  let indexColumn = el.cellIndex
  let indexRowTable = el.parentNode.rowIndex - 1
  let tableSort = new SortingTables(object, indexColumn)
  if (el.nodeName === 'TH'){
    if (Array.from(el.classList).includes('down')) {
      tableSort.getSort()
    } else {
      tableSort.getSort(true)
    }
  } else if (el.nodeName === 'TD'){
    extra.getExtraInfo(indexRowTable + (extra.getRows() * (extra.getPage() - 1)))
  }
})

const [form]  = document.forms
document.querySelector('.search__btn').addEventListener('click', filterFunction)
document.querySelector('.open-form').addEventListener('click', function() {
  this.style.display = 'none'
  form.style.display = 'grid'
})

const button = document.querySelector('.tableAdd__btn')
const onlyInputs = document.querySelectorAll('.tableAdd input')
onlyInputs.forEach(input => {
  input.addEventListener('keyup', () => {
    validateInputs()
    const a = []
    onlyInputs.forEach(element => {
      a.push(element.dataset.succes)
    });
    if (a.includes('false')) {
      return button.setAttribute('disabled');
    }
    else {
      return button.removeAttribute('disabled');
    }
  })
});

form.addEventListener('submit', e => {
  e.preventDefault()
  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries())
  const promise = new Promise((resolve) => {
    resolve([values]);
  });
  const unionProm = Promise.all([promiseArray, promise]).then(([response1, response2]) => {
    return [...response2,...response1]
  })
  document.querySelector('table').remove()
  document.querySelector('.pagination').remove()
  document.querySelector('.extraInfo')?.remove()
  start(unionProm)
})


