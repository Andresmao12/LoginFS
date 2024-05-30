const form = document.querySelector(".form-register");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = document.getElementById("user").value;
  const phone = document.getElementById("phone").value;
  const nPsw = document.getElementById("nPassword").value;
  const cPsw = document.getElementById("cPassword").value;

  const res = await fetch("http://127.0.0.1:4000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, phone, nPsw, cPsw }),
  });

  const data = await res.json();

  if (data.status == "success") {
    alert(data.message);
    window.location.href = data.redirect;
    return;
  }else{
    const contMsg = document.querySelector(".cont-msg");
    contMsg.classList.remove('hidden')
    contMsg.children[0].innerHTML = data.message;
  }

  console.log(data.message)

});
