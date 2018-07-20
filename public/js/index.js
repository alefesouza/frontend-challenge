/**
 * It's better for perfomance to don't touch the DOM
 * all the time with createElement and appendChild,
 * so I've saved everything on a string to use the
 * innerHTML in the end.
 */

const createSelectElement = (item) => {
  let html = `<select class="form__control" name="${item.name}" id="${item.name}">
  <option value>${item.mask}</option>`;

  html += Object.entries(item.values).reduce((prev, curr) => {
    return prev + `<option value="${curr[0]}">${curr[1]}</option>`;
  }, '');

  html += `</select>`;

  return html;
}

const createTextAreaElement = (item) => {
  return `<textarea class="form__control" name="${item.name}" id="${item.name}" placeholder="${item.placeholder}"></textarea>`;
}

const createInputElement = (item, maxLength = 255, type = 'text') => {
  return `<input type="${type}" class="form__control" name="${item.name}" id="${item.name}" placeholder="${item.placeholder}" maxlength="${maxLength}">`;
};

const createSubmitElement = (text) => `<input type="submit" class="form__submit" value="${text}">`;

const createFieldsFromJson = (prev, curr) => {
  let html = `<div class="form__group">
    <label
      for="${curr.name}"
      class="form__label ${curr.required ? ' required' : '' }"
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

  html += '</div>'

  return prev + html;
};

(async () => {
  const response = await fetch('http://localhost:3000/fields');
  const {
    request_fields,
    user_fields
  } = (await response.json())._embedded;

  let requestFields = request_fields.reduce(createFieldsFromJson, '');
  requestFields += createSubmitElement('Buscar profissionais');

  // let userFields = user_fields.reduce(createFieldsFromJson, '');
  // userFields += createSubmitElement('Finalizar');

  document.getElementById('request-fields').innerHTML = requestFields;
  // document.getElementById('user-fields').innerHTML = userFields;
})();
