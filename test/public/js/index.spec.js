const index = require('../../../public/js/index');
const validations = require('./validations');

describe('Test json to input conversion', () => {
  it('should return select element', () => {
    const field = {
      'name': 'Qual será o serviço?',
      'label': 'Qual será o serviço?',
      'placeholder': 'Qual será o serviço?',
      'mask': 'tipo de serviço',
      'type': 'enumerable',
      'required': true,
      'values': {
        'Coloração': 'Coloração',
        'Corte': 'Corte',
        'Escova ': 'Escova ',
        'Escova progressiva/definitiva': 'Escova progressiva/definitiva',
        'Luzes': 'Luzes',
        'Manicure': 'Manicure',
        'Pedicure': 'Pedicure',
        'Penteado': 'Penteado'
      }
    };

    expect(index.createSelectElement(field)).toEqual(validations.enumerable);
  });

  it('should return textarea element', () => {
    const field = {
      'name': 'Informações Adicionais',
      'label': 'Informações Adicionais',
      'type': 'big_text',
      'placeholder': 'Descreva o que você precisa',
      'required': false
    };

    expect(index.createTextAreaElement(field)).toEqual(validations.big_text);
  });

  it('should return input element', () => {
    const field = {
      'name': 'name',
      'label': 'Nome',
      'type': 'small_text',
      'placeholder': '',
      'required': false
    };

    expect(index.createInputElement(field)).toEqual(validations.small_text);
  });

  it('should return input email element', () => {
    const field = {
      'name': 'email',
      'label': 'Email',
      'type': 'email',
      'placeholder': 'Ex: nome@email.com',
      'required': true
    };

    expect(index.createInputElement(field)).toEqual(validations.email);
  });

  it('should return input tel element', () => {
    const field = {
      'name': 'phone',
      'label': 'Celular',
      'type': 'phone',
      'placeholder': '',
      'required': true
    };

    expect(index.createInputElement(field, 11, 'tel')).toEqual(validations.phone);
  });

  it('tests createFieldsFromJson functions', () => {
    const fields = [{
        'name': 'Qual será o serviço?',
        'label': 'Qual será o serviço?',
        'placeholder': 'Qual será o serviço?',
        'mask': 'tipo de serviço',
        'type': 'enumerable',
        'required': true,
        'values': {
          'Coloração': 'Coloração',
          'Corte': 'Corte',
          'Escova ': 'Escova ',
          'Escova progressiva/definitiva': 'Escova progressiva/definitiva',
          'Luzes': 'Luzes',
          'Manicure': 'Manicure',
          'Pedicure': 'Pedicure',
          'Penteado': 'Penteado'
        }
      },
      {
        'name': 'Para quem será o serviço?',
        'label': 'Para quem será o serviço?',
        'placeholder': 'Para quem será o serviço?',
        'mask': 'indique para quem será o serviço',
        'type': 'enumerable',
        'required': false,
        'values': {
          'Criança': 'Criança',
          'Homem': 'Homem',
          'Mulher': 'Mulher'
        }
      },
      {
        'name': 'Informações Adicionais',
        'label': 'Informações Adicionais',
        'type': 'big_text',
        'placeholder': 'Descreva o que você precisa',
        'required': false
      }, {
        'name': 'email',
        'label': 'Email',
        'type': 'email',
        'placeholder': 'Ex: nome@email.com',
        'required': true
      }, {
        'name': 'phone',
        'label': 'Celular',
        'type': 'phone',
        'placeholder': '',
        'required': true
      }
    ];
    const resultHTML = fields.reduce(index.createFieldsFromJson, '');

    expect(resultHTML).toEqual(validations.allFields);
  });
});
