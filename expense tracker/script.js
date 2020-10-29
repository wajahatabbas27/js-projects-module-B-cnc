//calling Dom elements
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const description = document.getElementById('description');
const amount = document.getElementById('amount');


//array hoga jsmein objects hnge hmare pas
const dummyTransactions = [
    { id: 1, description: 'salary', amount: 100000 },
    { id: 2, description: 'Electric Bill', amount: -50000 },
    { id: 3, description: 'Internet Bill', amount: -10000 }
];

let transaction = dummyTransactions;

//function to display transaction in transaction history
function addTransactionUI(transaction) {

    //classify if income or expense
    const type = transaction.amount > 0 ? '+' : '-';

    //create DOM elements for list items
    const item = document.createElement('li');         //li create kra hai

    //class derhe hain item ko
    item.classList.add(transaction.amount > 0 ? 'plus' : 'minus');

    //html likhrhe hain hm take show ho hmein wo screen pe
    item.innerHTML = `
    ${transaction.description}
    <span>${type}${Math.abs(transaction.amount)} </span>
    <button class="delete-btn" onClick = "deleteTransaction(${transaction.id})">X</button>
    ` ;

    list.appendChild(item);

}

//function to initialize the app
function init() {
    //phle list ko khali klrrhe hain
    list.innerHTML = '';

    //transactions ko show krne ke liye array ko call krrhe hain hm foreach se loop lgake
    transaction.forEach(addTransactionUI);

    UpdateSums();

}




//function to update balance,income and expense summaries
function UpdateSums() {
    //amount get krrhe hain
    const amounts = transaction.map(transaction => transaction.amount);

    //total value for balance nikal rhe hain
    const total = amounts
        .reduce((acc, amount) => (acc += amount), 0)
        .toFixed(2);

    //calculate total income
    const income = amounts
    .filter(amount => amount >0)
    .reduce((acc,amount) => (acc += amount), 0)
    .toFixed(2);

    //calculate total expense
    const expense = amounts
    .filter(amount => amount <0)
    .reduce((acc,amount) => (acc += amount), 0)
    .toFixed(2);

    //update balance in DOM
    balance.innerText = `${total} PKR`;

    //update income in DOM
    money_plus.innerText = `${income} PKR`;

    //update expense in DOM
    money_minus.innerText = `${expense} PKR`;

}


//function to update transaction from form
function addTransaction(e){
    e.preventDefault();
    
    //check krrhe hain data hai form mein ya aese hi submit krrhe hain hm 
    if(description.value.trim() === '' || amount.value.trim() === ''){
        alert('please enter a valid description and transaction amount')
    }
    else{
        const transaction = {
            id:generateID(),
            description:description.value,
            amount:amount.value
        };
    }

    transaction.push(transaction);
    addTransactionUI(transaction);
    UpdateSums();

    //values khali krrhe hain description aur amount ki
    description.value = '';
    amount.value = '' ;

}

//function id generate krrhe hain
function generateID(){
    return Math.floor(Math.random()*100000000)
}


//function to remove a transaction
function deleteTransaction(id){
    transaction = transaction.filter(transaction => transaction.id != id);
    init();
}



//event listeners
// 1. Event Listener for form Submit
form.addEventListener('submit',addTransaction);



init();