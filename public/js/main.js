function sendMessage() {
  const mensagem = document.getElementById("exampleFormControlTextarea1");
  const contato = 61993153532;
  const link = `https://api.whatsapp.com/send?phone=55${contato}&text=${mensagem.value}`;

  window.open(link, "_blank");
}
