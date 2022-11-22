const body = document.querySelector("body");
const postButton = document.querySelector("#buttonpost");
const form = document.getElementById("formpost");
const cover = document.querySelector("main.inner");
const postText = document.getElementById("post")
// const exitButton = document.querySelector('#exit-button');
// const sendButton = document.querySelector('#send-button');
const gifButton = document.querySelector("#giphygetbutton");
let apiKey = `a1Gm9f8gJX62owmzVfR5PddN5zDlklJ5`;
let search = document.querySelector("#search");
let gifChange = document.querySelector("#btnremove");


const profanities = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"];

postText.addEventListener('keyup', updateCharCount)
form.addEventListener('submit', postForm) 

// gifChange.style.display = 'none';
gifButton.addEventListener('click', (e) =>{
    e.preventDefault()
    // gifChange.style.display ='block'
    giphyapipleasework();
})

function giphyapipleasework(){
    fetch(`https://api.giphy.com/v1/gifs/search?q=${search.value}&api_key=${apiKey}&rating=pg&limit=8`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let results = document.querySelector("#results");
        let result = document.querySelector("#result");
        data.data.forEach((obj) =>{
            console.log(obj.images.downsized.url)
            let img = document.createElement("img")
            img.style.width = "60px";
            img.style.height = '45px';
            let body = document.querySelector("body")
            img.src = obj.images.original.url
            img.alt =  obj.title

            results.append(img)
            function addGif(e){ 
                result.style.display ='block'
                e.preventDefault()
                let newImg = img
                result.append(newImg)
                results.style.display = 'none'
            }
            

            img.addEventListener('click', addGif)
            let remove = document.querySelector('#btnremove')
            remove.addEventListener('click', (e) =>{
                e.preventDefault()
                if(result.contains(img)){
                    result.style.display = 'none'
                    result.removeChild(img)
                    results.style.display = 'flex'
                    results.append(img)
                }  
            })
        })
        search.value = ''
    })
}


document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const button = document.getElementById("newquotebutton")
    // const button = document.querySelector("button");
    const quote = document.querySelector("blockquote p");
    const cite = document.querySelector("blockquote cite");
  
    async function updateQuote() {
      // Fetch a random quote from the Quotable API
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      if (response.ok) {
        // Update DOM elements
        quote.textContent = data.content;
        cite.textContent = data.author;
      } else {
        quote.textContent = "An error occured";
        console.log(data);
      }
    }
    // Attach an event listener to the `button`
    button.addEventListener("click", updateQuote);
    // call updateQuote once when page loads
    updateQuote();
  });

  function updateCharCount(event){
    let entry = postText.value
    let remaining = postText.maxLength - entry.length
    document.getElementById("remainingChar").textContent = remaining;

    // console.log(event)
    // console.log(event.key)
    // if(inputHistory.length < 23) {
    //     if(event.key != "Backspace"){
    //         inputHistory.push(entry[entry.length-1].toLowerCase())
    //     }
    //     else{
    //         inputHistory.pop()
    //     }
    // }
    // else {
    //     if(event.key != "Backspace"){
    //         inputHistory.push(entry[entry.length-1].toLowerCase())
    //         inputHistory.shift()
    //     }
    //     else{
    //         inputHistory.pop()
    //     }
    // }
    // console.log(inputHistory)

    return;
  }

  function postForm(e){
    e.preventDefault()
    let entry = postText.value.toLowerCase();

    for (let i = 0; i < profanities.length; i++){
        if(postText.value.includes(profanities[i])){
            let censored = '';
            for(let j = 0; j<profanities[i].length; j++){
                censored += '#' 
            }
            entry = entry.replaceAll(profanities[i], censored)
            
        }
    }

    let censoredPost = firstLetterUpper(entry);

    console.log(censoredPost);
  }

  function firstLetterUpper(theString) {
    var newString = theString.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g,function(c){return c.toUpperCase()});
    return newString;
  }
