//Filter Categories
const relationshipsFilter = document.getElementById("relationships")
const schoolFilter = document.getElementById("school")
const familyFilter = document.getElementById("family")

const categoryURL = "http://localhost:3000/entries/category/"

// Run through event listeners to listen for a 'click'
const filterItems = document.querySelectorAll(".filter");
filterItems.forEach((item) => {
  item.addEventListener("click", filterCategory)
})

// Remove cards currently on display and load up only cards with the chosen category
async function filterCategory(){
    let category = this.getAttribute("value")
    let data = await getCategory(category)
  
    const divCardsContainer = document.getElementById("cardContainer")
    while(divCardsContainer.querySelector('.card')){
      divCardsContainer.querySelector('.card').remove()
    }
  
    loadAll(data);
  }
  
  // Get entries with the chosen category from dataset
  async function getCategory(category){
      let data = await fetch(categoryURL + category)
          .then(res => res.json())
          .then(data => {
            return data;
          })
          return data;
  }

