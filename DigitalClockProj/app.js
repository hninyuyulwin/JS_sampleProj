function autoTime(){
  let date = new Date();
  let hour;
  let min = date.getMinutes();
  let sec = date.getSeconds();
  let nocalcHour = date.getHours();

  let ampm = (nocalcHour > 12) ? "PM" : "AM";

  if(nocalcHour > 12){
    let realhour = nocalcHour - 12;
    hour = (realhour < 10) ? "0"+realhour : realhour;
  }else if(nocalcHour == 0){
    hour = 12;
  }else{
    hour = (nocalcHour < 10) ? "0"+nocalcHour : nocalcHour;
  }

  if(min < 10){
    min = "0"+min;
  }
  if(sec < 10){
    sec = "0"+sec;
  }

  document.querySelector(".hms").innerHTML = `<p>${hour}:${min}:${sec} <span>${ampm}</span></p>`;

  let da = date.getDate();
  da = (da < 10) ? "0"+da : da;
  let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let month = months[date.getMonth()];
  let days = ["Sunday","Monday","Tueday","Wednesday","Thursday","Friday","Saturday"];
  let day = days[date.getDay()];
  let year = date.getFullYear();
  document.querySelector(".dmy").innerHTML = `${da}-${month}-${year}, ${day}`;
}
setInterval(autoTime,1000);