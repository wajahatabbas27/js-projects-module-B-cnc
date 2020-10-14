//get dom elements
const toggle = document.getElementById('toggle');
const open = document.getElementById('open');
const close = document.getElementById('close');
const modal = document.getElementById('modal');

//Add Event Listeners
//1.Toggle the Nav-Bar
toggle.addEventListener('click', () =>
    document.body.classList.toggle('show-nav')
);

//2.Show the Modal on Apply Now Button
open.addEventListener('click', () =>
    modal.classList.add('show-modal')
);

//3.close the modal 
close.addEventListener('click', () =>
    modal.classList.remove('show-modal')
);

//4.close the modal on closeoutside button
window.addEventListener('click', e =>
    e.target === modal ? modal.classList.remove('show-modal') : false //ternary operator use krrhe hain agar true hai to remove krdega screen ko otherwise nhi krega
);