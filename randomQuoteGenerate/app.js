let button = document.querySelector(".btn");

let quoteText = document.getElementById("quote-txt");
let author = document.querySelector(".author");

let isFetch = 0;

button.addEventListener("click",()=>{
  isFetch = 1;
  button.innerText = "Loading Quotes";
  button.classList.add("btn-loading");
  fetch("https://api.quotable.io/random")
  .then((response)=>{
    return response.json();
  })
  .then(data =>{
    console.log(data);
    button.innerText = "New Quote";
    button.classList.remove("btn-loading");
    quoteText.innerText = `${data.content}`;
    author.innerText = `By ${data.author}`;
  })
  .catch((reject)=>{
    console.log(reject);
  });
  if (isFetch == 1) {
    let speech = document.getElementById("speech");
    let clipboard = document.getElementById("clipboard");
    let twitter = document.getElementById("twitter");
  
    speech.addEventListener("click",()=>{
      let txtToSpeech = new SpeechSynthesisUtterance(`${quoteText.innerText} ${author.innerText}`);
      speechSynthesis.speak(txtToSpeech);
    });
  
    clipboard.addEventListener("click",()=>{
      navigator.clipboard.writeText(`${quoteText.innerText} ${author.innerText}`);
    });
  
    twitter.addEventListener("click",()=>{
      let url = `https://twitter.com/intent/tweet?url=${quoteText.innerText} ${author.innerText}`;
      window.open(url,"_blank");
    });
  }else{
    alert("Please generate quote first");
  }
});