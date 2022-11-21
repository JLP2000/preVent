const sterling= document.getElementById("sterling");
const bellingham = document.getElementById("bellingham")
const taremi = document.getElementById("taremi")

sterling.addEventListener("submit", createPost);
bellingham.addEventListener("submit", getGIF)
taremi.addEventListener("submit", updateComment)

let chosenGif;

function createPost(e){
    e.preventDefault();
    const textInput = document.getElementById("saka").value
    const postCategory = document.getElementById("category").value
    const dateNtime = new Date().toLocaleString();
    
    fetch(`http://localhost:3000/entries`, {
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
        textEntry.textContent = data.entry
        dateTime.textContent = data.dnt;
    })
}

function getGIF(e){
    e.preventDefault();
    console.log("hi")
    const giftext = document.getElementById("grealish").value

    const img = document.getElementById("gif")
    const img1 = document.getElementById("gif1")
    const img2 = document.getElementById("gif2")
    const img3 = document.getElementById("gif3")
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=jc1MD03aGjl2Ubo8wHsLEVl7FfDDB5R6&limit=4&q="${giftext}"`)
    .then((res) => res.json())
    .then((data) => {
        const gifURL = data.data[0].images.original.url
        const gifURL1 = data.data[1].images.original.url
        const gifURL2 = data.data[2].images.original.url
        const gifURL3 = data.data[3].images.original.url

        img.setAttribute("src", gifURL)
        img1.setAttribute("src", gifURL1)
        img2.setAttribute("src", gifURL2)
        img3.setAttribute("src", gifURL3)
    })

    img.addEventListener("click", chooseGIF)
    img1.addEventListener("click", chooseGIF)
    img2.addEventListener("click", chooseGIF)
    img3.addEventListener("click", chooseGIF)
}

function chooseGIF(){
    chosenGif = this.src;
    console.log(chosenGif)
}


function updateComment(e){
    e.preventDefault();
    const comment = document.getElementById("comment").value;
    const id = document.getElementById("entryID").textContent;

    fetch(`http://localhost:3000/entries/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            gif: this.gif,
            category: this.category,
            entry: this.entry,
            emoji: this.emoji,
            dnt: this.dnt,
            comments: []
        })
        
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
}
