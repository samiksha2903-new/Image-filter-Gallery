const barIcon = document.querySelector(".iconBar");
const themeIcon = document.querySelector(".themeIcon");
const showBtn = document.querySelector(".showMore");
const form = document.querySelector("form");
const input = document.querySelector("input");
const searchBtn = document.querySelector(".searchBtn");
const imageSection = document.querySelector(".image-section");
const imgCard = document.querySelectorAll(".img-card");
const container1 = document.querySelector(".container1");
const body = document.querySelector("body");
let mode = "light";

themeIcon.addEventListener("click", () => {
  if (mode === "light") {
    mode = "dark";
    document.body.classList.add("dark");
    document.body.classList.remove("light");
  } else {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    mode = "light";
  }
});

barIcon.addEventListener("click", () => {
  location.reload();
});

let page = 1;

let previousInput = "";

const accessKey = "U9aIOB-LfnPW8V8jmu2kG3F9XO03G5BDm6Gm_lDVqEU";

function checkQueryExistence(data, query) {
  // Assuming the data is an array of objects and we are searching for a specific key
  return data.some(item => item.key === query);  // Replace 'key' with the relevant key in your data
}

async function searchImage() {
  try {
  
  const searchText = input.value;
  if (previousInput !== "" && searchText !== previousInput) {
    imageSection.innerHTML = "";
    page = 1;
  }

  previousInput = searchText;

  const reqUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${searchText}&client_id=${accessKey}`;
  const responseData = await fetch(reqUrl);
  const data = await responseData.json();
  const results = data.results;

  if (checkQueryExistence(results, responseData)) {
    console.log(`The query '${searchText}' exists in the data.`);
} else {
    console.log(`The query '${searchText}' does not exist in the data.`);
}

  if (page === 1) {
    imageSection.innerHTML = "";
  }

  results.map((element) => {
    console.log(element.alt_description);
    let newEle = document.createElement("div");
    newEle.classList.add("img-card");

    let newImg = document.createElement("img");
    const imgLinks = element.urls;
    const imgPicLink = imgLinks.small;
    newImg.setAttribute("src", imgPicLink);
    newImg.alt = element.alt_description;
    console.log(element);

    let newAnchor = document.createElement("a");
    newAnchor.innerHTML = element.alt_description;
    newAnchor.href = element.links.html;

    newEle.appendChild(newImg);
    newEle.appendChild(newAnchor);
    imageSection.appendChild(newEle);

    form.style.marginBlock = "0rem 0.5rem";

    newImg.addEventListener("click", (e) => {
      const imageLink = e.target.src;
      console.log(imageLink);
      const newDiv = document.createElement("div");
      const newIf = document.createElement("i");
      newIf.textContent = "X";
      const newImgEle = document.createElement("img");

      newImgEle.src = imageLink;

      newDiv.classList.add("newDiv");
      newIf.classList.add("xCross");
      newImgEle.classList.add("newImgEl");

      body.appendChild(newDiv);
      newDiv.appendChild(newIf);
      newDiv.appendChild(newImgEle);

        container1.style.backgroundColor = "black";
        container1.style.opacity = "0.9";

        newIf.addEventListener("click", () => {

        container1.style.backgroundColor = "inherit";
        container1.style.opacity = "1";
        
      body.removeChild(newDiv);
      newDiv.removeChild(newIf);
      newDiv.removeChild(newImgEle);
      })
    });
  });

  page++;
  if (page > 1) {
    showBtn.style.display = "block";
  }

} catch (error) {
  console.log("error occured!");
  // const msg = document.createElement("p");
  // msg.textContent = "Something went wrong! or Data does not exists!"
}
}
searchBtn.addEventListener("click", searchImage);

showBtn.addEventListener("click", searchImage);