let isAlphabetic = false;

// let tasks = [
//    {
//      content: "A",
//      duration: 1,
//      preds: []
//    },
//    {
//     content: "B",
//     duration: 1,
//     preds: [0]
//   },
//   {
//     content: "C",
//     duration: 1,
//     preds: [0]
//   },
//   {
//     content: "D",
//     duration: 2,
//     preds: [2]
//   },
//   {
//     content: "E",
//     duration: 2,
//     preds: [1,3]
//   },
//   {
//     content: "F",
//     duration: 1,
//     preds: [3]
//   },
//   {
//     content: "G",
//     duration: 6,
//     preds: [5]
//   },
//   {
//     content: "H",
//     duration: 10,
//     preds: [4,5]
//   },
//   {
//     content: "I",
//     duration: 2,
//     preds: [6,7]
//   },
// ]

let tasks = []

function toggleIndexDisplay() {
    isAlphabetic = !isAlphabetic;  // Toggle the display mode

    // Update button text based on the current mode
    const toggleButton = document.getElementById('toggleButton');
    toggleButton.textContent = isAlphabetic ? 'Switch to Numbers' : 'Switch to Alphabets';

    // Update the table, form select, and niveaux table
    updateTable();
    loadSelect();
    updateNiveauxTable();
}



function loadSelect() {
    const select = document.getElementById("select.predecessor");

    // Clear previous options
    select.innerHTML = `<option value="" disabled>-</option>`;

    // Add new options from the tasks array
    tasks.map((_, id) => {
        const option = document.createElement("option");

        // Convert index to alphabet if alphabetic mode is enabled
        const indexDisplay = isAlphabetic ? String.fromCharCode(65 + id) : id;
        
        option.value = id;  // Always use numeric ID as value
        option.innerText = indexDisplay;
        select.appendChild(option);
    });

    // Reinitialize the Materialize select
    M.FormSelect.init(select);
}


function onFormSubmit(){
    const contentEl = document.getElementById("input.taskName")
    if (contentEl.value.trim().length <= 0){
        alert("S'il vous plait Saisir une tache valide!")
        loadSelect()
        return 
    }

    if (tasks.find(t => t.content.trim().toLowerCase() === contentEl.value.trim().toLowerCase()) ){
        alert("Cette tache est deja ajoutee dans la liste !")
        loadSelect()
        return 
    }
    

    const selectEl = document.getElementById("select.predecessor")
    const instance = M.FormSelect.getInstance(selectEl);

    const duration = document.getElementById("input.duration").value ?? 1

    // selectEl.selectedOptions
    
    createTask(contentEl.value,Number(duration), [...instance.getSelectedValues()])

}


function createTask(taskContent,duration, taskPreds){
    let id = tasks.length
    tasks.push({
        content: taskContent,
        duration: duration,
        preds: taskPreds
    })

    loadSelect()

    updateTable()
    return id

}


function deleteTask(taskID){
    tasks = tasks.filter((_,id) => id != taskID)
    loadSelect()
    updateTable()
}
function updateTable() {
    const table = document.getElementById("tbody.tasks");
    table.innerHTML = ``;

    tasks.forEach((task, id) => {
        const row = document.createElement("tr");

        // Convert index to alphabet if alphabetic mode is enabled
        const indexDisplay = isAlphabetic ? String.fromCharCode(65 + id) : id;

        row.innerHTML = `
            <th>${indexDisplay}</th>
            <td style="width:60%">${task.content}</td>
            <td>${task.duration} Jour</td>
            <td>${task.preds.length > 0 ? task.preds.join(",") : "-"}</td>
            <td><button onclick="deleteTask(${id})" class="btn waves-effect btn-flat">🧺</button></td>
        `;

        table.appendChild(row);
    });

    // Update the buttons and visibility
    document.getElementById("button.generate").disabled = tasks.length <= 0;
    document.getElementById("div.info").classList.toggle("disabled", tasks.length <= 0);
}


// on start

updateTable()
loadSelect()