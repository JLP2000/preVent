//For the sort by button at the top


async function getAllPosts(order) {
    sectionArray = [];
    try {    
        const getPost = await fetch('http://localhost:3000/')
        const res = await getPost.json();
        res.forEach(data => {
            const section = document.createElement("section");
            let form = document.createElement("form");
            overallSection(form, data, section,sectionArray)
        })
    } catch (error) {
        console.log(error)
    }
    
    const div = document.querySelector("#ventingsomething")
    
    let s2 = sectionArray;
    if (order == "All"){
        s2 = sectionArray.sort(compareAlpha)
        while(div.firstChild){
            div.removeChild(div.firstChild);
        }
    }  else if(order = "Latest"){
        s2 = sectionArray
        while(div.firstChild){
            div.removeChild(div.firstChild);
        }
    }
      
    for (var i = 0; i <s2.length; i++) {
        div.append(s2[i])
        document.body.append(div)
    }
}
function sortByProperty(array, propertyName) {
    return array.sort(function (a, b) {
        return b.querySelector("."+propertyName).textContent.toLowerCase() - a.querySelector("."+propertyName).textContent.toLowerCase();
    });
}
function compareAlpha(a,b) {       
    let a1 = a.querySelector("h2").textContent.toLowerCase()
    let b1 = b.querySelector("h2").textContent.toLowerCase()
    if (a1 < b1){
        return -1;
    }
    if (a1 > b1){
        return 1;
    }
    return 0;
}

function overallSection(form, data, section,anArray) {
    let h2 = document.createElement("h2");
    h2.textContent = `${data.title}`;
    
    let h5 = document.createElement("h5");
    h5.textContent = `Posted: ${data.date.slice(5,-7)}`;

    let button = document.createElement("button");
    button.textContent = "Show punchline";
    button.setAttribute("class", "button green-button")

    let h3 = document.createElement("h3");
    let img = document.createElement("img");

    button.addEventListener('click', (e) => {
        e.preventDefault();
        showPunchline(data, h3, img, button)
        commentSection(form, data, section)
    })

    section.append(h2);
    section.append(button)
    section.append(h3);
    section.append(img);
    section.append(h5);
    anArray.push(section)
}