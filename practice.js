function higlightText(userInput, paragraph) {
    userInput = userInput.replace(/ [.*+ ? ^ $ { } ( ) | [\]\\]/g,"\\$&");
    let pattern = new RegExp(`${userInput}`,"gi");
    paragraph.innerHTML = paragraph.textContent.replace(pattern, match => `<mark>${match}</mark>`)
  }

  const p = document.getElementById("p-tag")
  higlightText("th",p)
  