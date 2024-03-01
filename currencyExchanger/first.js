const baseUrl =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const newBtn = document.querySelector("form button");
const amount = document.querySelector(".amount input");
const msg = document.querySelector(".msg p");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");


window.addEventListener("load",()=>{
    updCurrency();
})

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    select.append(newOption);
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
  }
  select.addEventListener("change", (evt) => {
    updFlags(evt.target);
  });
}

const updFlags = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};
newBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updCurrency();
});
const updCurrency=async()=>{
    let amtValue = amount.value;
    if (amtValue === "" || amtValue <= 1) {
      amtValue = 1;
      amount.value = "1";
    }

    const URL = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let rowRate = await response.json();
    let rate = rowRate[toCurr.value.toLowerCase()];
    let newAmt = amtValue * rate;
    msg.innerText = `${amtValue}${fromCurr.value}=${newAmt}${toCurr.value}`;
  
}
