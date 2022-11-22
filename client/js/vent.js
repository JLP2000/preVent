const body = document.querySelector("body");
const postButton = document.querySelector("#buttonpost");
const form = document.getElementById("formpost");
const cover = document.querySelector("main.inner");
// const exitButton = document.querySelector('#exit-button');
// const sendButton = document.querySelector('#send-button');
const gifButton = document.querySelector("#giphygetbutton");
let apiKey = `a1Gm9f8gJX62owmzVfR5PddN5zDlklJ5`;
let search = document.querySelector("#search");
let gifChange = document.querySelector("#btnremove");

const baseURL = "http://localhost:3000/entries/"

async function originalData(id) {
  const data = await fetch(baseURL + id)
      .then(res => res.json())
      .then(data => {
          return data;
      })
      return data;
}

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


let data = [1,2]
//open the comment window
for (let id=1; id < data.length+1;id++) {
      commentbtn  = document.getElementById(id + "_comment-icon");
      commentbtn.addEventListener("click", function(e){
        e.preventDefault()
        const form = document.getElementById(`${id}_writeComment`);
        form.style.display = 'block';
     });
  }

//add new comment
for (let id=1; id < data.length+1; id++) {
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
    })}}

//pull original data
document.addEventListener("DOMContentLoaded", () => {
  for (let id=1; id < data.length+1; id++) {
    let data = originalData(1)
    // console.log(data.dnt)
    // document.getElementById(`${id}_date`).textContent = data.dnt;
    }});