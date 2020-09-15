//sb elements ko dom se call krlia hai hmne 
const form = document.getElementById('form');
const username = document.getElementById('username');
const email  = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//eventlistener bna rhe hain hm aur submit button pe call kr rhe hain hm 
form.addEventListener('submit',function(e){
    //e.preventDefault();           //isse hatega nhi console mein kuch bhi wrna hat jaega reload pe.
    //console.log('submit');
    //console.log(username.value);

    if (username.value === ''){
        showError(username,'Username is Required');

    }
    else {
        showSuccess(username);
    }
    if (email.value === ''){
        showError(email,'Email is Required');

    }
    else {
        showSuccess(email);
    }
    if (password.value === ''){
        showError(password,'Password is Required');

    }
    else {
        showSuccess(password);
    }
    if (password2.value === ''){
        showError(password2,'Confirm Password is Required');

    }
    else {
        showSuccess(password2);
    }


})


//function to show error

function showError(input,message){                         //do parameters hain input aur message 
    const formControl = input.parentElement;               //input ke parent ko access krrhe hain take class name change krlein override krke
    formControl.className= 'form-control error';
    const small = formControl.querySelector('small');      //querySelector se access krskte hain hm id,class,element
    small.innerText = message;

}


//fuction to show success

function showSuccess(input){
    const formControl = input.parentElement;               //input ke parent ko access krrhe hain take class name change krlein override krke
    formControl.className= 'form-control success';

}