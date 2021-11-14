const URI = `http://localhost:4001`;

// grabbing our elements for manipulation
const nameInput = document.getElementById('name');
const anonCheck = document.getElementById('anon');
const surForm = document.getElementById('survey');
const radios = document.getElementsByClassName('1-radio');
let targetRadio;
const help = document.getElementById('help');


handleSubmit = e => {
    e.preventDefault();
    let name = nameInput.value;
    let questions = document.getElementsByClassName('quest-cont');

    // pre-format the object with the first few values
    let object = {
        surveyId: e.target.dataset.survey,
        name: name,
        q1: targetRadio.value
    };

    // this loop adds our textarea values to the object that we will post
    for (let i = 1; i < questions.length; i++) {
        let children = questions[i].children;
        object[`q${i+1}`] = format(children[1].value);
    }

    // this handles adding in the extra help boolean
    let index = Object.keys(object).length;
    object[`q${index-1}`] = help.checked;

    // posts our answers
    axios.post(`${URI}/survey`, object)
    .then(res => console.log(res.data))
    
    surForm.reset();
}

format = string => {
    // formats strings to avoid throwing errors for single quotes
    // will be called on pushing up and receiving back data
    let key = {
        "/": "'",
        "'": "/"
    }
    let splitStr = string.split("");
    let newStr = []
    for ( let i = 0; i < splitStr.length; i++) {
        if (key[splitStr[i]]) {
            newStr.push(key[splitStr[i]])
        } else {
            newStr.push(splitStr[i])
        }
    }
    return newStr.join("");
}

handleInput = e => {
    // Check the box to disable input and register as anonymous
    if (e.target.checked) {
        nameInput.value = "Anonymous";
        nameInput.disabled = true;
    } else {
        nameInput.value = "";
        nameInput.disabled = false;
    }
}

bindRadios = () => {
    // tracks what radio button you selet
    for (let i = 0; i < radios.length; i++) {
        radios[i].addEventListener('click', () => {
            targetRadio = radios[i]
        })
    }
}

extraHelp = (e) => {
    // stops you from clicking the checkbox if the name is empty or Anonymous
    if (nameInput.value === '' || nameInput.value === 'Anonymous') {
        help.checked = false
        window.alert("We can't help you if we don't know who you are")
    }

}

renderSurvey = data => {
    // dynamically renders survey title and records the id for submission
    let head = document.createElement('h4');
    head.innerText = data[0].title;
    let surveyId = data[0].survey_id;
    surForm.dataset.survey = surveyId;
    surForm.prepend(head)
}

fetchSurvey = () => {
    // fetches survey from the backend
    axios.get(`${URI}/survey`)
    .then(res => renderSurvey(res.data));
}

bindRadios();
anonCheck.addEventListener('click', handleInput);
surForm.addEventListener('submit', handleSubmit);
help.addEventListener('click', extraHelp);
document.addEventListener('DOMContentLoaded', fetchSurvey);