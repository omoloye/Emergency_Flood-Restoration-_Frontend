const form = document.getElementById("booking-form");
const message = document.querySelector(".message");
const form2 = document.getElementById("form-second");

const fName = form.querySelector(".fname");
const lName = form.querySelector(".lname");
const email = form.querySelector(".em");
const phoneNum = form.querySelector(".phone");

const check1 = form.querySelector("#check1");
const check2 = form.querySelector("#check2");
const check3 = form.querySelector("#check3");
const check4 = form.querySelector("#check4");

const amount = document.getElementById("con-amount");
const totalServices = document.getElementById("totalServices");

let totalNum = 0;

var inputs
function checkAll() {
 inputs = document.querySelectorAll(".pl");
 let bb = [];
  for (var i = 0; i < inputs.length; i++) {
    // inputs[i].checked = true;
    if(inputs[i].checked){
      bb.push(inputs[i].value)
    }

  }
  totalServices.value = bb
}

function handleCheck(elem, charge) {
  elem.addEventListener("click", () => {
    const cost = charge;
    if (elem.checked) {
      totalNum += cost;
      amount.value = totalNum;
    } else if (!elem.checked) {
      totalNum -= cost;
      amount.value = totalNum;
    }
  });
  
}

handleCheck(check1, 120000);
handleCheck(check2, 4000);
handleCheck(check3, 5000);
handleCheck(check4,5000)

function validate(callback) {
  if (!fName.value || !lName.value || !email.value || !phoneNum.value) {
    sendMsg("Fill all fields");
  } else if (!check1.checked && !check2.checked && !check3.checked) {
    sendMsg("Fill all fields");
  } else {
    callback();
  }
}

function sendMsg(msg) {
  message.classList.add("active");
  message.textContent = msg;
  setTimeout(() => {
    message.classList.remove("active");
    message.textContent = "";
  }, 4000);
}

form.querySelector("#bk-btn").addEventListener("click", (evt) => {
  evt.preventDefault();
  checkAll()
  validate(handleForm);
 
  document.getElementById("booking-form").reset();
});
// form2.addEventListener("submit", (e) => {
//     e.preventDefault();
//     validate(finalForm);
// });
function finalForm() {
  console.log(document.getElementsByClassName("price")[0].innerHTML);
}

function handleForm() {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  console.log(data);
 // console.log(inputs)


  const jsonString = JSON.stringify(data);
  const xhr = new XMLHttpRequest();
  xhr.open("POST","http://localhost:8080/api/users/saveuser")
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(jsonString);

  //   console.log({
  //     firstName: fName.value,
  //     lastName: lName.value,
  //     email: email.value,
  //     phoneNum: phoneNum.value,

  //   });
  //   form.classList.add("secActive");
}

// handleForm()
// function ch() {
// //   fetch('api/users/saveuser ')
// //   .then((response) => response.json())
// //   .then((data) => console.log(data));

// }
// ch()


// const book = document.querySelector("form"),
//   nextBtn = form.querySelector(".nextBtn"),
//   backBtn = form.querySelector(".backBtn"),
//   allInput = form.querySelectorAll(".first input");

// nextBtn.addEventListener("click", () => {
//   allInput.forEach((input) => {
//     if (input.value != "") {
//       //   form.classList.add("secActive");
//     } else {
//       form.classList.remove("secActive");
//     }
//   });
// });

// backBtn.addEventListener("click", () => form.classList.remove("secActive"));
