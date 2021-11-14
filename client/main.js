const URI = `http://localhost:4001`;

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
    let object = {
        name: name,
        1: targetRadio.value
    };

    
    for (let i = 1; i < questions.length; i++) {
        let children = questions[i].children;
        object[i+1] = children[1].value;
    }

    axios.post(`${URI}/survey`, object)
    .then(res => console.log(res.data))
    
    surForm.reset();
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
    for (let i = 0; i < radios.length; i++) {
        radios[i].addEventListener('click', () => {
            targetRadio = radios[i]
        })
    }
}

extraHelp = (e) => {
    if (nameInput.value === '' || nameInput.value === 'Anonymous') {
        help.checked = false
        window.alert("We can't help you if we don't know who you are")
    }

}

fetchSurvey = () => {
    axios.get(`${URI}/survey`)
    .then(res => console.log(res.data))
}

bindRadios();
anonCheck.addEventListener('click', handleInput);
surForm.addEventListener('submit', handleSubmit);
help.addEventListener('click', extraHelp);
document.addEventListener('DOMContentLoaded', fetchSurvey);