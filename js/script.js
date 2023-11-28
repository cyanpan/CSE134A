let forms = document.getElementById('form');
let nameInput = document.getElementById('name');
let commentInput = document.getElementById('comments');
let emailInput = document.getElementById('email');

let outputName = document.querySelector('output[for="name"]');
let outputEmail = document.querySelector('output[for="email"]');
let outputComments = document.querySelector('output[for="comments"]');
let commentChar = document.getElementById('info');

let goodSubmit = document.getElementById('success');
let final_name = true;
let final_email = true;
let final_comments = true;

let form_errors = [];

let newColor = 'black';

function addErrors(field, data, message) {
  form_errors.push({field, data, message});
}

// const maxchars = 200;

// Function to check the validation
function validateForm() {
  goodSubmit.textContent = '';

  nameInput.setCustomValidity('');
  commentInput.setCustomValidity('');
  emailInput.setCustomValidity('');

  outputName.style.opacity = 1;
  outputEmail.style.opacity = 1;
  outputComments.style.opacity = 1;

  // First check if it has contained illegal character for name
  if(!final_name) {

      // ADDED FORM ERROR
      addErrors('name', nameInput.value, 'chars and numbers only');

      nameInput.setCustomValidity('Illegal characters Existed!');
      nameInput.reportValidity();

      outputName.textContent = 'Chars and Numbers Only';
      outputName.style.color = 'red';
      
  }

  // Check if it has illegal character for email
  if(!final_email) {
      // ADDED FORM ERROR
      addErrors('email', emailInput.value, 'chars/numbers/@/. only');

      emailInput.setCustomValidity('Illegal characters Existed!');
      emailInput.reportValidity();

      outputEmail.textContent = 'Chars/numbers/@/. Only';
      outputEmail.style.color = 'red';

  }


  // Check if it has illegal character for comments
  if(!final_comments) {
    // ADDED FORM ERROR
    addErrors('Comments', commentInput.value, 'Illegal character existed!');

    commentInput.setCustomValidity('Illegal characters Existed!');
    commentInput.reportValidity();

    outputComments.textContent = 'Existed Illegal Chars';
    outputComments.style.color = 'red';

  }


  // Checking for name field
  if (nameInput.validity.valueMissing) {
      nameInput.setCustomValidity('Name Cannot Be Empty!');
      nameInput.reportValidity();

      
      outputName.textContent = 'Requiered to Enter Name';
      outputName.style.color = 'red';

      // ADDED FORM ERROR
      addErrors('name', nameInput.value, 'Name Cannot Be Empty!');

  }
  else{
    if(final_name){
      nameInput.setCustomValidity('');
      outputName.textContent = '';
    }
  }

  //Checking for Email field
  if (!emailInput.checkValidity()) {

    if(emailInput.value == '') {
      emailInput.setCustomValidity('Email Cannot Be Empty!');
      emailInput.reportValidity();

      // ADDED FORM ERROR
      addErrors('email', emailInput.value, 'Email Cannot Be Empty!');

      outputEmail.textContent = 'Requiered to Enter Email';
      outputEmail.style.color = 'red';
    }

    if(emailInput.validity.patternMismatch && final_email) {
      emailInput.setCustomValidity('Email Format is Wrong!');
      emailInput.reportValidity();


      // ADDED FORM ERROR
      addErrors('email', emailInput.value, 'Email Format is Wrong!');


      outputEmail.textContent = 'Enter an Valid Email (ex. happy@gmail.com)';
      outputEmail.style.color = 'red';
    }
    
  }
  else{
    if(final_email) {
      emailInput.setCustomValidity('');
      outputEmail.textContent = '';
    }
  }

  // Checking for Comments field
  if(commentInput.validity.valueMissing) {
      commentInput.setCustomValidity('Comments Cannot Be Empty!');
      commentInput.reportValidity();

      // ADDED FORM ERROR
      addErrors('Comments', commentInput.value, 'Comments Cannot Be Empty!');

      outputComments.textContent = 'Required to Enter Comments';
      outputComments.style.color = 'red';
  }
  else {
    if(final_comments){
      commentInput.setCustomValidity('');
      outputComments.textContent = '';
    }
  }

  if(commentInput.checkValidity() && nameInput.checkValidity() && emailInput.checkValidity() && final_name && final_email && final_comments) {
    goodSubmit.textContent = 'SUCCESS SUBMITTED!';
    goodSubmit.style.color = 'green';
    goodSubmit.style.fontWeight = 'bold';


    //Sending Error Array to JSON
    if(form_errors.length > 0) {

      // let formErrorsJSON = JSON.stringify(form_errors);
     

      // let hiddenInput = document.createElement('input');
      // hiddenInput.type = 'hidden';
      // hiddenInput.name = 'form-errors';
      // hiddenInput.value = formErrorsJSON;

      // document.getElementById('form').appendChild(hiddenInput);

      // Submit the form
      //document.getElementById('form').submit();

      let formData = { formErrors: form_errors };

        // Use fetch to send the JSON object to httpbin
        fetch('https://httpbin.org/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Response from httpbin:', data);
          // Handle the response as needed
        })
        .catch(error => console.error('Error:', error));
    }
  }

}




