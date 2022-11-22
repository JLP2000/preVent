const sterling= document.getElementById("sterling");
const taremi = document.getElementById("taremi")

sterling.addEventListener("submit", createPost);
taremi.addEventListener("submit", updateComment)

let chosenGif;
const baseURL = "http://localhost:3000/entries/"
async function originalData(id) {
    const data = await fetch(baseURL + id)
        .then(res => res.json())
        .then(data => {
            return data;
        })
        return data;
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
        textEntry.textContent = data.entry
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

