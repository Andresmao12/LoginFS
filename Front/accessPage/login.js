const form = document.getElementById("form-login");
const url = "http://127.0.0.1:4000/login";
const contMsg = document.querySelector(".cont-msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = document.getElementById("user").value;
  const psw = document.getElementById("password").value;


  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, psw }),
  });

  const data = await res.json();

  if (data.status == "success") {
    window.location.href = data.redirect;
    console.log(data.message);
    return;
  } else {
    contMsg.classList.remove("hidden");
    contMsg.children[0].innerHTML = data.message;
  }

  console.log(data.message);
});