// Part two of Masking

document.addEventListener('DOMContentLoaded', function () {

  const namePattern = /^[a-zA-Z0-9\s]*$/;
  const emailPattern = /^[a-zA-Z0-9@._]*$/;
  const commentPattern = /^[a-zA-Z0-9\s@.!%&*()-_;:'",.?]*$/;


  // nameInput.setCustomValidity('');
  // nameInput.reportValidity();

  // commentInput.setCustomValidity('');
  // emailInput.setCustomValidity('');

  
  
  nameInput.addEventListener('input', function () {

    
    // Name input listener
    const inputValue = nameInput.value;
    nameInput.setCustomValidity('');

    if (!namePattern.test(inputValue)) {
      final_name = false;
      outputName.textContent = 'chars and numbers only';
      outputName.style.color = 'red';
      outputName.style.opacity = 1;
      nameInput.style.backgroundColor = 'lightcoral';


      forms.onsubmit = function (event) {



        event.preventDefault();
      };

      setTimeout(function () {
        outputName.style.opacity = 0;
      }, 4000);

    }

    else{
        outputName.textContent = '';
        nameInput.style.backgroundColor = '';
        // nameInput.setCustomValidity('');
        final_name = true;

        if(final_name && final_email && final_comments){
          forms.onsubmit = null;
        }

    }

  });
   

  // Email input listener
  emailInput.addEventListener('input', function () {
    const emailValue = emailInput.value;
    emailInput.setCustomValidity('');

   
    if (!emailPattern.test(emailValue)) {
      final_email = false;
      outputEmail.textContent = 'chars/numbers/@/. only';
      outputEmail.style.color = 'red';
      outputEmail.style.opacity = 1;
      emailInput.style.backgroundColor = 'lightcoral';

      // emailInput.setCustomValidity('Illegal Chars Existed!');
      // emailInput.reportValidity();



      forms.onsubmit = function (event) {

        event.preventDefault();
      };

      setTimeout(function () {
        outputEmail.style.opacity = 0; 
      }, 4000);
    }

    else{
      outputEmail.textContent = '';
      // emailInput.setCustomValidity('');
      emailInput.style.backgroundColor = '';
      final_email = true;

      if(final_name && final_email && final_comments){
        forms.onsubmit = null;
      }
    }
  });


  //Comments input listener
  commentInput.addEventListener('input', function () {
    const commentValue = commentInput.value;
    commentInput.setCustomValidity('');

    if (!commentPattern.test(commentValue)) {
      final_comments = false;
      outputComments.textContent = 'Illegal character existed!';
      outputComments.style.color = 'red';
      outputComments.style.opacity = 1;
      commentInput.style.backgroundColor = 'lightcoral';

      // commentInput.setCustomValidity('Illegal Chars entered!');
      // commentInput.reportValidity();


      forms.onsubmit = function (event) {
        event.preventDefault();
      };

      setTimeout(function () {
        outputComments.style.opacity = 0; 
      }, 4000);
    }

    else{
      outputComments.textContent = '';
      // commentInput.setCustomValidity('');
      commentInput.style.backgroundColor = '';

      final_comments = true;

      if(final_name && final_email && final_comments){
        forms.onsubmit = null;
      }
    }
    
  });

  //Test for character count
  commentInput.addEventListener('input', function () {
    const maxCharacters = 200;
    const currentCharacters = commentInput.value.length;
    const remainingCharacters = maxCharacters - currentCharacters;

      if(remainingCharacters != maxCharacters) {
        
        commentChar.textContent = `Chars remaining: ${remainingCharacters}`;
        commentChar.style.color = 'white';
        
        if(remainingCharacters < 80) {
          commentChar.style.color = 'orange';
        }
        if(remainingCharacters == 0) {
          commentChar.style.color = 'red';
        }
      }
      else {
        commentChar.textContent = '';
        commentChar.style.color = '';
      }
      

  });



});


//Final part Adding toggle button


document.addEventListener('DOMContentLoaded', function() {
  // Retrieve the theme from localStorage
  var savedTheme = localStorage.getItem('theme');

  // If a theme is saved, set it; otherwise, use the default (black)
  document.body.style.backgroundColor = savedTheme || 'black';
});

function toggleTheme() {
  let body = document.body;
  let currentColor = getComputedStyle(body).backgroundColor;

  if(currentColor === 'black' || currentColor === 'rgb(0, 0, 0)') {
    body.style.backgroundColor = '#FFA07A';
    newColor = '#FFA07A';
  }
  else {
    body.style.backgroundColor = 'black';
    newColor = 'black';
  }
  localStorage.setItem('theme', newColor);
}