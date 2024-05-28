const form = document.getElementById("form-login");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = document.getElementById("user").value;
  const psw = document.getElementById("password").value;

  const url = "http://127.0.0.1:4000/";

  console.log(user, psw);

  try {
    const resP = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, psw }),
    });

    if (resP.ok) {
      console.log(await resP.json());
    } else {
      console.log(await resP.json());
    }
  } catch (e) {
    console.log(e);
  }
});
