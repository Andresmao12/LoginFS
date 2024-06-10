const form = document.querySelector(".form-register");
const url = "http://127.0.0.1:4000/register";
const contMsg = document.querySelector(".cont-msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = document.getElementById("user").value;
  const phone = document.getElementById("phone").value;
  const nPsw = document.getElementById("nPassword").value;
  const cPsw = document.getElementById("cPassword").value;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, phone, nPsw, cPsw }),
  });

  const data = await res.json();

  if (data.status == "success") {
    alert(data.message); //FALTA SER REDIRIGIDO
    alert(data.redirect)
    window.location.href = data.redirect;
    return;
  } else {
    contMsg.classList.remove("hidden");
    contMsg.children[0].innerHTML = data.message;
  }

  console.log(data.message);
});

const inpUser = document.getElementById("user");

inpUser.addEventListener("keyup", async () => {
  const res = await fetch(url + "/userValidation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: inpUser.value }),
  });

  const data = await res.json();

  if (data.status == "success") {
    contMsg.classList.add("hidden");
  } else {
    contMsg.classList.remove("hidden");
    contMsg.children[0].innerHTML = data.message;
  }
});
