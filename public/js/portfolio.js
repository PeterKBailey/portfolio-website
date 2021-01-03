let currentIndex = 0;
let projects = [];

function init(){
    let prevButton = document.getElementById("prev");
    let nextButton = document.getElementById("next");
    getImgNames(prevButton, nextButton);
}
/*
    Purpose: Make an AJAX request for the information on my projects
             and set the handlers for the buttons once the JSON is recieved
      Input: prevButton DOM object representing an HTML button
      Input: nextButton DOM object representing an HTML button
     Output: projects array parsed from the JSON recieved
*/
function getImgNames(prevButton, nextButton){
    let xhttp = new XMLHttpRequest();
   
    xhttp.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
            projects = JSON.parse(this.responseText);
            prevButton.onclick = loadPrev;
            nextButton.onclick = loadNext;
        }
    }

    console.log(window.location.href);
    xhttp.open("GET", window.location.href, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send();
}

/*
    Purpose: Handle the clicking of the "previous" button by displaying the previous project
     Output: updated DOM
*/
function loadPrev(){
    currentIndex = fixIndex(--currentIndex);
    let name = projects[currentIndex].fileName;
    placeGif(name);
    changeTitle();
    changeLink();
}

/*
    Purpose: Handle the clicking of the "next" button by displaying the next project
     Output: updated DOM
*/
function loadNext(){
    currentIndex = fixIndex(++currentIndex);
    let name = projects[currentIndex].fileName;
    placeGif(name);
    changeTitle();
    changeLink();
}

/*
    Purpose: Update the page to display the correct div
     Output: updated DOM
*/
function placeGif(name){
    let imgDiv = document.getElementById("currentImage");
    imgDiv.innerHTML = "";

    let img = document.createElement("img");
    img.id = "displayImg"
    img.src = "/images/" + name;
    img.className = "gif"

    imgDiv.appendChild(img);
}

/*
    Purpose: Loop the index of the projects array to the other end if it has gone too far
      Input: currentIndex number with the index of the project to display
     Return: A proper index value
*/
function fixIndex(currentIndex){
    if(currentIndex >= projects.length){
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = projects.length-1;
    }
    return currentIndex;
}

/*
    Purpose: Change the title on the page to the current project
     Output: updated DOM
*/
function changeTitle(){
    let title = document.getElementById("title");
    title.innerHTML = projects[currentIndex].projectName;
}

/*
    Purpose: Change the link on the title to the projects github link
     Output: updated DOM
*/
function changeLink(){
    let gitlink = document.getElementById("githubLink");
    gitlink.setAttribute("href", projects[currentIndex].githubLink);
}