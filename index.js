// let stepBtn = document.querySelector(".step");
//step button
function addClass(className) {
  document.querySelectorAll('.step-button').forEach(el => {
    el.classList.remove('active')
  })

  const element = document.querySelector('.' + className)
  if (element) {
    element.classList.add('active')
  }
}

//next page
function nextPage(className) {
  document.querySelectorAll('.step-division').forEach(el => {
    el.classList.remove('active-step')
    el.classList.add('de-active')
  })

  const element = document.querySelector('.' + className)
  if (element) {
    element.classList.add('active-step')
    element.classList.remove('de-active')
  }
}

//Personal info form

function validateForm(sideStepClass, contentClassName) {
  document.getElementById('nameError').innerText = ''
  document.getElementById('emailError').innerText = ''
  document.getElementById('phoneError').innerText = ''

  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const phone = document.getElementById('phone').value

  document.querySelectorAll('.personal-info-inputs').forEach(el => {
    el.classList.remove('name-error')
    el.classList.remove('email-error')
    el.classList.remove('phone-error')
  })

  let isValid = true

  if (!name) {
    document.getElementById('nameError').innerText = 'Name is required.'

    const element = document.querySelector('.' + 'name-input')
    if (element && !name) {
      element.classList.add('name-error')
    }
    isValid = false
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!email) {
    document.getElementById('emailError').innerText = 'Email address is required '

    const element = document.querySelector('.' + 'email-input')
    if (element && !email) {
      element.classList.add('email-error')
    }
    isValid = false
  } else if (!email.match(emailRegex)) {
    document.getElementById('emailError').innerText = 'Please enter a valid email address.'
    const element = document.querySelector('.' + 'email-input')
    if (element && !email.match(emailRegex)) {
      element.classList.add('email-error')
    }
    isValid = false
  }

  const phoneRegex = /^\+?[0-9]{1,3}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{4,10}$/
  if (!phone) {
    document.getElementById('phoneError').innerText = 'Phone number is required.'
    const element = document.querySelector('.' + 'phone-input')
    if (element && !phone) {
      element.classList.add('phone-error')
    }
    isValid = false
  } else if (!phoneRegex.test(phone)) {
    document.getElementById('phoneError').innerText = 'Please enter a valid phone number.'
    const element = document.querySelector('.' + 'phone-input')
    if (element && !phoneRegex.test(phone)) {
      element.classList.add('phone-error')
    }
    isValid = false
  }

  if (isValid) {
    addClass(sideStepClass)
    nextPage(contentClassName)
  }
}

// step two

//img selection
function addClassImg(className) {
  document.querySelectorAll('.img-arcade-advanced-pro').forEach(el => {
    el.classList.remove('active')
  })

  const element = document.querySelector('.' + className)
  if (element) {
    element.classList.add('active')
  }
}

//toggle button
const toggle = document.getElementById('billingToggle')
const descriptions = document.querySelectorAll('.arcade-advanced-pro-description')
const offerTexts = document.querySelectorAll('.free-offer-text')
const monthlyLabel = document.getElementById('monthlyLabel')
const yearlyLabel = document.getElementById('yearlyLabel')
const addOnPrices = document.querySelectorAll('.checkbox-price')
const checkboxInputs = document.querySelectorAll('.checkbox-input input')

const finishingAddOnContainer = document.querySelector('.finishing-arcade')
const totalPriceEl = document.querySelector('.total-price')
const totalModeEl = document.getElementById('total-mode')

const planPrice = { monthly: 9, yearly: 90 }
//one by one button click
let currentStep = 1
let maxCompletedStep = 1

const stepButtons = document.querySelectorAll('.step-button')
const stepDivisions = document.querySelectorAll('.step-division')
//

const priceCheckbox = [
  { name: 'Online service', monthly: 1, yearly: 10 },
  { name: 'Larger storage', monthly: 2, yearly: 20 },
  { name: 'Customizable Profile', monthly: 2, yearly: 20 }
]

function updateBillingUI() {
  const isYearly = toggle.checked

  descriptions.forEach((desc, index) => {
    const price = [ 9, 12, 15 ][index]
    desc.textContent = isYearly ? `$${price * 10}/yr` : `$${price}/mo`
  })

  offerTexts.forEach(offer => {
    offer.textContent = isYearly ? '2 months free' : ''
  })

  addOnPrices.forEach((price, index) => {
    price.textContent = isYearly
        ? `+$${priceCheckbox[index].yearly}/yr`
        : `+$${priceCheckbox[index].monthly}/mo`
  })

  if (isYearly) {
    yearlyLabel.classList.add('active')
    monthlyLabel.classList.remove('active')
  } else {
    monthlyLabel.classList.add('active')
    yearlyLabel.classList.remove('active')
  }

  updateFinishingSelection()
}

