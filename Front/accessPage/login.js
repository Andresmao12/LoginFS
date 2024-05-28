const form = document.getElementById("form-login");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = document.getElementById("user").value;
  const psw = document.getElementById("password").value;

  const url = "http://127.0.0.1:4000/";

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, psw }),
    });

    const data = await res.json();

    if (data.status == 'success') {
      window.location.href = data.redirect;
      console.log(data.message)
      return;
    }

    console.log(data.message)
});
