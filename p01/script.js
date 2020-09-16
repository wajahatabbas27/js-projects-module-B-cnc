//sb elements ko dom se call krlia hai hmne 
const form = document.getElementById('form');
const username = document.getElementById('username');
const email  = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//eventlistener bna rhe hain hm aur submit button pe call kr rhe hain hm 
form.addEventListener('submit',function(e){
    e.preventDefault();           //isse hatega nhi console mein kuch bhi wrna hat jaega reload pe.
    //console.log('submit');
    //console.log(username.value);
    
    //function bnaya hai checkRequired take baar baar call krna na pare
    checkRequired([username,email,password,password2]);                    //array pass kia hai 
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

//function to check if email is valid 

function isValidEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  //regular expression se check hogi pori email
    return re.test(String(email).toLowerCase());    //phr return hojaegi email
}


//function checkRequired
function checkRequired(inputArray){
    inputArray.forEach(function(input){                 //foreach high order array method hai aur inke andar hm function define krte hain take har input pe execute kre us function ko.

        //console.log(input.value);                       //input.value se value ajaegi 

        if (input.value === ''){
            showError(input,`${getFieldId(input)} is required`);    //es6 template literal use krehain concatenation nhi krni pregi $(getFieldId(input ))   se direct call krrhe hain hm
        }
        else{
            showSuccess(input);
        }



        
    });
}




//function getfieldid take input id propercase mein ae

function getFieldId(input){                              //take get field case set hojhae uska phla letter upper ho aur baki sare lowercase hn 
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}



