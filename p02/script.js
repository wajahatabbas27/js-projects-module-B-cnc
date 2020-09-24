

const container = document.querySelector('.container');                            //jski class container hai usko leke ajao
const seats = document.querySelectorAll('.row.seat:not(.occupied)');              //seats mein wo seats hngi bs jo row mein hain aur jinki class occupied nhi hai.
const count = document.getElementById('count');         //span wale count ko get kra hai count variable mein
const total = document.getElementById('total');         //span wale total ko get kra hai total variable mein price ke liye 
const movieSelect = document.getElementById('movie');     //select wala dropdown jski id movie hai usko get kra hai hmne
let ticketPrice = +movieSelect.value;                  //+ se integer hojaegi string value aur jo movie select kri hogi wo value leke ajaega yh. 

populateUI();   //calling populateUI function to check local storage and get update

//container pr event listener bna rhe hain take seat ka color change hojae
container.addEventListener('click',e => {           // yh btarha hai jb click ho color change hojae seat ka islliye event listener call kra hai hmne
    //console.log(e.target);  jhn bhi container mein click kreinge UI mein show hojaega console mein

    // hm chahte hain khali seats mein kaam kre yh take color change hojae seats ka uske ilawa kaam nhi kre isliye conditional statement lgarhe hain

    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){   //khali seats pe jb click ho occupied seats pe nhi
        
        e.target.classList.toggle('selected');  //toggle se select/deselect dono hojaegi 

        updateselectedcount();                  // jo bhi selected seats hn unka count aur total ajae isliye function create krrhe hain hm  


    }

})



//function bna rhe hain take toggle seats ka total aur count display kradein screen pe.

function updateselectedcount(){
    const selectedSeats = document.querySelectorAll('.row.seat.selected');
    //console.log(selectedSeats); //node list aegi pori jo selected seats hngi 
    const countSelectedSeats = selectedSeats.length;
    //console.log(countSelectedSeats);  length show krega kitni seats selected hain unki yh 

    count.innerText = countSelectedSeats;        //count variable jo uper bnaya tha uske innertext ko update krrhe hain selected seats se.

    total.innerText = ticketPrice * countSelectedSeats ;      // total price calculate krrhe hain aur update krrhe hain direct hm total ke innertext ko.


    const seatsIndex = [...selectedSeats].map(function(seat){                       //nodelist ko array mein change krrhe hain hm , spread operator se aur map method ko function chahiye hota hai aur yh array leta hai aur array hi return krta hai.
        return [...seats].indexOf(seat);                                            //seat ke index ki array list return krrha hai yh.

    });

    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));               //jo seats hngi unko string mein change krke localstorage browser mein save kr rha hai yh.



}


//aik aur eventlistener bnarhe hain hm movieselect pe take jb movie change krein to price calculation bhi change hojae hamare paas.

movieSelect.addEventListener('change',e =>{
    ticketPrice=e.target.value;    //jese hi movie select change krein hm price change hojae hmare pas
    updateselectedcount();         //function call kra hai take count bhi barhjae seats ka hmare paas

    setMovieData(e.target.selectedIndex,e.target.value);
    
})



//function set movie data to set items in localstorage.

function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);

}




//function bnarhe hain take dekhe koi data save hai ya  nhi phle 


function populateUI(){
    
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));        //json.parse string data ko int mein change krrha hai aur hm variable mein data ko get krrhe hain

    if(selectedSeats !== null && selectedSeats.length > 0){    //agar seats khali nhi hain to aage brhega

        seats.forEach((seat,index) => {
            if(selectedSeats.indexOf(index) > -1){           //agar seats alag hngi to value aegi otherwise -1 aur agar alag hn to execute kro

                seat.classList.add('selectedSeats');          //agar alag seats hain to UI update krdo

            }
        })
        

    }


    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');           //movie items get krrhe hain hm variable mein

    if (selectedMovieIndex !==null){          //agar null nhi ho koi movie to
        movieSelect.selectedIndex = selectedMovieIndex;      //y isliye hai take agar movie badlein to update hojae yh.

    }

    

}


updateselectedcount();   //calling upadteselectedseats function to check just






















