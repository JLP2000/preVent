const body = document.querySelector("body");
const postButton = document.querySelector("#buttonpost");
const form = document.getElementById("formpost");
const cover = document.querySelector("main.inner");
const postText = document.getElementById("post")
const relationshipsFilter = document.getElementById("relationships")
// let chosenGif;
const baseURL = "http://localhost:3000/entries/"
const categoryURL = "http://localhost:3000/category/"

// event listeners
relationshipsFilter.addEventListener('click', getRelationships)
postText.addEventListener('keyup', updateCharCount)
form.addEventListener('submit', postForm) 



async function getRelationships(){
    let category = relationshipsFilter.value
    let data = await getCategory(category)
}

async function getCategory(category){
    let data = await fetch(categoryURL + category)
        .then(res => res.json())
        .then(data => {
          return data;
        })
        return data;
}

async function originalData(id) {
  let data = await fetch(baseURL + id)
      .then(res => res.json())
      .then(data => {
          return data;
      })
      return data;
}
function printData(data,id) {
  document.getElementById(`date_${id}`).textContent = data.dnt
  document.getElementById(`post_${id}`).textContent = data.entry
  document.getElementById(`postGify_${id}`).textContent = data.gify
  document.getElementById(`happyCount${id}`).textContent = data.emoji["happy"]
  document.getElementById(`amusedCount${id}`).textContent = data.emoji["amused"]
  document.getElementById(`shockedCount${id}`).textContent = data.emoji["shocked"]
  document.getElementById(`sadCount${id}`).textContent = data.emoji["sad"]
  document.getElementById(`angryCount${id}`).textContent = data.emoji["angry"]
  document.getElementById(`commentCount${id}`).textContent = data.comments.length
 }
 

// window.addEventListener("load", async (e) => {
//   e.preventDefault();
//   let allEntries = await allData();
// })

