let num=0;
let grid = document.getElementById("grid");
let bell = new Audio("bell.wav");
function addNewAlarm(){
    let insert = `<div id="${num}" class="col">
            <div class="card" style="width: 20rem;">
                <div class="card-header">
                  Create New Alarm
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Hours : <input id="card${num}h" type="number" value=0></li>
                  <li class="list-group-item">Minutes : <input id="card${num}m" type="number" value=0></li>
                  <li class="list-group-item">Seconds : <input id="card${num}s" type="number" value=0></li>
                  <li class="list-group-item"><button id="card${num}b" class="btn btn-primary" onclick="create(${num})">Create</button></li>
                </ul>
            </div>
        </div>`;
    grid.insertAdjacentHTML('beforeend',insert)
    num++;
}
function delay(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(1);
        },1000);
    })
}
async function create(mynum){
    let h = Number.parseInt(document.getElementById(`card${mynum}h`).value)
    let m = Number.parseInt(document.getElementById(`card${mynum}m`).value)
    let s = Number.parseInt(document.getElementById(`card${mynum}s`).value)
    if(!(h>=0 && h<=60 && m>=0 && m<=60 && s>=0 && s<=60))
        return;
    let time = h*60*60 + m*60 + s;

    let mydiv = document.getElementById(mynum.toString())
    
    for(let i=1;i<=time;i++){
        mydiv.innerHTML = `<div class="card" style="width: 20rem;height:15rem">
                <div class="card-header">
                    Alarm
                </div>
                <div class="card justify-content-center align-items-center" style="height:100%; width:100%;border-style: none;">
                    <p style="font-size:xx-large;">${h} : ${m} : ${s}</p>
                </div>
            </div>`
        await delay();
        if(s==0) {
            s=60;
            if(m==0){
                h--;
                m=60;
            }
            m--;
        }
        s--;
    }
    console.log(`${mynum} just got over`);
    bell.play();
    mydiv.replaceWith("");
}

let newAlarm = document.getElementById("newAlarm")
newAlarm.addEventListener('click',addNewAlarm)
