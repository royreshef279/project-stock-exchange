class SearchResult {
  constructor(result) {
    this.result = result;
    this.renderResults = (results,userInput) => { //introduced userInput parameter into renderResults, for the callback to work
      console.log(results)
      this.result.innerHTML = ``;
      results.forEach(company => {
        console.log(JSON.stringify(company.symbol))
        console.log(typeof company.symbol)
        const li = document.createElement("li")
        li.id = `li-${company.symbol}`;
        li.innerHTML = `<img src="${company.profile.image}"/>
        <p id="id-${company.symbol}">${company.symbol}</p> <a id="link-${company.symbol}" href="/company.html?symbol=${company.symbol}">${company.profile.companyName}</a></p>
        <p>$${company.profile.price}</p>
        <span>(${company.profile.changesPercentage}%)</span> 
        `
        if(company.profile.changesPercentage < 0){
          li.classList.add("company-price-info-minus")
        } else {
          li.classList.add("company-price-info-plus")
        }
        this.result.appendChild(li)
        //calling the highlightText function which will accept the input from the renderResults method and an element
        higlightText(userInput,document.getElementById(`id-${company.symbol}`)) 
        higlightText(userInput,document.getElementById(`link-${company.symbol}`))
        console.log(this.result)
      });
    }
  }
}






