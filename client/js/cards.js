// let btn = document.getElementById(`1_comment-icon`);

// btn.addEventListener('click', () => {
//         const form = document.getElementById(`1_writeComment`);
//         console.log(`1 button was clicked`)
//           form.style.display = 'block';
//        } );

// let btn2 = document.getElementById(`2_comment-icon`);

// btn2.addEventListener('click', () => {
//         const form = document.getElementById(`2_writeComment`);
//         console.log(`2 button was clicked`)
//           form.style.display = 'block';
//        } );

let data = [1,2,3]

for (let i=1; i < data.length+1;i++) {
     btn  = document.getElementById(i + "_comment-icon");
     btn.addEventListener("click", function(e){
        e.preventDefault()
        const form = document.getElementById(`${i}_writeComment`);
        console.log(`${i} button was clicked`)
        form.style.display = 'block';
   });
}