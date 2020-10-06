//getting Elements from DOM
const currOnePicker = document.getElementById('currency-one');
const currTwoPicker = document.getElementById('currency-two');
const currOneAmount = document.getElementById('amount-one');
const currTwoAmount = document.getElementById('amount-two');
const flipButton = document.getElementById('flip');
const rate = document.getElementById('rate');


//Event Listeners
currOnePicker.addEventListener('change', calculate);
currTwoPicker.addEventListener('change', calculate);
currOneAmount.addEventListener('input', calculate);
currTwoAmount.addEventListener('input', calculate);
flipButton.addEventListener('click', flip);

calculate();      //calculate function call krrhe hain 

//fetch exchange rate from 3rd Party API and update DOM
//www.exchangerate-api.com

//creating function calculate()
function calculate() {
    //value ka code get krrhe hain
    const currOneCode = currOnePicker.value;             //select-1 ka code get krrhe hain value se option mein
    const currTwoCode = currTwoPicker.value;             //select-2 ka code get krre hain value se option mein
    //console.log(currOneCode,currTwoCode);              //check krrhe the ke code arha hai ya nhi is liye console use krrhe hain hm 
    fetch(`https://v6.exchangerate-api.com/v6/ba8526cd8e15a51fabf61ad8/latest/${currOneCode}`)         //template literal es6-js use kra hai take jb bhi change kreinge hm currency wo data fetch krle yh aur currency change hojae 
        .then(res => res.json())
        .then(data => {                                   //data ke function mein sara kaam kreinge jo data ka rate lake print krwaeinge aur jo convert kreinge wo sb
            const exchangeRate = data.conversion_rates[currTwoCode];     //exchange rate call kra hai hmne jo data aya hai fetch krke usmein conversion_rates mein se jis ka  bhi hmein chahiye is liye variable dala hai hmne wrna hardcode krdete hm
            //console.log(exchangeRate);             //console pe dropdown change krke check krrhe the rates hm

            //displaying conversion rates on screen
            rate.innerText = `1 ${currOneCode} = ${exchangeRate} ${currTwoCode}`;

            //applying conversion rate and update amount of currencyTwo
            currTwoAmount.value = (currOneAmount.value*exchangeRate).toFixed(2);            //currencyOneAmount ko exchange se multiply krdeinge to exchange value ajaegi hmare pas aur phir usko .toFixed se hm 2 decimal places pe krrhe hain 
        });
}



//Flip function bnarhe hain jo kaam krega jb flip button dabaeinge hm
function flip(){
    //values flip krrhe hain select boxes ki hm jb flip button dabein to swap hojaein values
    const temp = currOnePicker.value;       //temp bnarhe hain take msla na ho koi aramse values assign krdein aik dosre ko agar do se krte bs to nhi horhi thi sahi se 
    currOnePicker.value = currTwoPicker.value;    //.value likhna zroori hai kionke hm value ko bularhe hain aur change krrhe hain dosri value se wrna error aega 
    currTwoPicker.value = temp;
    calculate();           // calculate function call krrhe hain take amount update hojaein
    console.log(currTwoPicker);
}



