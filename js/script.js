console.log("akshay")

let got;

let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}



let current= new Audio;

async function gets() {

    let a = await fetch('http://127.0.0.1:3000/songs/')

    let response = await a.text();

    let b = document.createElement("div")
    b.innerHTML = response
    let as = b.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];

        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return (songs)
}

let playMusic=(track, pause=false)=>{
    // let audio= new Audio("/songs/"+ track)
    current.src= ("/songs/"+ track)

    if(!pause){

        current.play()
        play.src="/img/pause.svg"
    }
    document.querySelector(".songinfo").innerHTML=decodeURI(track)
}

async function main() {


    
   
        // document.getElementsByClassName("songinfo").innerHtml="udgu"
    

    got = await gets("songs/ncs");

    playMusic(got[0], true)

    let songul = document.querySelector(".songList").getElementsByTagName("ul")[0];

    for (const song of got) {
        songul.innerHTML = songul.innerHTML + `<li>
        <img class="invert" src="./img/music.svg" alt="" srcset="">
        <div class="info">
            <div>${song.replaceAll("%20", " ")}</div>
            <div>Akshay</div>
        </div>
        <div class="playnow">
            <span>Play Now</span>
            <img class="invert" src="./img/play.svg" alt="" srcset="">
        </div>
    </li> `

    }


Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{

    e.addEventListener("click", element=>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playMusic(e.querySelector(".info").firstElementChild.innerHTML)
    })
})


play.addEventListener("click", ()=>{

    if(current.paused){
        current.play()
        play.src= "/img/pause.svg"
    }
    else{
        
        current.pause()
        play.src= "/img/play.svg"
    }
    
})


// body.addEventListener('keyup', (e)=>{

//     if(e.keyCode === 13){
//         console.log("pressed")
//         if(current.paused){
//             current.play()
//             play.src= "/img/pause.svg"
//         }
//         else{
            
//             current.pause()
//             play.src= "/img/play.svg"
//         }
        
//     }

// })

current.addEventListener("timeupdate", ()=>{
    // console.log(current.currentTime, current.duration)
    document.querySelector(".songtime").innerHTML=`${secondsToMinutesSeconds(current.currentTime)} / ${secondsToMinutesSeconds(current.duration)}`
    document.querySelector(".circle").style.left= (current.currentTime/current.duration)*100+"%"
})


document.querySelector(".seekbar").addEventListener("click", e=>{
    let percent= (e.offsetX/e.target.getBoundingClientRect().width)*100 
    document.querySelector(".circle").style.left= percent+ "%"
    current.currentTime= (current.duration*percent)/ 100
})

next.addEventListener("click", ()=>{
    let index= got.indexOf(current.src.split("/").slice(-1)[0])
    if((index+1)< got.length){
        playMusic(got[index+1])
    }
})
previous.addEventListener("click", ()=>{
    let index= got.indexOf(current.src.split("/").slice(-1)[0])
    if((index-1)>= 0){
        playMusic(got[index-1])
    }
})

document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e)=>{
    console.log(e.target.value)
    current.volume= parseInt(e.target.value)/100
})





    var audio = await new Audio(got[0]);
        
}

main()