function updateFinishingSelection() {
  const isYearly = toggle.checked
  const mode = isYearly ? 'yr' : 'mo'

  finishingAddOnContainer.innerHTML = ''

  const planDiv = document.createElement('div')
  planDiv.classList.add('finishing-label-div')
  planDiv.innerHTML = `
    <div class="arcade-finishing">Arcade (${isYearly ? 'Yearly' : 'Monthly'}) 
      <br><span class="change-finishing">change</span>
    </div>
    <span class="arcade-price">$${isYearly ? planPrice.yearly : planPrice.monthly}/${mode}</span>
  `
  finishingAddOnContainer.appendChild(planDiv)

  let total = isYearly ? planPrice.yearly : planPrice.monthly

  const hr = document.createElement('hr')
  finishingAddOnContainer.appendChild(hr)

  checkboxInputs.forEach((checkbox, index) => {
    if (checkbox.checked) {
      const addOnDiv = document.createElement('div')
      addOnDiv.classList.add('finishing-label-div', 'addon')

      const title = document.createElement('div')
      title.classList.add('online-larger-total-finishing')
      title.textContent = priceCheckbox[index].name

      const price = document.createElement('span')
      price.classList.add('online-larger-price')
      const amount = isYearly ? priceCheckbox[index].yearly : priceCheckbox[index].monthly
      price.textContent = `+$${amount}/${mode}`

      addOnDiv.appendChild(title)
      addOnDiv.appendChild(price)
      finishingAddOnContainer.appendChild(addOnDiv)

      total += amount
    }
  })

  totalPriceEl.textContent = `$${total}/${mode}`
  totalModeEl.textContent = `per ${isYearly ? 'year' : 'month'}`
}

toggle.addEventListener('change', updateBillingUI)
checkboxInputs.forEach(cb => cb.addEventListener('change', updateFinishingSelection))

//one by one button click
function goToStep(stepNumber) {
  if (stepNumber > maxCompletedStep) return

  currentStep = stepNumber

  stepDivisions.forEach((div, index) => {
    div.classList.toggle('active-step', index === stepNumber - 1)
    div.classList.toggle('de-active', index !== stepNumber - 1)
  })

  stepButtons.forEach((btn, index) => {
    btn.classList.toggle('active', index === stepNumber - 1)
    btn.classList.toggle('completed', index < maxCompletedStep)
  })

  updateFinishingSelection()
}

function enableAllowedSteps() {
  stepButtons.forEach((btn, index) => {
    if (index < maxCompletedStep) {
      btn.classList.add('completed')
    } else {
      btn.classList.remove('completed')
    }
  })
}

stepButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    if (index + 1 <= maxCompletedStep) {
      goToStep(index + 1)
    }
  })
})

document.querySelector('.step-division.subscription-section .next-step-button').onclick = () => {
  const name = document.getElementById('name').value.trim()
  const email = document.getElementById('email').value.trim()
  const phone = document.getElementById('phone').value.trim()

  let valid = true

  if (!name) {
    document.getElementById('nameError').textContent = 'Name is required'
    valid = false
  } else {
    document.getElementById('nameError').textContent = ''
  }

  if (!email) {
    document.getElementById('emailError').textContent = 'Email is required'
    valid = false
  } else {
    document.getElementById('emailError').textContent = ''
  }

  if (!phone) {
    document.getElementById('phoneError').textContent = 'Phone is required'
    valid = false
  } else {
    document.getElementById('phoneError').textContent = ''
  }

  if (valid) {
    maxCompletedStep = Math.max(maxCompletedStep, 2)
    enableAllowedSteps()
    goToStep(2)
  }
}

document.querySelector('.step-division.plan-selection .next-step-button').onclick = () => {
  maxCompletedStep = Math.max(maxCompletedStep, 3)
  enableAllowedSteps()
  goToStep(3)
}

document.querySelector('.step-division.pick-selection .next-step-button').onclick = () => {
  maxCompletedStep = Math.max(maxCompletedStep, 4)
  enableAllowedSteps()
  goToStep(4)
}

document.querySelector('.step-division.finishing-selection .confirm-step-button').onclick = () => {
  maxCompletedStep = Math.max(maxCompletedStep, 5)
  enableAllowedSteps()
  goToStep(5)
}
document.querySelector('.step-division.plan-selection .go-back-button').onclick = () => goToStep(1)
document.querySelector('.step-division.pick-selection .go-back-button').onclick = () => goToStep(2)
document.querySelector('.step-division.finishing-selection .go-back-button').onclick = () => goToStep(3)
//end one by one button click

updateBillingUI()

function addCheckbox(className, isChecked) {
  const element = document.querySelector('.' + className)
  if (element) {
    if (element) {
      if (isChecked) {
        element.classList.add('active')
      } else {
        element.classList.remove('active')
      }
    }
  }
}
