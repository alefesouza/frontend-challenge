const enumerable = `<select
    class="form__control"
    name="Qual será o serviço?"
    id="Qual será o serviço?"
    required
  >
    <option value>tipo de serviço</option><option value="Coloração">Coloração</option><option value="Corte">Corte</option><option value="Escova ">Escova </option><option value="Escova progressiva/definitiva">Escova progressiva/definitiva</option><option value="Luzes">Luzes</option><option value="Manicure">Manicure</option><option value="Pedicure">Pedicure</option><option value="Penteado">Penteado</option></select>`;

const big_text = `<textarea
    class="form__control"
    name="Informações Adicionais"
    id="Informações Adicionais"
    placeholder="Descreva o que você precisa"
    
  ></textarea>`;

const small_text = `<input
    type="text"
    class="form__control"
    name="name"
    id="name"
    placeholder=""
    maxlength="255"
    
  >`;

const email = `<input
    type="text"
    class="form__control"
    name="email"
    id="email"
    placeholder="Ex: nome@email.com"
    maxlength="255"
    required
  >`;

const phone = `<input
    type="tel"
    class="form__control"
    name="phone"
    id="phone"
    placeholder=""
    maxlength="11"
    required
  >`;

const allFields = `<div class="form__group">
    <label
      for="Qual será o serviço?"
      class="form__label  required"
    >
      Qual será o serviço?
    </label><select
    class="form__control"
    name="Qual será o serviço?"
    id="Qual será o serviço?"
    required
  >
    <option value>tipo de serviço</option><option value="Coloração">Coloração</option><option value="Corte">Corte</option><option value="Escova ">Escova </option><option value="Escova progressiva/definitiva">Escova progressiva/definitiva</option><option value="Luzes">Luzes</option><option value="Manicure">Manicure</option><option value="Pedicure">Pedicure</option><option value="Penteado">Penteado</option></select><span class="form__message" for="Qual será o serviço?">Este campo é obrigatório</span></div><div class="form__group">
    <label
      for="Para quem será o serviço?"
      class="form__label "
    >
      Para quem será o serviço?
    </label><select
    class="form__control"
    name="Para quem será o serviço?"
    id="Para quem será o serviço?"
    
  >
    <option value>indique para quem será o serviço</option><option value="Criança">Criança</option><option value="Homem">Homem</option><option value="Mulher">Mulher</option></select></div><div class="form__group">
    <label
      for="Informações Adicionais"
      class="form__label "
    >
      Informações Adicionais
    </label><textarea
    class="form__control"
    name="Informações Adicionais"
    id="Informações Adicionais"
    placeholder="Descreva o que você precisa"
    
  ></textarea></div><div class="form__group">
    <label
      for="email"
      class="form__label  required"
    >
      Email
    </label><input
    type="email"
    class="form__control"
    name="email"
    id="email"
    placeholder="Ex: nome@email.com"
    maxlength="255"
    required
  ><span class="form__message" for="email">Este campo é obrigatório</span></div><div class="form__group">
    <label
      for="phone"
      class="form__label  required"
    >
      Celular
    </label><input
    type="tel"
    class="form__control"
    name="phone"
    id="phone"
    placeholder=""
    maxlength="11"
    required
  ><span class="form__message" for="phone">Este campo é obrigatório</span></div>`;

module.exports = {
  enumerable,
  big_text,
  small_text,
  email,
  phone,
  allFields,
};
