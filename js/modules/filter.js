export function filterFunction() {
  const phrase = document.querySelector('.search__input')
  const lick = document.querySelectorAll('tbody tr')
  let filter = phrase.value.toUpperCase().trim();
  lick.forEach(event => {
    if (event.innerText.toUpperCase().search(filter) > -1) {
      event.style.display = ''
    } else {
      event.style.display = 'none'
    }
  })
}