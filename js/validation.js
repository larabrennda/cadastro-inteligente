const form = document.getElementById("cadastroForm");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmar = document.getElementById("confirmar");
const botao = document.getElementById("btnSubmit");

// Eventos
nome.addEventListener("blur", () => validarCampo(nome, validarNome));
email.addEventListener("blur", () => validarCampo(email, validarEmail));
senha.addEventListener("input", () => validarCampo(senha, validarSenha));
confirmar.addEventListener("blur", () => validarCampo(confirmar, validarConfirmacao));

// Função genérica
function validarCampo(input, funcao) {
  const erro = document.getElementById(input.id + "-error");
  const resultado = funcao(input.value);

  if (!resultado.valido) {
    input.classList.add("error");
    input.classList.remove("success");
    erro.textContent = resultado.mensagem;
  } else {
    input.classList.remove("error");
    input.classList.add("success");
    erro.textContent = "";
  }

  return resultado.valido;
}

// Validações
function validarNome(valor) {
  if (!valor.trim()) return { valido: false, mensagem: "Nome obrigatório !" };
  if (valor.length < 3) return { valido: false, mensagem: "Mínimo 3 caracteres" };
  return { valido: true };
}

function validarEmail(valor) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!valor.trim()) return { valido: false, mensagem: "Email obrigatório" };
  if (!regex.test(valor)) return { valido: false, mensagem: "Email inválido" };
  return { valido: true };
}

function validarSenha(valor) {
  if (valor.length < 8) return { valido: false, mensagem: "Mínimo 8 caracteres" };
  if (!/[A-Z]/.test(valor)) return { valido: false, mensagem: "1 letra maiúscula" };
  if (!/[0-9]/.test(valor)) return { valido: false, mensagem: "1 número" };
  return { valido: true };
}

function validarConfirmacao(valor) {
  if (valor !== senha.value) return { valido: false, mensagem: "Senhas diferentes" };
  return { valido: true };
}

// Submit
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nomeValido = validarCampo(nome, validarNome);
  const emailValido = validarCampo(email, validarEmail);
  const senhaValida = validarCampo(senha, validarSenha);
  const confirmarValido = validarCampo(confirmar, validarConfirmacao);

  if (nomeValido && emailValido && senhaValida && confirmarValido) {

    botao.disabled = true;
    botao.textContent = "Enviando...";

    setTimeout(() => {
      alert("Cadastro realizado com sucesso!");
      form.reset();
      botao.disabled = false;
      botao.textContent = "Criar Conta";
    }, 2000);

  }
});