//loading original data
window.addEventListener("load", async () => {
  console.log("hello")
  let allEntries = await allData();
  console.log(allEntries);

  let divCardsContainer = document.getElementById("cardContainer");

  for (let j = 0; j < allEntries.length; j++) {
    let currentData = allEntries[j];
    console.log(currentData.id);

    let divCard = document.createElement("div");
    divCard.setAttribute("class", "card");
    let divCardHeader = document.createElement("div")
    divCardHeader.setAttribute("class", "card-header");
      let pCategory = document.createElement("p")
      pCategory.setAttribute("class", "category");
      let pDate = document.createElement("p")
      pDate.setAttribute("class", "date");
    let divPost = document.createElement("div")
    divPost.setAttribute("class", "post");
      let p = document.createElement("p");
      let postImg = document.createElement("img");
      postImg.setAttribute("class", "postGify");
    let divReactions = document.createElement("div")
    divReactions.setAttribute("class", "reactions");
      let buttonReaction = document.createElement("button");
        let divEmoji = document.createElement("div").setAttribute("class", "emoji");
        let divCount = document.createElement("div").setAttribute("class", "count");
        let divText = document.createElement("div").setAttribute("class", "text");
    let br = document.createElement("br");
    let divComments = document.createElement("div")
    divComments.setAttribute("class", "comments");
      let divForm = document.createElement("div")
      divForm.setAttribute("class", "form");
        let formWriteComment = document.createElement("form")
        formWriteComment.setAttribute("class", "writeComment");
          let textareaComment = document.createElement("textarea")
          textareaComment.setAttribute("rows", "2");
          let inputSubmit = document.createElement("input")
          inputSubmit.setAttribute("type", "submit");

         console.log(divCard);

    let commentButton = document.createElement("button");
    commentButton.setAttribute("id", `${currentData.id}_comment-icon`)
    commentButton.setAttribute("class", `reaction${currentData.id} reaction`);
    let happyButton = document.createElement("button");
    happyButton.setAttribute("class", `reaction${currentData.id} reaction`);
    happyButton.setAttribute("value", "happy");
    let amusedButton = document.createElement("button");
    amusedButton.setAttribute("class", `reaction${currentData.id} reaction`);
    amusedButton.setAttribute("value", "amused");
    let shockedButton = document.createElement("button");
    shockedButton.setAttribute("class", `reaction${currentData.id} reaction`);
    shockedButton.setAttribute("value", "shocked");
    let angryButton = document.createElement("button");
    angryButton.setAttribute("class", `reaction${currentData.id} reaction`);
    angryButton.setAttribute("value", "angry");
    let sadButton = document.createElement("button");
    sadButton.setAttribute("class", `reaction${currentData.id} reaction`);
    sadButton.setAttribute("value", "sad");

    let emojiComment = document.createElement("div");  emojiComment.setAttribute("class", "emoji"); emojiComment.textContent = "💬";
    let emojiHappy = document.createElement("div");  emojiHappy.setAttribute("class", "emoji");emojiHappy.textContent = "😃";
    let emojiAmused = document.createElement("div"); emojiAmused.setAttribute("class", "emoji");emojiAmused.textContent = "😂";
    let emojiShocked = document.createElement("div"); emojiShocked.setAttribute("class", "emoji");emojiShocked.textContent = "😮";
    let emojiAngry = document.createElement("div"); emojiAngry.setAttribute("class", "emoji");emojiAngry.textContent = "😡";
    let emojiSad = document.createElement("div"); emojiSad.setAttribute("class", "emoji");emojiSad.textContent = "😢";

    let countComment = document.createElement("div"); countComment.setAttribute("class", "count"); countComment.setAttribute("id", `commentCount${currentData.id}`); countComment.textContent = 0;
    let countHappy =  document.createElement("div"); countHappy.setAttribute("class", "count"); countHappy.setAttribute("id", `happyCount${currentData.id}`); countHappy.textContent = 0;
    let countAmused = document.createElement("div"); countAmused.setAttribute("class", "count"); countAmused.setAttribute("id", `amusedCount${currentData.id}`); countAmused.textContent = 0;
    let countShocked = document.createElement("div"); countShocked.setAttribute("class", "count"); countShocked.setAttribute("id", `shockedCount${currentData.id}`); countShocked.textContent = 0;
    let countAngry = document.createElement("div"); countAngry.setAttribute("class", "count"); countAngry.setAttribute("id", `angryCount${currentData.id}`); countAngry.textContent = 0;
    let countSad = document.createElement("div"); countSad.setAttribute("class", "count"); countSad.setAttribute("id", `sadCount${currentData.id}`); countSad.textContent = 0;

    let textComment = document.createElement("div"); textComment.setAttribute("class", "text"); textComment.textContent = "comment";
    let textHappy = document.createElement("div"); textHappy.setAttribute("class", "text"); textHappy.textContent = "happy";
    let textAmused = document.createElement("div"); textAmused.setAttribute("class", "text"); textAmused.textContent = "amused";
    let textShocked = document.createElement("div"); textShocked.setAttribute("class", "text"); textShocked.textContent = "shocked";
    let textAngry = document.createElement("div"); textAngry.setAttribute("class", "text"); textAngry.textContent = "angry";
    let textSad = document.createElement("div"); textSad.setAttribute("class", "text"); textSad.textContent = "amused";


    divCard.setAttribute("id", `card_${currentData.id}`);

    divCardsContainer.appendChild(divCard);

    
      divCard.appendChild(divCardHeader);
        pCategory.setAttribute("id", `category_${currentData.id}`);
        pCategory.textContent = `Category: ${currentData.category}`;
        divCardHeader.appendChild(pCategory);
        pDate.setAttribute("id", `date_${currentData.id}`);
        pDate.textContent = currentData.dnt;
        divCardHeader.appendChild(pDate);
      divCard.appendChild(divPost);
        divPost.appendChild(p)
        console.log(currentData.entry);
        p.setAttribute("id", `post_${currentData.id}`)
        p.textContent = currentData.entry;
        divPost.appendChild(postImg);
        postImg.setAttribute("id", `${currentData.id}_postImg`);
        postImg.src = currentData.gif;

      divCard.appendChild(divReactions);
        divReactions.appendChild(commentButton);
          commentButton.appendChild(emojiComment);
          commentButton.appendChild(countComment);
          commentButton.appendChild(textComment);
        divReactions.appendChild(happyButton);  
          happyButton.appendChild(emojiHappy);
          happyButton.appendChild(countHappy);
          happyButton.appendChild(textHappy);
        divReactions.appendChild(amusedButton);  
          amusedButton.appendChild(emojiAmused);
          amusedButton.appendChild(countAmused);
          amusedButton.appendChild(textAmused);
        divReactions.appendChild(shockedButton);  
          shockedButton.appendChild(emojiShocked);
          shockedButton.appendChild(countShocked);
          shockedButton.appendChild(textShocked);
        divReactions.appendChild(angryButton);  
          angryButton.appendChild(emojiAngry);
          angryButton.appendChild(countAngry);
          angryButton.appendChild(textAngry);
        divReactions.appendChild(sadButton);  
          sadButton.appendChild(emojiSad);
          sadButton.appendChild(countSad);
          sadButton.appendChild(textSad);
      divCard.appendChild(br);
      divCard.appendChild(divComments);
      divComments.setAttribute("id", `comments_${currentData.id}`);
        divComments.appendChild(divForm);
        divForm.setAttribute("id",`${currentData.id}_commentForm`);
          divForm.appendChild(formWriteComment);
          formWriteComment.setAttribute("id", `${currentData.id}_writeComment`);
            formWriteComment.appendChild(textareaComment);
            textareaComment.setAttribute("id", `blog_${currentData.id}`);
            formWriteComment.appendChild(inputSubmit);
          
      // divCard.appendChild(divComments);


    let commentNo = currentData.comments.length;
    console.log(currentData);

    if(commentNo != 0 && commentNo < 4) {
      for (let i = commentNo - 1; i >= 0; i-- ) {
        let newDiv = document.getElementById(`comments_${currentData.id}`).appendChild(document.createElement("div"))
        newDiv.setAttribute("id", `comment${i}_${currentData.id}`)
        newDiv.setAttribute("class", `comment`)
        document.getElementById(`comment${i}_${currentData.id}`).textContent = currentData.comments[i]
      }
    } else if (commentNo > 3) {
      for (let i = commentNo - 1; i >= commentNo-3; i-- ) {
        let newDiv = document.getElementById(`comments_${currentData.id}`).appendChild(document.createElement("div"))
        newDiv.setAttribute("id", `comment${i}_${currentData.id}`)
        newDiv.setAttribute("class", `comment`)
        document.getElementById(`comment${i}_${currentData.id}`).textContent = currentData.comments[i]
      }
    }
  }
  
  // for (let id=1; id < dummyData.length+1; id++) {
    
  //   fetch(baseURL+id)
  //   .then(res => res.json())
  //   .then(data => {
  //       printData(data,id)

  //       let commentNo = data.comments.length
  //       if(commentNo != 0 && commentNo < 4) {
  //           for (let i = commentNo - 1; i >= 0; i-- ) {
  //             let newDiv = document.getElementById(`comments_${id}`).appendChild(document.createElement("div"))
  //             newDiv.setAttribute("id", `comment${i}_${id}`)
  //             newDiv.setAttribute("class", `comment`)
  //             document.getElementById(`comment${i}_${id}`).textContent = data.comments[i]
  //           }
  //         } else if (commentNo > 3) {
  //           for (let i = commentNo - 1; i >= commentNo-4; i-- ) {
  //             let newDiv = document.getElementById(`comments_${id}`).appendChild(document.createElement("div"))
  //             newDiv.setAttribute("id", `comment${i}_${id}`)
  //             newDiv.setAttribute("class", `comment`)
  //             document.getElementById(`comment${i}_${id}`).textContent = data.comments[i]
  //           }
  //         }
  //     }
  //   )
  // }
})




