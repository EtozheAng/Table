export class Table {
  #rows = 10;
  #currentPage = 1;
  constructor(promiseArray, objectTable) {
    this.object = objectTable
    this.promiseArray = promiseArray
  }
  getPage() {
    return this.#currentPage
  }
  getRows() {
    return this.#rows
  }
  #dataDownload() {
    this.div = document.createElement('div')
    this.div.textContent = 'Data download...'
    if (!this.object.element) {
      document.body.append(this.div)
    } else {
      document.querySelector(this.object.element).append(this.div)
    }
  }
  getHeaderTable() {
    this.attribute = this.object.attribute
    this.table = document.createElement('table')
    this.tHead = document.createElement('thead')
    this.tBody = document.createElement('tbody')
    this.#dataDownload()
    this.table.append(this.tHead, this.tBody)
    this.object.classTable && this.table.classList.add(this.object.classTable)

    this.trHeader = document.createElement('tr')
    for (let key in this.attribute) {
      this.th = document.createElement('th')
      if (this.attribute[key].label) {
        this.th.textContent = this.attribute[key].label
      }
      else {
        this.th.textContent = key
      }
      // this.attribute[key].class && this.th.classList.add(this.attribute[key].class)
      this.trHeader.append(this.th)
    }
    this.tHead.append(this.trHeader)
    return this
  }
  async getBodyTable() {
    this.prom = await this.promiseArray

    if (this.object.pagination) {
      this.#rows = this.object.pagination
    }

    const displayTable = (arrData, rowPerPage, page) => {
      if (this.tBody) this.tBody.innerHTML = ""
      page--
      const start = rowPerPage * page;
      const end = start + rowPerPage;
      const paginatedData = arrData.slice(start, end);

      for (let i = 0; i < paginatedData.length; i++) {
        let dataArr = paginatedData[i]; // одна строка данных
        let tr = document.createElement('tr')
        for (let key in this.attribute) {
          let td = document.createElement('td')
          td.textContent = dataArr[key]
          tr.appendChild(td)
        }
        this.tBody.appendChild(tr)
      }
    }

    const isplayPagination = (arrData, rowPerPage) => {
      this.createPg = document.createElement('div')
      this.createPg.classList.add('pagination')
      this.table.after(this.createPg)

      const pagesCount = Math.ceil(arrData.length / rowPerPage);
      const ulEl = document.createElement("ul");
      ulEl.classList.add('pagination__list');

      for (let i = 0; i < pagesCount; i++) {
        const liEl = displayPaginationBtn(i + 1);
        ulEl.appendChild(liEl)
      }
      this.createPg.appendChild(ulEl)
      ulEl.children.length === 1 && ulEl.remove()
    }

    const displayPaginationBtn = (page) => {
      const liEl = document.createElement("li");
      liEl.classList.add('pagination__item')
      liEl.innerText = page
      if (this.#currentPage === page) liEl.classList.add('pagination__item--active');

      liEl.addEventListener('click', () => {
        this.#currentPage = page
        displayTable(this.prom, this.#rows, this.#currentPage)
        let currentItemLi = document.querySelector('.pagination__item--active');
        currentItemLi.classList.remove('pagination__item--active');
        liEl.classList.add('pagination__item--active');
      })

      return liEl;
    }

    this.div?.remove()
    displayTable(this.prom, this.#rows, this.#currentPage)

    if (!this.object.element) {
      document.body.append(this.table)
    } else {
      document.querySelector(this.object.element).append(this.table)
    }
    isplayPagination(this.prom, this.#rows)
  }
}