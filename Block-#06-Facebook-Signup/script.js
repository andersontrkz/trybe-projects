const inputs = document.querySelectorAll('.input-form');
const genders = document.getElementsByClassName('radio-gender');

function validarCampos() {
  for (let index = 0; index < inputs.length; index += 1) {
    if (inputs[index].value === '') {
      return true;
    }
  }
  return false;
}

function validarGenero() {
  for (let index = 0; index < 3; index += 1) {
    if (genders[index].checked) {
      return false;
    }
  }
  return true;
}

function exibirConteudo() {
  const content = document.getElementById('right-content');
  const divShow = document.createElement('div');
  const nome = document.getElementById('firstname').value;
  const sobrenome = document.getElementById('lastname').value;
  const email = document.getElementById('phone_email').value;
  const data = document.getElementById('birthdate').value;
  const genero = document.querySelector(':checked').value;

  content.innerHTML = '';

  divShow.innerHTML = `Olá, ${nome} ${sobrenome} 
  Email ou Telefone: ${email} 
  Data de Nascimento:${data}
  Gênero: ${genero}`;
  content.appendChild(divShow);
}

//  https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
function cadastrarButton() {
  const submitButton = document.getElementById('facebook-register');
  submitButton.addEventListener('click', (event) => {
    const div = document.getElementById('div-error');

    if (validarCampos() || validarGenero()) {
      div.innerHTML = 'Campos inválidos';
      event.preventDefault();
    } else {
      exibirConteudo();
    }
  });
}

cadastrarButton();

const buttonEnter = document.getElementById('button-login');
const showImput = document.getElementById('user-email-phone');

buttonEnter.addEventListener('click', () => {
  alert(showImput.value);
});

function removePersonalizado() {
  const genderF = document.getElementById('feminino');
  const genderM = document.getElementById('masculino');
  const section = document.getElementById('div-gender');

  if ((genderF.checked || genderM.checked) && (inputs.length === 6)) {
    section.removeChild(section.lastChild);
  }
}

function generoPersonalizado() {
  const gender = document.getElementById('personalizado');
  const section = document.getElementById('div-gender');
  const input = document.createElement('input');

  input.className = 'geral input-form';
  input.setAttribute('name', 'gender-custom');
  input.setAttribute('placeHolder', 'Gênero (opcional)');

  if (gender.checked && (inputs.length === 5)) {
    section.appendChild(input);
  }

  removePersonalizado();
}

function verificarGenero() {
  for (let index = 0; index < 3; index += 1) {
    genders[index].addEventListener('click', generoPersonalizado);
  }
}

verificarGenero();
