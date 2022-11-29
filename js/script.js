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

let mail = document.getElementById("em"),
errorMessage = document.getElementById("errorMessage");
let email_pattern = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;


let ph = document.getElementById("phone"),
errorMessag = document.getElementById("errorMessag");
let phone_pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ ;


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

handleCheck(check1, 6000);
handleCheck(check2, 4000);
handleCheck(check3, 7000);
handleCheck(check4,5000)

function validate(callback) {
  if (!fName.value || !lName.value || !email.value || !phoneNum.value) {
    sendMsg("Fill all fields");
  } else if (!check1.checked && !check2.checked && !check3.checked && !check4.checked) {
    sendMsg("Fill all fields");
  } else {
    callback();
  }
}

// Form email validation starts
let valid = () => {
  if (email.value === "" || !email.value.match(email_pattern)) {

 errorMessage.className = "active";
 errorMessage.focus();
    return false;
  }   
  return true;
};
// phone validation 
let vali = () => {
    if ( phoneNum.value === "" || !phoneNum.value.match(phone_pattern)) {
  errorMessag.className = "active";
  errorMessag.focus();
   return false;
  }
  return true;
};






function sendMsg(msg) {
  message.classList.add("active");
  message.textContent = msg;
  setTimeout(() => {
    message.classList.remove("active");
    message.textContent = "";
  }, 4000);
}
//  let isVal = vali()
  // if (isVal) 
form.querySelector("#bk-btn").addEventListener("click", (evt) => {

 //console.log(event.target);

  evt.preventDefault();
  

  let isValid = valid();
  let isVal = vali();
  if(isVal)
  if (isValid) {
    checkAll()
  validate(handleForm);
  }

 
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
  // const xhr = new XMLHttpRequest();
  // xhr.open("POST","http://localhost:8080/api/users/saveuser")
  // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  // xhr.send(jsonString);

  // // That's HTTP for 'ok'
  //   console.log(xhr);

  //   console.log(xhr.responseText.readyState)



 let urlx = "http://localhost:8080/api/users/saveuser"

 function callb(e){
  let s = JSON.parse(e)
  console.log(s.message)

  Swal.fire({
    icon: 'success',
    title: 'success',
    text: s.message
    // footer: '<a href="">Why do I have this issue?</a>'
  })
  


 }
    
function load(url, callback) {
  const xhr = new XMLHttpRequest();

  
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      callback(xhr.response);
    }
  }

  xhr.open('POST', url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(jsonString);
}


load(urlx, callb);
   
}








