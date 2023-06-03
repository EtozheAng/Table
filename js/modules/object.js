export const object = {
  element: '.table-wrapper', // куда будет добавленна таблица
  classTable: 'table', // класс таблицы
  attribute: {
    id: {
      label: 'id',
      class: 'id',
      type: 'num'
    },
    firstName: {
      label: 'firstName',
      class: 'firstName',
      type: 'text'
    },
    lastName: {
      label: 'lastName',
      class: 'lastName',
      type: 'text'
    },
    email: {
      label: 'email',
      class: 'email',
      type: 'text'
    },
    phone: {
      label: 'phone',
      class: 'phone',
      type: 'phone'
    },
  }, // атрибуты таблицы
  pagination: 50, // колличество строк в таблице
  extraClass: 'extraInfo' // класс доп. информации
}