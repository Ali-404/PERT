let niveaux = {
    
}

function generateNiveauTable(){
    niveaux = {}
    const lastNiveau = []
    
    tasks.forEach((task,id) => {
        // N0
        if (task.preds.length <= 0 ){
            pushToNiveau(0, id)
            
        }else {
            
            // N + 1
            let predId = task.preds[0]
            if (task.preds.length > 1){
                predId = task.preds.sort((a,b) => tasks[b].duration - tasks[a].duration)[0]
                
            }
            let predNiveau = getNiveau(predId)
            if (!isTaskPredOfAnotherTask(id)){
                lastNiveau.push(id)
                
            } else {
                pushToNiveau(predNiveau + 1, id)
            }       

        }





    })

    // khod dok li f lastNiveau o ajoutiha f last 
    if (lastNiveau.length > 0){
        niveaux[Object.keys(niveaux).length] = lastNiveau
    }
    
    console.log(niveaux)
    updateNiveauxTable()
    return niveaux
}


function isTaskPredOfAnotherTask(taskID){
    return tasks.find(t => t.preds.find(p => p == taskID))
}

function getNiveau(id) {
    let n = 0; // Default niveau
    
    for (let niveau in niveaux) {
        const niveauTasks = niveaux[niveau];
        if (niveauTasks.includes(id)) {
            n = niveau;
            break;  // Exit the loop as soon as the task is found
        }
    }
    
    return Number(n);
}


function pushToNiveau(niveau, id){
    niveau = Number(niveau);
    if (!Array.isArray(niveaux[niveau])){
        niveaux[niveau] = []
    }

    niveaux[niveau].push(id)
}

function updateNiveauxTable() {
    const tbody = document.getElementById('tbody.niveaux');
    tbody.innerHTML = ``;

    Object.keys(niveaux).forEach(niveau => {
        const niveauTasks = niveaux[niveau].map(id => 
            isAlphabetic ? String.fromCharCode(65 + id) : id
        );
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>N${niveau}</td>
            <td>${niveauTasks.join(",")}</td>
        `;

        tbody.appendChild(row);
    });
}