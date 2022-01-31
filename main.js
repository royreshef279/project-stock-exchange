let marquee = document.getElementById("marquee");
const searchButton = document.getElementById("search-icon");
const userInput = document.getElementById("user-input");
const searchResults = document.getElementById("search-results");
const loader = document.getElementById("loader");
const marqueeWidth = 80;
const marqueeElementWidth = 16;
const clonedElements = marqueeWidth / marqueeElementWidth;


searchButton.addEventListener("click", async () => {
  searchResults.style.display = "none";
  searchButton.classList.remove("fas");
  loader.classList.add("loading");
  searchResults.innerHTML = "";
  let userValue = userInput.value;
  console.log(userValue);
  serverData = await getQueryFromServer(userValue);
//   console.log(serverData[0].symbol);
  console.log(`data from server: ` + serverData);
  console.log(serverData.length);
  searchResults.classList.remove("error");
  if (serverData.length === 0){
      const errorResult = document.createElement("li");
      const errorMessage = document.createTextNode("Stock not found");
      errorResult.append(errorMessage);
      searchResults.append(errorResult);
      searchResults.classList.add("error");
  }
  for (let i = 0; i < 10; i++) {
    if (i >= serverData.length) {
        break;
      }
    console.log(serverData[i].symbol);
    const companyProfile = await getProfileFromServer(serverData[i].symbol);
    if (Object.keys(companyProfile).length === 0) {
        continue;
      }
    console.log(Object.keys(companyProfile).length === 0);
    let companyResult = document.createElement("li");
    let companyPrice = document.createElement("p");
    let companyPercentage = document.createElement("span");
    if (companyProfile.profile.changesPercentage < 0 ) {
          companyResult.classList.add("company-price-info-minus");
      } else {
          companyResult.classList.add("company-price-info-plus");
      }
    let companyImage = document.createElement("img");
    companyResult.setAttribute("id", `result-${serverData[i].symbol}`);
    companyImage.setAttribute("src", `${companyProfile.profile.image}`);
    companyPriceText = document.createTextNode(
      `$${companyProfile.profile.price}`
    );
    companyPrice.appendChild(companyPriceText);
    companyChangePercentText = document.createTextNode(
      `(${companyProfile.profile.changesPercentage}%)`
    );
    companyPercentage.appendChild(companyChangePercentText);
    let companySiteLink = document.createElement("a");
    companySiteLink.setAttribute(
      "href",
      `/company.html?symbol=${serverData[i].symbol}`
    );
    let searchResultText = document.createTextNode(
      `${serverData[i].symbol} - ${serverData[i].name}`
    );
    companyResult.appendChild(companyImage);
    companySiteLink.appendChild(searchResultText);
    companyResult.appendChild(companySiteLink);
    companyResult.appendChild(companyPrice);
    companyResult.appendChild(companyPercentage);
    searchResults.appendChild(companyResult);
  }
  searchResults.style.display = "flex";
  loader.classList.remove("loading");
  searchButton.classList.add("fas");
});

//              ------Milestone 5 Marquee-------

//  ------Milestone 5 Marquee-------



//              ------Milestone 4 Marquee-------

// async function getSymbolsFromServer() {
//   for (let i = 0; i < marqueeArrayStock.length; i++) {
//     url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote/${marqueeArrayStock[i]}`;
//     console.log(url);
//     const response = await fetch(url);
//     let data = await response.json();
//     console.log(data);
//     let li = document.createElement("li");
//     li.setAttribute("id", `marquee-${marqueeArrayStock[i]}`);
//     let companyPrice = document.createElement("p");
//     let companyPercentage = document.createElement("span");
//     let marqueeStockText = document.createTextNode(
//       `${JSON.stringify(data[0].symbol)} $${JSON.stringify(data[0].price)}`
//     );
//     let marqueePercentageText = document.createTextNode(
//       `(${JSON.stringify(data[0].changesPercentage)}%)`
//     );
//     companyPrice.appendChild(marqueeStockText);
//     companyPercentage.appendChild(marqueePercentageText);
//     li.appendChild(companyPrice);
//     li.appendChild(companyPercentage);
//     marqueeContent.appendChild(li);
//     if (data[0].changesPercentage < 0) {
//       document
//         .getElementById(`marquee-${marqueeArrayStock[i]}`)
//         .classList.add("company-price-info-minus");
//     } else {
//       document
//         .getElementById(`marquee-${marqueeArrayStock[i]}`)
//         .classList.add("company-price-info-plus");
//     }
//     marqueeContent.classList.add("marquee-content-uploaded");
//   }
// }
// getSymbolsFromServer()
// let marqueeArrayStock = [
    //   "AAPL",
    //   "MSFT",
    //   "F",
    //   "O",
    //   "AMC",
    //   "AMZN",
    //   "TSLA",
    //   "SEDG",
    //   "FB",
    //   "GOOGL",
    //   "WMT",
    //   "AA",
    //   "PG",
    // ];
    
    // function makeCloneArray(array) {
    //   for (let i = 0; i < clonedElements; i++) {
    //     array.push(array[i]);
    //   }
    //   console.log(array);
    // }
    
    // makeCloneArray(marqueeArrayStock);