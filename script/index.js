function main() {

  // Array of image URLs for different genders
  let imageUrl = ["assets/femaleChar.jpeg", "assets/maleChar.webp", "assets/amineChar.png"];
  
  let allResults = [];

  async function fetchData() {
    let request = new Request("https://swapi.dev/api/people/");
    let response = await fetch(request);
    let data = await response.json();

    allResults = allResults.concat(data.results);
    
    while (data.next !== null) {
      response = await fetch(data.next);
      data = await response.json();
      allResults = allResults.concat(data.results);
    }
   
    allResults.forEach((result) => {

      // Extracting names, heights, and genders from the results
      const names = allResults.map((result) => result.name);
      const heights = allResults.map((result) => result.height);
      const gender = allResults.map((result) => result.gender);

      let imgElement;

      function multiImg(gender) {
        // Determine the image URL based on the gender
        if (gender === "female") {
          return imageUrl[0]; // Female image URL
        } else if (gender === "male") {
          return imageUrl[1]; // Male image URL
        } else {
          return imageUrl[2]; // Default image URL for other genders
        } 
      }     

      const innerContainer = document.createElement("div");
      container.appendChild(innerContainer);
      innerContainer.style.border = ("1px solid rgb(97, 141, 229)");
      innerContainer.style.padding = ("30px");
      
      function displayImage(imageUrl) {
        imgElement = document.createElement("img");
        imgElement.style.borderRadius = "50%";
        imgElement.style.width = "100%"
        imgElement.style.height = "200px"
        imgElement.src = multiImg(result.gender); // Set the image URL based on the gender
        imgElement.style.justifyContent = "center"
        innerContainer.appendChild(imgElement);
      }
      
      displayImage(imageUrl);
      
      const button = document.createElement("button");
      button.textContent = result.name;
      innerContainer.appendChild(button);
      button.style.cursor = ('pointer')

      const flipPage = document.createElement("div")
      innerContainer.appendChild(flipPage);
      flipPage.style.display = ("none");
      flipPage.style.padding = ('50px');
      flipPage.style.backgroundColor = ("rgb(8, 33, 83)");
      flipPage.style.height = ('294px');
      flipPage.style.width = ('225px');
      flipPage.style.textAlign = ('center')
      flipPage.style.paddingBottom = ('0');

      button.addEventListener("click", () =>{
        imgElement.style.display =("none")
        flipPage.style.display =("block")
        button.style.display = ("none")
      })
      
      const holdHeightAndGender = document.createElement("div");
      flipPage.appendChild(holdHeightAndGender);
      holdHeightAndGender.style.display = ("block");
      holdHeightAndGender.style.color = ("rgb(247, 228, 19)")

      const flipName = document.createElement("h2");
      flipName.textContent = result.name;
      holdHeightAndGender.appendChild(flipName);
      flipName.style.marginTop = ('50px')

      const charHeight = document.createElement("h3");
      charHeight.textContent = "Height: " + result.height;
      holdHeightAndGender.appendChild(charHeight);
      charHeight.style.marginTop = ('40px')

      const charGender = document.createElement("h3");
      charGender.textContent =
        "Gender: " +
        result.gender.charAt(0).toUpperCase() +
        result.gender.slice(1);
      holdHeightAndGender.appendChild(charGender);
      charGender.style.marginTop = ('20px')

      const back = document.createElement('p')
      back.textContent = "<< Back" 
      holdHeightAndGender.prepend(back);
      back.style.marginTop = ('-40px')
      back.style.textAlign = ('end')
      back.style.verticalAlign = ('bottom')
      back.style.marginRight = ('-40px')
      back.style.cursor = ('pointer')

      back.addEventListener("click", () =>{
        imgElement.style.display =("block")
        flipPage.style.display =("none")
        button.style.display = ("block")
      })
    });
  }

  const container = document.getElementById("container");
  fetchData().catch((error) => {
    console.log("Error fetching data:", error);
  });
}

main();

