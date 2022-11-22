const body = document.querySelector("body");
const postButton = document.querySelector("#buttonpost");
const form = document.getElementById("formpost");
const cover = document.querySelector("main.inner");
const postText = document.getElementById("post")

const baseURL = "http://localhost:3000/entries/"

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
  document.getElementById(`happyCount${id}`).textContent = data.emoji["happy"]
  document.getElementById(`amusedCount${id}`).textContent = data.emoji["amused"]
  document.getElementById(`shockedCount${id}`).textContent = data.emoji["shocked"]
  document.getElementById(`sadCount${id}`).textContent = data.emoji["sad"]
  document.getElementById(`angryCount${id}`).textContent = data.emoji["angry"]
  document.getElementById(`commentCount${id}`).textContent = data.comments.length
 }
 
//loading original data
window.addEventListener("load", (e) => {
for (let id=1; id < dummyData.length+1; id++) {
  fetch(baseURL+id)
  .then(res => res.json())
  .then(data => {
      printData(data,id)

      let commentNo = data.comments.length
      if(commentNo != 0 && commentNo < 4) {
          for (let i = commentNo - 1; i >= 0; i-- ) {
            let newDiv = document.getElementById(`comments_${id}`).appendChild(document.createElement("div"))
            newDiv.setAttribute("id", `comment${i}_${id}`)
            newDiv.setAttribute("class", `comment`)
            document.getElementById(`comment${i}_${id}`).textContent = data.comments[i]
          }
        } else if (commentNo > 3) {
          for (let i = commentNo - 1; i >= commentNo-4; i-- ) {
            let newDiv = document.getElementById(`comments_${id}`).appendChild(document.createElement("div"))
            newDiv.setAttribute("id", `comment${i}_${id}`)
            newDiv.setAttribute("class", `comment`)
            document.getElementById(`comment${i}_${id}`).textContent = data.comments[i]
          }
        }
    }
)}})




const profanities = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"];

postText.addEventListener('keyup', updateCharCount)
form.addEventListener('submit', postForm) 

// gifChange.style.display = 'none';



let dummyData = [1]
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
  }

  function firstLetterUpper(theString) {
    var newString = theString.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g,function(c){return c.toUpperCase()});
    return newString;
  }

