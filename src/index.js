const inputLength = document.querySelector(".input-length");
const passwordLength = document.querySelector(".password-length")
const form = document.querySelector(".form-container");
const paragraphPassword = document.querySelector(".password");
const buttonCopy = document.querySelector(".button");
const API = "https://goquotes-api.herokuapp.com/api/v1/random?count=5";

const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
const numbers =[1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const symbols = ["'", ":", "!", "@", "#", "$", "^", ")", "&", "*", "%", "-"];

inputLength.addEventListener("input", (e) => {
  passwordLength.innerText = e.target.value;
});

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1));
}

function generatePassword(passwordLengthChosen, checkBoxChosen) {

    let arrayOfArrays = [];

    if (checkBoxChosen.letters) {
        arrayOfArrays.push(letters);
      }

    if (checkBoxChosen.numbers) {
      arrayOfArrays.push(numbers);
    }

    if (checkBoxChosen.symbols) {
      arrayOfArrays.push(symbols);
    }

    if (checkBoxChosen.words) {
      arrayOfArrays = [];
      arrayOfArrays.push(words);
    }

    let strongPassword = [];
    for (let i = 0; i < passwordLengthChosen; i++) {
      const myArr = arrayOfArrays[getRandomNumber(0, arrayOfArrays.length - 1)];
  
      const randomCharacter = myArr[getRandomNumber(0, myArr.length - 1)];
  
      strongPassword.push(randomCharacter);
    }

    if (checkBoxChosen.words) {
      strongPassword = strongPassword.join("-");
    } else {
      strongPassword = strongPassword.join("");
    }
    //paragraphPassword.value = strongPassword;
    paragraphPassword.innerText = strongPassword;

}

function fetchData(API) {
  fetch(API)
    .then((response) => response.json())
    .then((data) => {
      words = data.quotes.map((quote) => quote.text);
      words = words.join("").split(" ").sort();
    });
}

fetchData(API);

// function copyToClipboard(target) {
//   const element = document.querySelector(target);
//   const value = element.innerText;
//   if (innerText.length === 0) {
//   alert("Tienes que generar una contraseña");
//   } else {
//   window.navigator.clipboard.writeText(value);
//   alert("Copiaste la contraseña");
//   }
// }

form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("password generada")
    const formElement = event.target;
    const passwordLength = formElement.length.value;
    const checks = {
      letters: formElement.letters.checked,
      words: formElement.words.checked,
      numbers: formElement.numbers.checked,
      symbols: formElement.symbols.checked,
    };
  
    if (checks.words) {
    formElement.letters.checked = false;
    }
  
    generatePassword(passwordLength, checks);
    buttonCopy.disabled = false;
  });

  // buttonCopy.addEventListener("click", () => {
  //   copyToClipboard(".password");
  // });
  
   buttonCopy.addEventListener("click", () => {
    CopyToClipboard(".password");
    return false;
  });

  inputLength.addEventListener("input", (e) => {
    passwordLengthParagraph.innerText = e.target.value;
  });


  function CopyToClipboard(id)
  {
  const r = document.createRange();
  r.selectNode(document.querySelector(id));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  window.navigator.clipboard.writeText(r);
  window.getSelection().removeAllRanges();
  }

