$(document).ready(function () {
  const users = [];
  let currentUser = {};

  $("#registerButton").click(() => {
    currentUser.name = $("#nameInput").val();
    currentUser.password = $("#passwordInput").val();

    //Caso usuário não coloque nada em algum dos campos
    if (!currentUser.name || !currentUser.password) {
      $(".registerInfo").html(`<h3>Erro: Informações inválidas</h3>`);
    } else {
      $(".registerInfo").html(`<h2>Usuário cadastrado!</h2>`);
      users.forEach((user) => {
        if (currentUser.name == user.name) {
          $(".registerInfo").html(`<h3>Erro: Nome de usuário inválido</h3>`);
        }
      });
      users.push(currentUser);
      console.log(users);
    }
  });
});
