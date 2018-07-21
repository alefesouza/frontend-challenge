/**
 * It's better for perfomance to don't touch the DOM
 * all the time with createElement and appendChild,
 * so I've saved everything on a string to use the
 * innerHTML in the end.
 */

const createSelectElement = (item) => {
  let html = `<select
    class="form__control"
    name="${item.name}"
    id="${item.name}"
    ${item.required ? 'required' : ''}
  >
    <option value>${item.mask}</option>`;

  html += Object.entries(item.values).reduce((prev, curr) => {
    return prev + `<option value="${curr[0]}">${curr[1]}</option>`;
  }, '');

  html += `</select>`;

  return html;
};

const createTextAreaElement = (item) => {
  return `<textarea
    class="form__control"
    name="${item.name}"
    id="${item.name}"
    placeholder="${item.placeholder}"
    ${item.required ? 'required' : ''}
  ></textarea>`;
};

const createInputElement = (item, maxLength = 255, type = 'text') => {
  return `<input
    type="${type}"
    class="form__control"
    name="${item.name}"
    id="${item.name}"
    placeholder="${item.placeholder}"
    maxlength="${maxLength}"
    ${item.required ? 'required' : ''}
  >`;
};

const createSubmitButton = (value, callback) => {
  const submitButton = document.createElement('input');
  submitButton.type = 'submit';
  submitButton.className = 'form__submit';
  submitButton.value = value;
  submitButton.onclick = callback;

  return submitButton;
};

const validateRequiredFields = (fieldsetId) => {
  let isValid = true;

  // I could do this but it will touch the DOM all the time...
  // So I prefered to use some validation on the next algorithm
  // to don't change the style if it's showing already
  // [...document.getElementsByClassName('.form__message')].forEach((e) => {
  //   e.style.display = 'none';
  // });

  document.querySelectorAll(fieldsetId + ' [required]').forEach((e) => {
    // Get the style object pointer address
    // instead of the display directly to be able to change it
    let { style: formMessageStyle } = document.querySelector(
      `.form__message[for='${e.name}']`,
    );

    if (e.value === '') {
      if (formMessageStyle.display !== 'block') {
        formMessageStyle.display = 'block';
      }

      isValid = false;
      return;
    }

    if (formMessageStyle.display === 'block') {
      formMessageStyle.display = 'none';
    }
  });

  return isValid;
};

const createFieldsFromJson = (prev, curr) => {
  let html = `<div class="form__group">
    <label
      for="${curr.name}"
      class="form__label ${curr.required ? ' required' : ''}"
    >
      ${curr.label}
    </label>`;

  switch (curr.type) {
    case 'enumerable':
      html += createSelectElement(curr);
      break;
    case 'big_text':
      html += createTextAreaElement(curr);
      break;
    case 'small_text':
      html += createInputElement(curr);
      break;
    case 'cep':
      // Cannot use a mask lib...
      html += createInputElement(curr, 9);
      break;
    case 'email':
      html += createInputElement(curr, 255, 'email');
      break;
    case 'phone':
      html += createInputElement(curr, 11, 'tel');
      break;
    default:
      return prev;
  }

  if (curr.required) {
    html += `<span class="form__message" for="${
      curr.name
    }">Este campo é obrigatório</span>`;
  }

  html += '</div>';

  return prev + html;
};

(async () => {
  const response = await fetch('http://localhost:3000/fields');
  const { request_fields, user_fields } = (await response.json())._embedded;

  const requestFieldsElement = document.getElementById('request-fields');
  const userFieldsElement = document.getElementById('user-fields');

  const requestFieldsChildren = request_fields.reduce(createFieldsFromJson, '');
  const userFieldsChildren = user_fields.reduce(createFieldsFromJson, '');

  requestFieldsElement.innerHTML = requestFieldsChildren;
  userFieldsElement.innerHTML = userFieldsChildren;

  const requestSubmit = createSubmitButton('Buscar profissionais', (e) => {
    e.preventDefault();

    if (!validateRequiredFields('#request-fields')) {
      return;
    }

    requestFieldsElement.style.display = 'none';
    userFieldsElement.style.display = 'block';

    const stepActiveClass = 'form__tabs-item--active';
    document.getElementById('forms-step-1').classList.remove(stepActiveClass);
    document.getElementById('forms-step-2').classList.add(stepActiveClass);
  });

  const userSubmit = createSubmitButton('Enviar', (e) => {
    e.preventDefault();

    if (!validateRequiredFields('#user-fields')) {
      return;
    }
  });

  document.getElementById('request-fields').appendChild(requestSubmit);
  document.getElementById('user-fields').appendChild(userSubmit);
})();
