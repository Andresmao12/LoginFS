const { application } = require("express");

const form = document.getElementById("form-login");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = document.getElementById("user").value;
  const psw = document.getElementById("password").value;

  const url = "http://127.0.0.1:3000/app/page/login.html";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Conten-Type": "application/json" },
    body: JSON.stringify({ user, psw }),
  });

  if (res.ok) {
    
  }
});
