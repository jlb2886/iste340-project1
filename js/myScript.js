let choices = selectInfo.choices
let firstChoice = choices[0]
let result = ''

const optionsElement = document.getElementById("options")
const resultElement = document.getElementById("result")
const nameInput = document.getElementById("name")
const leadersElement = document.getElementById("leaders")



function makeSelect(choice) {

  const selectElement = document.createElement("select")
  optionsElement.append(selectElement)

  const description = document.createElement("option")
  description.textContent = choice.description
  description.value = choice.description
  selectElement.append(description)

  const optionElement = document.createElement("option")
  optionElement.textContent = choice.option_1
  optionElement.value = choice.option_1
  selectElement.append(optionElement)

  const optionElement2 = document.createElement("option")
  optionElement2.textContent = choice.option_2
  optionElement2.value = choice.option_2
  selectElement.append(optionElement2)

  selectElement.addEventListener("change", (event) => {
    let selected = selectElement.value;

    console.log(selected)

    choices.forEach((c) => {
      if (c.key === selected) {
        selectElement.remove()

        if (c.end) {
          console.log('The end')
          resultElement.innerText = c.option_1
          result = c.option_1
        } else {
          makeSelect(c)
        }


      }
    })
  })
}

function resetChoices () {
  console.log('Reset!')
  optionsElement.innerHTML = ''
  resultElement.innerText = ''
  nameInput.value = ''
  makeSelect(firstChoice)
}

function submitChoices () {
  if(nameInput.value !== '' && result !== '') {
    console.log("Choices were submitted!")
    localStorage.setItem(nameInput.value, result)
    resetChoices()
    generateLeaders()
  }
}

function addLeader (name, results) {
  const leaderboardElement = document.createElement("div")
  leaderboardElement.className = 'header-container'
  leadersElement.append(leaderboardElement)

  const wrapperElement = document.createElement("div")
  wrapperElement.className = 'wrapper'
  leaderboardElement.append(wrapperElement)

  const heroContentElement = document.createElement("div")
  heroContentElement.className = 'hero-content'
  heroContentElement.innerText = results
  wrapperElement.append(heroContentElement)

  const nameElement = document.createElement("h1")
  nameElement.innerText = name
  heroContentElement.prepend(nameElement)
}


function generateLeaders () {
  leadersElement.innerHTML = ''

  Object.entries(localStorage).forEach(([key, value]) => {
    addLeader(key, value)
  })
}

// Start of Program
makeSelect(firstChoice)
generateLeaders()




