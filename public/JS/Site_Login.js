function ocultar1() {
    if (input_senha_log.type == "password") {
        input_senha_log.type = "text";
        botao_ocultar1.innerHTML = '<img id="img_ocultar" src="../assets/eye_opened.png">';
    } else {
        input_senha_log.type = "password";
        botao_ocultar1.innerHTML = '<img id="img_ocultar" src="../assets/closed_eye.png">';
    }
}
function ocultar2() {
    if (input_senha_cadastro.type == "password") {
        input_senha_cadastro.type = "text";
        botao_ocultar2.innerHTML = '<img id="img_ocultar" src="../assets/eye_opened.png">';
    } else {
        input_senha_cadastro.type = "password";
        botao_ocultar2.innerHTML = '<img id="img_ocultar" src="../assets/closed_eye.png">';
    }
}

function ocultar3() {
    if (input_confirm_senha.type == "password") {
        input_confirm_senha.type = "text";
        botao_ocultar3.innerHTML = '<img id="img_ocultar" src="../assets/eye_opened.png">';
    } else {
        input_confirm_senha.type = "password";
        botao_ocultar3.innerHTML = '<img id="img_ocultar" src="../assets/closed_eye.png">';
    }
}

function new_account() {
    input_senha_log.type = "password";
    botao_ocultar1.innerHTML = '<img id="img_ocultar" src="../assets/closed_eye.png">';
    document.title = 'Swing Rhythms | Cadastro';
    container.style.left = "-50vw";
    input_name.value = ``;
    input_name.placeholder = ``;
    input_email_cadastro.value = ``;
    input_email_cadastro.placeholder = ``;
    input_senha_cadastro.value = ``;
    input_senha_cadastro.placeholder = ``;
    input_confirm_senha.value = ``;
    input_confirm_senha.placeholder = ``;
    input_email_log.value = ``;
    input_email_log.placeholder = ``;
    input_senha_log.value = ``;
    input_senha_log.placeholder = ``;
}

function already_have_account() {
    input_senha_cadastro.type = "password";
    botao_ocultar2.innerHTML = '<img id="img_ocultar" src="../assets/closed_eye.png">';
    input_confirm_senha.type = "password";
    botao_ocultar3.innerHTML = '<img id="img_ocultar" src="../assets/closed_eye.png">';
    document.title = 'Swing Rhythms | Login';
    input_name.value = ``;
    input_name.placeholder = ``;
    input_email_cadastro.value = ``;
    input_email_cadastro.placeholder = ``;
    input_senha_cadastro.value = ``;
    input_senha_cadastro.placeholder = ``;
    input_confirm_senha.value = ``;
    input_confirm_senha.placeholder = ``;
    input_email_log.value = ``;
    input_email_log.placeholder = ``;
    input_senha_log.value = ``;
    input_senha_log.placeholder = ``;
    container.style.left = "0";
}
function create_account() {
    var name = input_name.value;
    var email_cadastro = input_email_cadastro.value;
    var senha_cadastro = input_senha_cadastro.value;
    var confirm_senha = input_confirm_senha.value;

    var tamanho_email = email_cadastro.length;
    var arroba = email_cadastro.indexOf("@");
    var tamanho_senha = senha_cadastro.length;

    if (name == "") {
        input_name.value = ``;
        input_name.placeholder = `Your name is necessary.`;
    } else if (arroba < 0 || tamanho_email < 6) {
        input_email_cadastro.value = ``;
        input_email_cadastro.placeholder = `Email inválido.`;
    } else if (tamanho_senha < 6) {
        input_senha_cadastro.value = ``;
        input_confirm_senha.value = ``;
        input_senha_cadastro.placeholder = `A senha precisa de no mínimo 8 caracteres.`;
    } else if (senha_cadastro != confirm_senha) {
        input_senha_cadastro.value = ``;
        input_confirm_senha.value = ``;
        input_senha_cadastro.placeholder = `As senhas não são iguais`;
        input_confirm_senha.placeholder = `As senhas não são iguais`;
    } else {
        input_name.value = ``;
        input_name.placeholder = ``;
        input_email_cadastro.value = ``;
        input_email_cadastro.placeholder = ``;
        input_senha_cadastro.value = ``;
        input_senha_cadastro.placeholder = ``;
        input_confirm_senha.value = ``;
        input_confirm_senha.placeholder = ``;


        // Chama a função para enviar os dados para a API
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: name,
                emailServer: email_cadastro,
                senhaServer: senha_cadastro
            }),
        })
            .then(function (resposta) {
                console.log("ESTOU NO THEN DO CADASTRAR()!")
                if (resposta.ok) {
                    Swal.fire({
                        position: "bottom-end",
                        icon: "success",
                        title: "Conta criada com sucesso",
                        background: "#1D1D1D",
                        color: "#FFF",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => { already_have_account(); }, "1500");

                } else {
                    input_name.placeholder = `Este nome já está sendo usado!`;
                }
            })
    }
}


function login() {
    var email_log = input_email_log.value;
    var senha_log = input_senha_log.value;

    if (email_log == "" || senha_log == "") {
        Swal.fire({
            title: "FALHA",
            text: "ERRO AO AUTENTICAR",
            icon: "error",
            background: '#1D1D1D',
            color: '#FFF',
        });
    }

    console.log("FORM LOGIN: ", email_log);
    console.log("FORM SENHA: ", senha_log);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email_log,
            senhaServer: senha_log
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);
            input_email_log.value = ``;
            input_email_log.placeholder = ``;
            input_senha_log.value = ``;
            input_senha_log.placeholder = ``;

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.emailUsuario;
                sessionStorage.NOME_USUARIO = json.nomeUsuario;
                sessionStorage.ID_USUARIO = json.idUsuario;

                fetch(`/usuarios/fezQuestionario/${json.idUsuario}`)
                    .then(function (resposta) {
                        console.log(resposta);
                        if (resposta.ok) {
                            var fez_login = true;
                            sessionStorage.FEZ_LOGIN = fez_login;
                            resposta.json().then(function (resposta) {
                                Swal.fire({
                                    title: "SUCESSO",
                                    text: "AUTENTICADO COM SUCESSO",
                                    icon: "success",
                                    background: '#1D1D1D',
                                    color: '#FFF',
                                    showConfirmButton: false
                                });
                                if (resposta) {
                                    setTimeout(() => { window.location = sessionStorage.LOCAL; }, "1500");
                                } else {
                                    setTimeout(() => { window.location = "../HTML/Site_Quiz.html" }, "1500");
                                }
                            });
                        } else {
                            throw ('Houve um erro na API!');
                        }
                    }).catch(function (resposta) {
                        console.error(resposta);
                    });
            });
        } else {

            input_email_log.value = ``;
            input_email_log.placeholder = ``;
            input_senha_log.value = ``;
            input_senha_log.placeholder = ``;
            resposta.text().then(texto => {
                console.error(texto);
                Swal.fire({
                    title: "ERRO",
                    text: "FALHA AO AUTENTICAR",
                    icon: "error",
                    background: '#1D1D1D',
                    color: '#FFF',
                });
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}