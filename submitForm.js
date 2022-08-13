let submit = document.getElementById('submit')
console.log(submit)
const formName = 'trainingTracker'
console.log('form: ' + formName)
let newForm = {}


let clientId = document.querySelector('input#clientName')
clientId.addEventListener('change', (e) => {
	console.log('changed')
	newForm.clientId = e.target.value;
  console.log(newForm.clientId);
  })
  
let date = document.querySelector('input#date')
date.addEventListener('change', (e) => {
	newForm.date = e.target.value;
  console.log(newForm.date);
  })
  
let behaviors = document.getElementById('behaviors')
behaviors.addEventListener('change', (e) => {
	newForm.behaviors = e.target.value;
  console.log(newForm.behaviors);
  })
  
let sensory = document.getElementById('sensoryActivity')
sensory.addEventListener('change', (e) => {
	newForm.sensory = e.target.value;
  console.log(newForm.sensory);
  })
  
let movement = document.getElementById('movement')
movement.addEventListener('change', (e) => {
	newForm.movement = e.target.value;
  console.log(newForm.movement);
  })

let learning = document.getElementById('learning')
learning.addEventListener('change', (e) => {
	newForm.learning = e.target.value;
  console.log(newForm.learning);
  })

let dataCollection = document.getElementById('dataCollection')
dataCollection.addEventListener('change', (e) => {
	newForm.dataCollection = e.target.value;
  console.log(newForm.dataCollection);
  })

let client = document.getElementById('client')
client.addEventListener('change', (e) => {
	newForm.client = e.target.value;
  console.log(newForm.client);
  })

let thingsNeeds = document.getElementById('thingsNeeds')
thingsNeeds.addEventListener('change', (e) => {
	newForm.thingsNeeds = e.target.value;
  console.log(newForm.thingsNeeds);
  })
  
let followUp = document.getElementById('followUp')
followUp.addEventListener('change', (e) => {
	newForm.followUp = e.target.value;
  console.log(newForm.followUp);
  })

let notes = document.getElementById('notes')
notes.addEventListener('change', (e) => {
	newForm.notes = e.target.value;
  console.log(newForm.notes);
  })

let smoothMoves = document.getElementById('smoothMoves')
smoothMoves.addEventListener('change', (e) => {
	newForm.smoothMoves = e.target.value;
  console.log(newForm.smoothMoves);
  })

document.getElementById('submit').addEventListener("click", async (event) => {
  console.log('click')
  submitForm(newForm, formName)
  document.getElementById('returnMessage').innerHTML = 'Please wait while the form is saved'
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
    .then(response => response.json())
    .then(data => respond(data)) 
    .catch((err) => showError(err))
}

function respond(data) {
  let id = data.key
  if (id) {
    showSuccess(id)
    let name = newForm.clientId	  
    sendNotification(id, name)	  
  } else {
    showError(data.error)
  }
}

function showSuccess(id) {
  document.getElementById('returnMessage').innerHTML = 'Form has been successfully submitted'
  document.getElementById('return').style.display = 'inline'
}

function showError(err) {
    console.error
    document.getElementById('returnMessage').innerHTML = `An error occurred when submitting this form, which was ${err}. Please contact the administrator for help.`
    document.getElementById('return').style.display = 'inline'
}

async function sendNotification(id, client) {
  let message = `You have a new <br/><a href=phoenix-freedom-foundation-backend.webflow.io/completed-forms/consultation-fee-summary?formId=${id}>Educational Consultation Summary</a>`
  console.log(message)
  const url = 'https://pffm.azurewebsites.net/notices'
  let notification = {
    'name': client,
    'notice': message,
    'level': client,
    'priority': 'not urgent'
    
  }
  const header = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*"
  }
  
  fetch(url, {
    method: "POST",
    headers: header,
    body: JSON.stringify(notification)
  })
    .then(() => console.log('notice sent'))
    .catch(console.error)
}
