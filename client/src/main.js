console.log("Wilkomen");

// GOAL —> get input and send to server
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  // U FORGOT THIS >:(
  // it adds the values to the object
  const values = Object.fromEntries(formData);

  fetch("https://sql-mit-server.onrender.com/flatterMe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  console.log(values);
});
