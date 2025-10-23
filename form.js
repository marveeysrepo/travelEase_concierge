"use strict"

const fullname = document.querySelector(' #fullname');
const email = document.querySelector(' #email');
const message = document.querySelector(' #message');
const submitBtn = document.querySelector(' #submitBtn');

const form = document.querySelector('#Form');
form.addEventListener("submit", e => {
    e.preventDefault();
      let fullnameInput = fullname.input;
    let emailInput = email.input;
    let messageInput = message.input;

    console.log(fullnameInput)
    console.log(emailInput)
    console.log(messageInput)
})
 
