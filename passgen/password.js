let checkUpperCase = (codes) => {
  for (code of codes) {
    if (code >= 65 && code <= 90) return true;
  }
  return false;
};

let checkLowerCase = (codes) => {
  for (code of codes) {
    if (code >= 97 && code <= 122) return true;
  }
  return false;
};

let checkSymbol = (codes) => {
  for (code of codes) {
    if (
      (code >= 33 && code <= 47) ||
      (code >= 58 && code <= 64) ||
      (code >= 91 && code <= 96) ||
      (code >= 123 && code <= 126)
    )
      return true;
  }
  return false;
};

let checkNumber = (codes) => {
  for (code of codes) {
    if (code >= 48 && code <= 57) return true;
  }
  return false;
};

let genPass = (length) => {
  let codes;
  while (true) {
    codes = [];
    for (let i = 0; i < length; i++)
      codes[i] = Math.ceil(Math.random() * 94 + 32);
    if (
      checkLowerCase(codes) &&
      checkUpperCase(codes) &&
      checkNumber(codes) &&
      checkSymbol(codes)
    )
      break;
  }
  let word = [];
  word = codes.map((code) => {
    return String.fromCharCode(code);
  });
  word = word.join("");
  return word;
};

let delay = (delay)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(1);
        },delay)
    })
}

let load = async (prog)=>{
    
    prog.parentElement.hidden=false;
    for(let i=1;i<=100;i++){
        await delay(25)
        prog.setAttribute("style",`width:${i}%`)
    }
    await delay(500);
    prog.parentElement.hidden=true;
    prog.setAttribute("style",`width:0%`)
}

let click = async (event)=>{
    
    
    event.preventDefault();
    let length = Number.parseInt(document.getElementById("length").value);
    let passdiv = document.getElementById("passdiv");
    let pass = document.getElementById("pass");
    let prog = document.getElementById("prog");
    let cpybtn = document.getElementById("cpybtn");
    let cpymsg=document.getElementById("cpymsg");
    
    cpymsg.hidden=true;
    passdiv.hidden=true;
    cpybtn.hidden=true;

    await(load(prog));

    if(Number.isInteger(length)){
      {
        if(length>=4) {
          if(length<=100) {
        passdiv.hidden=false;
        let word = genPass(length);
        pass.innerHTML = word;
        cpybtn.hidden = false;
          }else{
            passdiv.hidden=false;
        pass.innerHTML = "Please enter a number less than 100"
          }
        }else{
          passdiv.hidden=false;
        pass.innerHTML = "Please enter a number greater than 3"
        }
      }
        

    }else{
        passdiv.hidden=false;
        pass.innerHTML = "Please enter a number"
    }
}

let copy = ()=>{
    let pass = document.getElementById("pass").innerHTML;
    navigator.clipboard.writeText(pass);
    let cpymsg=document.getElementById("cpymsg");
    cpymsg.hidden=false;
}

let btn=document.getElementById("btn");
let cpybtn=document.getElementById("cpybtn");
btn.addEventListener('click',click);
cpybtn.addEventListener('click',copy);

