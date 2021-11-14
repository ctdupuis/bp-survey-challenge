const URI = `http://localhost:4001`;

const nameInput = document.getElementById('name');
const anonCheck = document.getElementById('anon');
const surForm = document.getElementById('survey');
const radios = document.getElementsByClassName('1-radio');
let targetRadio;


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

    console.log(object);
    
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
            console.log(targetRadio)
        })
    }
}

bindRadios();
anonCheck.addEventListener('click', handleInput);
surForm.addEventListener('submit', handleSubmit);
