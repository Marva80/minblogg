function openTab(evt, tnamn){

    let tabcontent = document.querySelectorAll(".tabcontent");
    tabcontent.forEach(section => section.style.display = "none");

    let tablinks = document.querySelectorAll(".tablink");
    tablinks.forEach(button => button.classList.remove("active"));

    document.getElementById(tnamn).style.display ="block";

    evt.currentTarget.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("home").style.display= "block";
    loadLatestPosts();
    
});

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const titel = document.getElementById("titel").value;
    const namn = document.getElementById("namn").value;
    const innehåll = document.getElementById("innehåll").value;
    
    if(!titel || !namn || !innehåll){
        alert("Alla fälr måste vara ifyllda");
        return;
    }

    const newPost = {
        titel,
        namn,
        innehåll,
        date: new Date().toLocaleDateString()
    };

    let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];

    posts.unshift(newPost);

    if (posts.length > 5) {
        posts = posts.slice(0,5);
    }

    localStorage.setItem("blogPosts" , JSON.stringify(posts))

    loadLatestPosts();

    form.reset();
});

function loadLatestPosts(){
    const senasteCont = document.getElementById("senaste-posts");
    senasteCont.innerHTML="";

    const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];

    if(posts.length === 0){
        senasteCont.innerHTML="<p>Inga inlägg</p>";
        return;
    }


    posts.forEach((post) => {
        const postElement =document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
        <h3>${post.titel}</h3>
            <p><strong>Av:</strong> ${post.namn} | <em>${post.date}</em></p>
            <p>${post.innehåll}</p>
            <hr>
        `;
        senasteCont.appendChild(postElement);
    });
 }