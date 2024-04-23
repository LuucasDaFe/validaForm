class ValidaFormulario {
  constructor() {
    this.fomulario = document.querySelector(".formulario");

    this.eventos();
  }

  eventos() {
    this.fomulario.addEventListener("submit", (e) => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const camposValidos = this.camposSaoValidos();
    const senhasValidas = this.senhasSaoValidas();

    if (camposValidos && senhasValidas) {
      alert("Formulário enviado.");
      this.fomulario.submit();
    }
  }

  senhasSaoValidas() {
    let valid = true;

    const senha = this.fomulario.querySelector(".senha");
    const repetirSenha = this.fomulario.querySelector(".repetir-senha");

    if (senha.value !== repetirSenha.value) {
      valid = false;
      this.criarErro(
        senha,
        "Campor senha e repetir senha precisam ser iguais."
      );
      this.criarErro(
        repetirSenha,
        "Campo senha e repetir senha precisam ser iguais."
      );
    }

    console.log(senha.length);

    if (senha.value.length < 6 || senha.value.length > 12) {
      this.criarErro(senha, "Senha precisa ter entre 6 e 12 caracteres.");
      valid = false;
    }

    return valid;
  }

  camposSaoValidos() {
    let valid = true;

    for (let errorText of this.fomulario.querySelectorAll(".error-text")) {
      errorText.remove();
    }

    for (let campo of this.fomulario.querySelectorAll(".validar")) {
      const label = campo.previousElementSibling.innerText;
      if (!campo.value) {
        this.criarErro(campo, "Campo tal não pode estar em branco.");
        valid = false;
      }

      if (campo.classList.contains("cpf")) {
        if (!this.validaCPF(campo)) valid = false;
      }

      if (campo.classList.contains("usuario")) {
        if (!this.validaUsuario(campo)) valid = false;
      }
    }

    return valid;
  }

  validaUsuario(campo) {
    const usuario = campo.value;

    let valid = true;

    if (usuario.length < 3 || usuario.length > 12) {
      this.criarErro(campo, "Usuário precisa ter entre 3 e 12 caracteres.");
      valid = false;
    }

    if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criarErro(
        campo,
        "Nome de usuário precisa conter apenas letras e ou números"
      );
      valid = false;
    }

    return valid;
  }

  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value);

    if (!cpf.valida()) {
      this.criarErro(campo, "CPF inválido.");
      return false;
    }
    return true;
  }

  criarErro(campo, msg) {
    const div = document.createElement("div");
    div.innerHTML = msg;
    div.classList.add("error-text");
    campo.insertAdjacentElement("afterend", div);
  }
}

const valida = new ValidaFormulario();
