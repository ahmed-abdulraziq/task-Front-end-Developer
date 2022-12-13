let Data = {};

userName.addEventListener("input", (e) =>
  input(e, /(\b[a-z])[a-z0-9]{3,13}([a-z]\b)/i, "userName")
);
email.addEventListener("input", (e) => input(e, /\w+@\w+.\w+/i, "email"));
password.addEventListener("input", (e) => input(e, /\w{8,}/i, "password"));
confirmPassword.addEventListener("input", (e) => {
  if (confirmPassword.value === password.value) {
    e.srcElement.style.border = "1px solid #DBE3FF";
    document.querySelector(".sign-up .test.confirmPassword").style.display =
      "none";
  } else {
    e.srcElement.style.border = "1px solid #f00";
    document.querySelector(".sign-up .test.confirmPassword").style.display =
      "block";
  }
});

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    userName &&
    email &&
    password &&
    confirmPassword.value === password.value
  ) {
    postData("https://goldblv.com/api/hiring/tasks/register", Data).then((data) => {
      data.email && localStorage.setItem("user", data.email);
      location.href = `http://${location.host}/succeed.html`;
    });
  }
});

function input(e, re, name) {
  if (!re.test(e.target.value)) {
    e.srcElement.style.border = "1px solid #f00";
    document.querySelector(`.sign-up .test.${name}`).style.display = "block";
    Data[name] = "";
  } else {
    e.srcElement.style.border = "1px solid #DBE3FF";
    document.querySelector(`.sign-up .test.${name}`).style.display = "none";
    Data[name] = e.target.value;
  }
}

async function postData(url = "", data = {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
}
