//getting DOM elements
const word = document.getElementById('word');
const wrongLetters = document.getElementById('wrong-letters');
const popup = document.getElementById('popup-container');
const restartButton = document.getElementById('restart');
const notification = document.getElementById('slider-container');
const message = document.getElementById('win-lose');
const hangmanParts = document.querySelectorAll('.hangman-part');          //hangman-parts class ke sare elements get krlie hain array mein hmne

//Array of word to Select
const wordPool = ['javascript', 'facebook', 'youtube', 'computer', 'triumph', 'hangman'];
//select jo word hoga array se uske liye hai yh
const selectedWord = wordPool[Math.floor(Math.random() * wordPool.length)];
console.log(selectedWord);

//keyboard se entry krrha hoga user correct and incorrect words isliye array bnaeinge naam se take un mein add hon 
const correctLetters = [];
const incorrectLetters = [];


//function bnarhe hain take word screen pe display ho
function displaySelectedWord() {
    word.innerHTML = `
    ${selectedWord
            .split('')
            .map(
                letter => `
            <span class="letter"> 
            ${correctLetters.includes(letter) ? letter : ''}
            </span>
        `
            )
            .join('')
        }
`;

    const wordText = word.innerText.replace(/\n/g, '');

    if (wordText === selectedWord) {
        message.innerText = 'You Won!';
        popup.style.display = 'flex';                        //yhn call kra rhe hain take show ho jb game khatam hogya hai ya nhi  
    }

}

displaySelectedWord();


//function to display slider Notification
function showNotification(){
    notification.classList.add('show');                             //show add hojae notification ki class list mein hmare paas take wo uper aake show hojae screen pe
    setTimeout( () => {notification.classList.remove('show')} , 3000);     //3000ms mtlb 3s timeout hai 
}


//function to update wrongletters on screen
//hangman parts nazar ae
//wrong letters nazar ae
function updateWrongLetters(){
    wrongLetters.innerHTML = `
    ${incorrectLetters.length > 0 ? `<p>Wrong Letters </p>` : ''} 
    ${incorrectLetters.map(letter => `<span>${letter}</span>`)}
    `;               //html mein wrong letters heading ajaegi aur letters show hnge isfunction se hmare paas
    
    //hangman parts show krane keliye
    hangmanParts.forEach((part,index) => {
        const error = incorrectLetters.length;
        if (index < error){
            part.style.display = 'block' ;                //jb galti ho to block mein hangman part show krade yh
        }
        else{
            part.style.display = 'none';                  //aur jb galtiyan bhot ziada hojaein to phir yh none show krae hmare paas
        }
    });

    //show popup if lost
    if(incorrectLetters.length === hangmanParts.length){
        message.innerText='You Lost!';                   //message se yh message show hoga
        popup.style.display = 'flex' ;                   //flex mein show hojae screen pe yh
    }

}


//Event Listeners
//1.Keyboard Button press eventlistener to grab key we will make function , yh event listener window pe bnega
window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {                   //keycode yani key, 65-90 range mtlb small letters ki range.
        const letter = e.key;
        //console.log(letter);

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displaySelectedWord();
            }
            else{
                showNotification();                 //slider ke liye function bnaya hai hmne
            }
        }

    }
    else{
        if(!incorrectLetters.includes(letter)){
            incorrectLetters.push(letter);
            updateWrongLetters();                  //wrong letters ke liye function bnarhe hain hm
        }
        else{
            showNotification();
        }
    }
})



//2.Event Listener for Restart Button
restartButton.addEventListener('click', () => {
    //jb restart ho to empty krdo correct and incorrect letter array
    correctLetters.splice(0);           //splice se empty krrhe hain array ko
    incorrectLetters.splice(0);

    //get a new selected word from the pool
    selectedWord = wordPool[Math.floor(Math.random() * wordPool.length)];

    displaySelectedWord();

    //clear the wrong letter div
    updateWrongLetters();

    //hide the popup
    popup.style.display='none';



})

















































