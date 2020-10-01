//elements get krrhe hain
const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// eventlisteners bnane hain hhar kaam ke liye jo jo perform hoga video player pe.

//1-video element - clickable - click to play screen
video.addEventListener('click',toggleVideo);               //jb click ho screen pe to play ya pause hojae opposite ho.

//2-video element - pause to toggle play icon to pause icon
video.addEventListener('pause',updateIcon);               //pause krrhe hain hm icon change horha hai 

//3-video element - play to toggle pause icon to play icon
video.addEventListener('play',updateIcon);                //play krrhe hain icon change horha hai 

//4-video element - update progress bar and timestamp  
video.addEventListener('timeupdate',updateProgress);      //timeupdate use krrhe hain take time aur progress bar brhe aage aur jb function call ho yh

//5-play button - click to play or pause the video
play.addEventListener('click',toggleVideo);               //play button pe click krein to play ya pause hojae 

//6-stop button - click to reset video and pause video
stop.addEventListener('click',stopVideo);                 //stop button pe click krein to stop hojae ur start mein ajae video

//7-progress bar - change position to change time of playback
progress.addEventListener('change',setProgress);          //change use kr rhe hain kionke agar khud hm brhain video to kia change aya hoa hai function call hoga set progress



//function bnarhe hain sare 

function toggleVideo(){
    if (video.paused){                  //builtin api ke methods aur functions use krrhe hain hm
        video.play();
    }else{
        video.pause();
    }
}


function updateIcon(){
    if (video.paused){
        play.innerHTML = '<i class="fas fa-play fa-2x"></i>' ;             //button update horha hai agar pause hai to play aur agar play hai to pause 
    }else {
        play.innerHTML = '<i class="fas fa-pause fa-2x"></i>';
    }
}


function stopVideo(){
    video.pause();
    video.currentTime = 0 ;
}


function updateProgress(){
    //update slider
    progress.value = video.currentTime/video.duration*100;

    //update timestamp
    //rounding down the minutes
    let minutes = Math.floor(video.currentTime / 60);          //minutes bnarhe hain formulae se floor isliye use krrhe hain take round na ho jb  tak 1 nhi hoga 1 nhi leke aega yh 
    
    if (minutes < 10){
        minutes = `0${minutes}`;      //0 lgarhe hain take 00:00 is trhn se show ho
    }

    //rounding down the seconds 
    let seconds = Math.floor(video.currentTime % 60);            //seconds bnarhe hain hm yhn pe modulo se kionke take remainder show kre.
    
    if (seconds < 10){
        seconds = `0${seconds}`;      //0 lgarhe hain take 00:00 is trhn show ho
    }

    //display timestamp
    timestamp.innerHTML = `${minutes}:${seconds}`;

}


function setProgress(){
    video.currentTime = progress.value * video.duration/100 ;
}