const profanities = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"];


// gifChange.style.display = 'none';

async function allData() {
  const data = await fetch(baseURL)
      .then(res => res.json())
      .then(data => {
          return data;
      })
      return data;
}



let dummyData = allData();

//open the comment window
for (let id=1; id < dummyData.length+1;id++) {
      commentbtn  = document.getElementById(id + "_comment-icon");
      commentbtn.addEventListener("click", function(e){
        e.preventDefault()
        const form = document.getElementById(`${id}_writeComment`);
        form.style.display = 'block';
     });
  }

//add new comment
for (let id=1; id < dummyData.length+1; id++) {
  let writeComment = document.getElementById(`${id}_writeComment`);
  writeComment.addEventListener("submit", addNewComment);
  async function addNewComment(e){
    e.preventDefault();
    let newComment = writeComment.querySelector("textarea").value
    const original = await originalData(id);
      fetch(baseURL + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            gif: original.gif,
            category: original.category,
            entry: original.entry,
            emoji: original.emoji,
            dnt: original.dnt,
            comments: [...original.comments, newComment]
        })  
      })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let i = data.comments.length
        let newDiv = document.getElementById(`comments_${id}`).appendChild(document.createElement("div"))
        newDiv.setAttribute("id", `comment${i}_${id}`)
        newDiv.setAttribute("class", `comment`)
        document.getElementById(`comment${i}_${id}`).textContent = newComment

        // printData(data,id)
        // let commentNo = data.comments.length
        // if(commentNo != 0 && commentNo < 4) {
        //   for (let i = commentNo - 1; i >= 0; i-- ) {
        //     let newDiv = document.getElementById(`comments_${id}`).appendChild(document.createElement("div"))
        //     newDiv.setAttribute("id", `comment${i}_${id}`)
        //     newDiv.setAttribute("class", `comment`)
        //     document.getElementById(`comment${i}_${id}`).textContent = data.comments[i]
        //   }
        // } else if (commentNo > 3) {
        //   for (let i = commentNo - 1; i >= commentNo-4; i-- ) {
        //     let newDiv = document.getElementById(`comments_${id}`).appendChild(document.createElement("div"))
        //     newDiv.setAttribute("id", `comment${i}_${id}`)
        //     newDiv.setAttribute("class", `comment`)
        //     document.getElementById(`comment${i}_${id}`).textContent = data.comments[i]
        //     document.getElementById(`comment${1}_${id}`).remove()
        //   }
        // }
    })}}


