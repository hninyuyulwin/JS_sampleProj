let userInput = document.querySelector(".search input");
let ul = document.querySelector("ul");
ul.style.display =   "none";

let infoText = document.querySelector(".info-text");
let soundClick = document.querySelector(".soundClick");
let audio;


function searchSynon(data){
  searchWord(data);
}

function showUsers(data){
  console.log(data);
  let lastphonetic = data[0].phonetics.length - 1;
  let lastMeaning = data[0].meanings.length - 1;
  let lastDefinition = data[0].meanings[lastMeaning].definitions.length - 1;
  
  ul.style.display = "block";
  audio = new Audio(`${data[0].phonetics[lastphonetic].audio}`);

  document.querySelector(".word p").innerText = data[0].word;
  document.querySelector(".word span").innerText = `${data[0].meanings[lastMeaning].partOfSpeech} ${data[0].phonetics[lastphonetic].text}`;
  document.querySelector(".meaning span").innerText = `${data[0].meanings[lastMeaning].definitions[lastDefinition].definition}`;
  let example = data[0].meanings[lastMeaning].definitions[lastDefinition].example;
  if(example !== undefined){
    document.querySelector(".example").style.display = "block";
    document.querySelector(".example span").innerText = example;
  }else{
    document.querySelector(".example").style.display = "none";
  }

  let lastSynonym = data[0].meanings[lastMeaning].synonyms[0];
  let synonymLen = data[0].meanings[lastMeaning].synonyms.length;
  if (lastSynonym == undefined) {
    document.querySelector(".synonyms").style.display = "none";    
  } else {
    document.querySelector(".synonyms .list").innerHTML = "";
    document.querySelector(".synonyms").style.display = "block";
    for (let i = 0; i < synonymLen; i++) {
      let item = `<span onclick="searchSynon('${data[0].meanings[lastMeaning].synonyms[i]}')">${data[0].meanings[lastMeaning].synonyms[i]}</span>`;
      document.querySelector(".synonyms .list").insertAdjacentHTML("beforeend",item);
    }
  }
}

function showWords(result,word){
  if(result.title){
    infoText.style.color = "red";
    infoText.innerHTML = `No result fount of <b>${word}</b>`;
  }else{
    userInput.blur();
    userInput.value = "";
    infoText.innerHTML = ``;
    showUsers(result);
  }
}
function searchWord(word){
  infoText.style.color = "blue";
  infoText.innerHTML = `Searching ${word}`;
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  .then(response =>{
    return response.json();
  })
  .then(data=>{
    showWords(data,word);
  })
  .catch(reject=>{
    console.log(reject);
  });
}

userInput.addEventListener("keyup",(e)=>{
  if (e.key == "Enter" && e.target.value) {
    searchWord(e.target.value);
  }
}); 

userInput.addEventListener("focus",()=>{
  ul.style.display = "none";
  infoText.innerText = `Type any existing word and press enter to get meaning, example,
  synonyms, etc.`;
  infoText.style.color = "#9a9a9a";
})

soundClick.addEventListener("click",()=>{
  audio.play();
});
