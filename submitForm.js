let submit = document.getElementById('submit')
console.log(submit)
const formName = 'consultationFeeSummary'
console.log('form: ' + formName)
let newForm = {}

let clientId = document.querySelector('input#clientName')
clientId.addEventListener('change', (e) => {
	console.log('changed')
	newForm.clientId = e.target.value;
  console.log(newForm.clientId);
  })
  
let employeeName = document.querySelector('input#employeeName')
employeeName.addEventListener('change', (e) => {
	newForm.employeeName = e.target.value;
  console.log(newForm.employeeName);
  })
class ServiceItem {
  constructor(date, serviceSummary, minutes, serviceDetails) {
    this.date = date;
    this.serviceSummary = serviceSummary;
    this.minutes = minutes;
    this.serviceDetails = serviceDetails
  }
}

async function getServiceItems() {
  let items = []
  for (let i = 1; i < 4; i++) {
    if (document.getElementById(`month${i}`).value == 0) {
      i = 4
      return items
    } else {
      let item = new ServiceItem;
      let month = document.getElementById(`month${i}`).value;
      let day = document.getElementById(`day${i}`).value;
      let year = document.getElementById(`year${i}`).value;
      let hours = document.getElementById(`hours${i}`).value;
      let minutes = document.getElementById(`minutes${i}`).value;
      item.serviceSummary = document.getElementById(`serviceSummary${i}`).value;
      item.serviceDetails = document.getElementById(`serviceDetails${i}`).value;
      item.date = `${year}-${day}-${month}`
      item.minutes = hours * 60 + minutes;
      items.push(item)
    }
  }
  return items
}

document.getElementById('submit').addEventListener("click", async (event) => {
  const serviceItems = await getServiceItems()
  newForm.serviceItems = serviceItems
  submitForm(newForm, 'consultationFeeSummary')
})

async function submitForm(data, form) {
  const document = {
    'form': form,
    'data': data
  }
  console.log(document)
  fetch('https://pffm.azurewebsites.net/form', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(document)
  })
    .then((response) => {
      if (response.status == 200) {
      showSuccess()
      } else {
        showError(response.body)
      }
    })
    .catch((err) => showError(err))
}


function showSuccess() {
    document.getElementById('returnMessage').innerHTML = 'Form has been successfully submitted'
}

function showError(err) {
    console.error
    document.getElementById('returnMessage').innerHTML = `An error occurred when submitting this form, which was ${err}. Please contact the administrator for help.`
}