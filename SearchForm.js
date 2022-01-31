async function fetchCompanyProfile(query){
    const response = await fetch(`${baseUrl}search?query=${query}&limit=10&exchange=NASDAQ`)
    const companies = await response.json();
    let companyData = [];
    for(company of companies){
        if(company.symbol){
            companyData.push(await getProfileFromServer(company.symbol))
        }
    }
    console.log(companyData)
    return companyData
}

class SearchForm {
  constructor(form) {
    this.form = form;
    this.searchInput = document.createElement("div");
    this.searchInput.className = "search-input";
    this.searchInput.id = "search-input";
    this.input = document.createElement("input");
    this.input.setAttribute("id", "user-input");
    this.input.placeholder = "Enter Stock";
    this.searchInput.appendChild(this.input);
    this.searchButton = document.createElement("div");
    this.searchButton.setAttribute("id", "icon");
    this.searchButton.className = "icon";
    this.searchIcon = document.createElement("i");
    this.searchIcon.setAttribute = ("id", "search-icon");
    this.searchIcon.className = "fas fa-search";
    this.loader = document.createElement("div");
    this.loader.id = "loader";
    this.loader.className = "loader";
    this.searchButton.appendChild(this.loader);
    this.searchButton.appendChild(this.searchIcon);
    this.searchInput.appendChild(this.searchButton);
    this.form.appendChild(this.searchInput);
    this.searchIcon.addEventListener("click", () =>{
        this.doSearch()
    })
  }

  onSearch(callback) { 
    this.onSearchCallback = callback;
  }

  async doSearch() {
      this.searchIcon.classList.add("icon-loading");
      this.searchIcon.classList.remove("fas");
      this.loader.classList.add("loading");
      const companyProfile = await fetchCompanyProfile(this.input.value)
      this.searchIcon.classList.remove("icon-loading");
      this.searchIcon.classList.add("fas");
      this.loader.classList.remove("loading");
      console.log(companyProfile)
      console.log("CLICKED!");
      //introduced a new parameter to onSearchCallback, which will be accepted as a parameter to render the re
      this.onSearchCallback(companyProfile,this.input.value) 
    };
}