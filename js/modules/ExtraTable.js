import { Table } from "./Table.js";

export class ExtraTable extends Table {
  constructor(promiseArray, object) {
    super(promiseArray, object)
  }
  async getExtraInfo(index) {
    const listUl = document.createElement('ul')
    listUl.dataset.id = ''
    this.object.extraClass && listUl.classList.add(this.object.extraClass)
    try {
      this.prom = await this.promiseArray
      const { firstName, lastName, description, address } = this.prom[index]
      const { streetAddress, city, state, zip } = address
      listUl.innerHTML = `
<li>Выбран пользователь <b>${firstName} ${lastName}</b></li>
<li>Описание:</li>
<li><textarea>
${description}
</textarea></li>
<li>Адрес проживания: <b>${streetAddress}</b></li>
<li>Город: <b>${city}</b></li>
<li>Провинция/штат: <b>${state}</b></li>
<li>Индекс: <b>${zip}</b></li>
`
    } catch(error){
      console.error(error);
      listUl.textContent = 'Данные были не заполненны'
    }
    document.querySelector('[data-id]')?.remove()
    this.createPg.after(listUl)
  }
}