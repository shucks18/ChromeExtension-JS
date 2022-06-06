let myLeads = []
let oldLeads = []
const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const delBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStoarage = JSON.parse( localStorage.getItem("myLeads") )
// check if leadsFromLocalStorage is truthy
if (leadsFromLocalStoarage) {
    myLeads = leadsFromLocalStoarage
    render(myLeads) 
}

function render(leads) {
    let listItems = " "
    for (let i = 0; i < leads.length; i++) {
       // listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
                </a>
            </li>`
        }
    ulEl.innerHTML = listItems
}


tabBtn.addEventListener("click", function() {

    chrome.tabs.query({active: true, currentWindow:true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})


// listen for double clicks on the delete button
delBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})


inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = " "
    render(myLeads)
    // save the myLeads array to localstorage
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
})
