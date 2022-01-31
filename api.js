const baseUrl =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";

async function getQueryFromServer(userClickedInput) {
  const response = await fetch(
    `${baseUrl}search?query=${userClickedInput}&limit=10&exchange=NASDAQ`
  );
  data = await response.json();
  if (data === []) {
    return;
  }
  console.log(userClickedInput);
  console.log(data);
  return data;
}

async function getProfileFromServer(symbol) {
  const response = await fetch(`${baseUrl}company/profile/${symbol}`);
  const data = await response.json();
  console.log(symbol);
  console.log(data);
  return data;
}

async function getMarqueeInfoFromServer(symbol) {
  const response = await fetch(`${baseUrl}quote/${symbol}`);
  const data = await response.json();
  console.log(symbol);
  console.log(data);
  return data;
}

async function higlightText(userInput, paragraph) { //function that accepts a string and an HTML element
  //gi == global case-insensitive, the class constructor takes a string and a modifier and converts the string into RegExp
  let pattern = new RegExp(`${userInput}`,"gi"); //RegExp = regular expressions, basically a pattern of characters
  console.log(pattern) //for instance, if we search apple, this object creates a RegEx with value /apple/gi
  paragraph.innerHTML = paragraph.textContent.replace(pattern, match => `<mark>${match}</mark>`) 
  //replace takes the regex instance and an arrow function, which inputs the match and returns the updated HTML
}


