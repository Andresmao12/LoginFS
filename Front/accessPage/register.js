const form = document.querySelector(".form-register");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = document.getElementById("user");
  const phone = document.getElementById("phone");
  const nPsw = document.getElementById("nPassword");
  const cPsw = document.getElementById("cPassword");

  const res = await fetch("http://127.0.0.1:4000/register");
  const data = await res.json()
  console.log(data)
});
