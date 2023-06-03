const id = document.getElementById('id')
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const email = document.getElementById('email')
const phone = document.getElementById('phone')


const setError = (element, message = '') => {
  const inputControl = element.nextElementSibling
  element.dataset.succes = false
  const errorDisplay = inputControl.querySelector('.error')
  inputControl.innerText = message
  inputControl.classList.add('error')
  inputControl.classList.remove('success')
}
const setSuccess = element => {
  element.dataset.succes = true
  const inputControl = element.nextElementSibling
  inputControl.innerText = ''
  inputControl.classList.remove('error')
  inputControl.classList.add('success')
}
const isValidEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase())
}
export const validateInputs = () => {
  const idValue = id.value.trim()
  const firstNameValue = firstName.value.trim()
  const lastNameValue = lastName.value.trim()
  const emailValue = email.value.trim()
  const phoneValue = phone.value.trim()


  if (idValue === '') {
    setError(id, 'Id is required')
  } else if (idValue < 0 || idValue.length > 3) {
    setError(id, 'Maximum 3 digits')
  } else {
    setSuccess(id)
  }

  if (firstNameValue === '') {
    setError(firstName, 'firstName is required')
  } else if (firstNameValue.length > 20) {
    setError(firstName, 'Name is too long')
  } else {
    setSuccess(firstName)
  }
  if (lastNameValue === '') {
    setError(lastName, 'lastName is required')
  } else if (lastNameValue.length > 20) {
    setError(lastName, 'Last name is too long')
  } else {
    setSuccess(lastName)
  }
  if (emailValue === '') {
    setError(email, 'Email is required')
  } else if (!isValidEmail(emailValue)) {
    setError(email, 'Privide a valid email addres')
  } else {
    setSuccess(email)
  }
  if (phoneValue === '') {
    setError(phone, 'Password is required')
  } else if (phoneValue.length < 10 || phoneValue.length > 15) {
    setError(phone, 'Phone must contain 10 characters')
  } else {
    setSuccess(phone)
  }
}