///updating emojicount
for (let id=1; id < dummyData.length+1; id++) {
  let emojiArray = document.querySelectorAll('.reaction'+id);
  console.log(emojiArray);

  emojiArray.forEach((element) => {
  element.addEventListener("click", updateEmoji)
})
  async function updateEmoji(e){
      e.preventDefault();
      const addedEmoji = this.value;

      const original = await originalData(id);
      original.emoji[addedEmoji]++;

      fetch(baseURL + id, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              gif: original.gif,
              category: original.category,
              entry: original.entry,
              emoji: original.emoji,
              dnt: original.dnt,
              comments: original.comments
          })
          
      })
      .then(res => res.json())
      .then(data => {
        printData(data,id)
      })
}}

  function updateCharCount(){
    let entry = postText.value
    let remaining = postText.maxLength - entry.length
    document.getElementById("remainingChar").textContent = remaining;
    return;
  }

  function postForm(e){
    e.preventDefault()
    let entry = postText.value.toLowerCase();

    profanities.forEach((word) => {
        if(postText.value.includes(word)){
            let censored = "#".repeat(word.length);
            entry = entry.replaceAll(word, censored);
        }
    });

    let censoredPost = firstLetterUpper(entry);
    console.log(censoredPost);

    const postCategory = document.getElementById("category").value
    const dateNtime = new Date().toLocaleString();
    const postGif = document.querySelector("#result img").src;

    
    fetch(baseURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            gif: postGif,
            category: postCategory,
            entry: censoredPost,
            emoji: {
                happy: 0,
                laughing: 0,
                unhappy: 0
            },
            dnt: dateNtime,
            comments: []
        }),
        
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const postIMG = document.getElementById("postIMG")
        const textEntry = document.getElementById("textEntry")
        const dateTime = document.getElementById("dateTime")

        postIMG.src = data.gif;
        textEntry.textContent = data.entry;
        dateTime.textContent = data.dnt;
    })


  }

  function firstLetterUpper(theString) {
    var newString = theString.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g,function(c){return c.toUpperCase()});
    return newString;
  }

