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
