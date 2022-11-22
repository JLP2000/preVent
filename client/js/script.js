const sterling= document.getElementById("sterling");
const taremi = document.getElementById("taremi")
sterling.addEventListener("submit", createPost);
taremi.addEventListener("submit", updateComment)
let chosenGif;
const bellingham = document.getElementById("bellingham")
const baseURL = "http://localhost:3000/entries/"

bellingham.addEventListener("submit", giphyapipleasework)
let apiKey = `a1Gm9f8gJX62owmzVfR5PddN5zDlklJ5`;

function giphyapipleasework(e){
    e.preventDefault();
    console.log("hi")
    const giftext = document.getElementById("grealish").value;

    const img = document.getElementById("gif");
    const img1 = document.getElementById("gif1");
    const img2 = document.getElementById("gif2");
    const img3 = document.getElementById("gif3");
    fetch(`https://api.giphy.com/v1/gifs/search?q=${giftext}&api_key=${apiKey}&rating=pg&limit=4"`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        
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
                results.style.display = 'none';
                chooseGIF();
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

    //     const gifURL = data.data[0].images.original.url
    //     const gifURL1 = data.data[1].images.original.url
    //     const gifURL2 = data.data[2].images.original.url
    //     const gifURL3 = data.data[3].images.original.url

    //     img.setAttribute("src", gifURL)
    //     // img1.setAttribute("src", gifURL1)
    //     // img2.setAttribute("src", gifURL2)
    //     // img3.setAttribute("src", gifURL3)


    // img.addEventListener("click", chooseGIF)
    // // img1.addEventListener("click", chooseGIF)
    // // img2.addEventListener("click", chooseGIF)
    // // img3.addEventListener("click", chooseGIF)
}

function chooseGIF(){
    chosenGif = this.src;
    console.log(chosenGif)
}



function createPost(e){
    e.preventDefault();
    const textInput = document.getElementById("saka").value
    const postCategory = document.getElementById("category").value
    const dateNtime = new Date().toLocaleString();
    
    fetch(baseURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            gif: chosenGif,
            category: postCategory,
            entry: textInput,
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

async function updateComment(e){
    e.preventDefault();
    const comment = document.getElementById("comment").value;
    const id = document.getElementById("entryID").textContent;

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
            comments: [...original.comments, comment]
        })
        
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
}

let emojiArray = document.querySelectorAll(".emojiBtn");
console.log(emojiArray);

emojiArray.forEach((element) => {
    element.addEventListener("click", updateEmoji)
})

async function updateEmoji(e){
    e.preventDefault();
    const addedEmoji = this.value;
    const id = document.getElementById("entryID").textContent;

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
        console.log(data)
    })
}

async function originalData(id) {
    const data = await fetch(baseURL + id)
        .then(res => res.json())
        .then(data => {
            return data;
        })
        return data;
}