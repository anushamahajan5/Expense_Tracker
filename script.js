const balance=document.getElementById("balance")
const money_positive=document.getElementById("money-earn")
const money_negative=document.getElementById("money-lost")
const form=document.getElementById("form")
const list=document.getElementById("list")
const text=document.getElementById("text")
const amount=document.getElementById("number")


const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

// const dummy=[
//     {id:1 ,text:"Clothes From Myntra",amount:-1236},
//     {id:2 ,text:"Food From Swiggy",amount:560},
//     {id:3, text:"Article Writing contest won", amount:9000}
// ];

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
function addTransaction(e) {
  e.preventDefault();

  var textElement = document.getElementById('text');
  var amountElement = document.getElementById('Amount');

  if (!textElement || !amountElement) {
    console.error("Text or amount elements not found in the DOM.");
    return;
  }

  if (textElement.value.trim() === '' || amountElement.value.trim() === '') {
    alert('Please add text and amount.');
  } else {
    const transaction = {
      id: generateId(),
      text: textElement.value,
      amount: +amountElement.value
    };

    transactions.push(transaction);

    addTransactionInDoc(transaction);
    updatevalues();
    updateLocalStorage();
    
    textElement.value = '';
    amountElement.value='';
  }
}
function generateId(){
    return Math.floor(Math.random()*1000000000)
}
function addTransactionInDoc(transaction){
    let sign="+";
    if(transaction.amount<0) sign="-";
    else sign="+";

    const item=document.createElement("li");
    item.classList.add(
        transaction.amount<0?"lost":"earn"
    )

    item.innerHTML=`
     ${transaction.text} <span>${sign}  Rs.${Math.abs(transaction.amount)}</span> 
     <button class="dlt-item" onclick="removeTransaction(${transaction.id})"> X</button>
    `;

    list.appendChild(item)
}
function removeTransaction(id){
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  Init();
}
function updatevalues(){
    const amounts = transactions.map(
        (transaction) => transaction.amount
    );
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter((item) => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    
    const expense =
    (amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0) *
    -1).toFixed(2);

    balance.innerText=`Rs ${total}`;
    money_positive.innerText = `Rs ${income}`;
    money_negative.innerText = `Rs ${expense}`;
}
function updateLocalStorage(){
  localStorage.setItem('transactions',JSON.stringify(transactions));
}
function Init(){
    list.innerHTML="";
    transactions.forEach(addTransactionInDoc);
    updatevalues();
}
Init();
form.addEventListener('submit',addTransaction);