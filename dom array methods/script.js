const main = document.getElementById('main');
const addUserButton = document.getElementById('add-user');
const doubleMoneyButton = document.getElementById('double');
const showMillionairesButton = document.getElementById('show-millionaires');
const sortButton = document.getElementById('sort');
const totalButton = document.getElementById('calculate-total');


let data = [];           //empty array hai yh

generateRandomUser();
generateRandomUser();
generateRandomUser();

//random user call kreinge hm api se, uske liye async function bnaeinge.
//randomuser.me/api

async function generateRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    //console.log(data);

    const user = data.results[0];               //jo 0 index pe hai wo lelo
    //console.log(user);
    const newUser = {                               //object create kra hai 
        name: `${user.name.first} ${user.name.last}`,
        worth: Math.round(Math.random() * 1000000)
    };

    addData(newUser);          //function bnaeinge take random users ko array mein save krlein
}

function addData(newUser) {
    data.push(newUser);       //push se add hojata hai data array mein hmara

    updateDom(data);           //function hai yh jb hmare paas data array mein add hojaega phir dom se ui update kreinge uske liye function bnarhe hain 
}

function updateDom(inputData = data) {
    main.innerHTML = `<h2><strong>Name</strong> NetWorth</h2>`;

    inputData.forEach(item => {                           //foreach har aik element pe chalega
        const element = document.createElement('div');            //div element create kra hai create element se 
        element.classList.add('name');                            //phir element mein class list mein add kreinge hm name ,class di hai hmne element ko 
        element.innerHTML = `<strong>${item.name}</strong>${formatCurrency(item.worth)}`;                       //phir innerhtml ko update krrhe hain hm 
        main.appendChild(element);         //main jo section hai html mein wahan append krdia hai hmne data apna

    });
}


function formatCurrency(num) {             //function bnaya hai take , ke sath value show ho formatted
    return 'PKR ' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');         //yh regular expression krega yh ke format krke bhejega data

}


// EventListers
//1-adduser button event listener
addUserButton.addEventListener('click', generateRandomUser);


//2-Double Money button pe event listener bnarhe hain take double krein worth ko uske liye map use kreinge
doubleMoneyButton.addEventListener('click', doubleWorth);

function doubleWorth() {                      //double hojae income isliye bnaya hai hmne yh function
    data = data.map(item => {
        return { ...item, worth: item.worth * 2 }                 //spread operator leke ajaega wapis worth ko ovewrride krrhe hain hm worth ko multiply krke
    });

    updateDom();           //double hochuke hai worth ab updatedom is liye krre hain take screen pe show hojae
}


//3-sortbutton pe sort ke liye listener create krrhe hain
sortButton.addEventListener('click', sortRichest);

function sortRichest() {                               //function bnaya hai take richest jo bhi hain unhe leain
    data.sort((a, b) => b.worth - a.worth);             //yh sort krrha hai richest se built in function haio sort ka
    updateDom();    //sort krlia ab dom update krdo  
}


//4-show Millionaires event listener
showMillionairesButton.addEventListener('click', showMillionaires);


function showMillionaires(){                        //show millionaire function se khalire milliionaires nazar aeinge screen pe
    data = data.filter(                              //filter function filter krdega jo nhi hnge
        item => item.worth > 1000000
    );

    updateDom();                               //filter hogae hain ab screen ko update krdo

}


//5- calculate total wealth event listener
totalButton.addEventListener('click', calculateTotalNetworth);

function calculateTotalNetworth(){                   //total networth add hojaeinge sbke btadega yh
    //reduce array ka method use kreinge yhn aik value return krta hai bs 
    const totalWorth = data.reduce(
        (acc, item) => (acc+= item.worth), 0            //add krrhe hain hm bas sare items ki wealth ko aur start 0 index se hoga 
    );

    //screen pe show kra rhe hain to create element kreinge
    const totalWorthElement = document.createElement('div');
    totalWorthElement.innerHTML = `<h3> Total NetWorth: <strong>${formatCurrency(totalWorth)}</strong></h3>`
    main.appendChild(totalWorthElement);
}











