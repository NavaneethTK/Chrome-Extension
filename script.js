let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

// TO CONVERT THE STRING TO ARRAY
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    // TO CONVERT THE ARRAY TO STRING
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

// TO SHOW THE SAVED ELEMENT
function render(leads) {
  let listItems = " ";
  for (i = 0; i < leads.length; i++) {
    listItems += `<li>
                      <a target='_blank' href='${leads[i]}'>
                      ${leads[i]} 
                  </li>`;
  }
  ulEl.innerHTML = listItems;
}

// TO PUSH THE VALUE TO THE LOCAL STORAGE
inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

// TO DELETE THE STORED VALUE IN LOCAL STORAGE
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
