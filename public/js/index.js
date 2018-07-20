(async () => {
  const response = await fetch('http://localhost:3000/fields');
  const {
    request_fields,
    user_fields
  } = (await response.json())._embedded;

  const requestFields = request_fields.reduce((prev, curr) => {
    let html = `<div class="form-group">
      <label
        for="${curr.name}"
        ${curr.required ? 'class="required"' : '' }
      >
        ${curr.label}
      </label>`;

    switch (curr.type) {
      case 'enumerable':
        html += `<select class="form-control" name="${curr.name}" id="${curr.name}">`;

        html += Object.entries(curr.values).reduce((prevVal, currVal) => {
          return prevVal + `<option value="${currVal[0]}">${currVal[1]}</option>`;
        }, '');

        html += `</select>`;
        break;
      case 'big_text':
        html += `<textarea class="form-control" name="${curr.name}" id="${curr.name}"></textarea>`;
        break;
      case 'small_text':
        break;
      case 'cep':
        break;
      case 'phone':
        break;
      default:
        return prev;
    }

    html += '</div>'

    return prev + html;
  }, '');

  document.getElementById('main-form').innerHTML = requestFields;
})();
