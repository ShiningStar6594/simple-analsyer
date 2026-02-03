const nameInputs = document.getElementsByClassName("sector-name");
const weightInputs = document.getElementsByClassName("sector-weight");
const button = document.getElementById("runBtn"); const target = document.getElementById("target");
const shock = document.getElementById("shock");
const add = document.getElementById("addSectorBtn");const del = document.getElementById("deleteSectorBtn");
const container = document.getElementById("portfolio-inputs");
const impact = document.getElementById("resultText"); const recommendation = document.getElementById("adviceText");
const threshold = 5;const re = document.getElementById("resetBtn");

function getshockvalue(w,s){
    return (w*s) /100 ;
}

container.addEventListener("input", function(e) {
    if (e.target.classList.contains("sector-weight")) {
        let value = Number(e.target.value);
        if (value > 100) {
            e.target.value = 100;
        }
        if (value < 0) {
            e.target.value = 0;
        }
    }
});


button.addEventListener("click", function(){
    let total = 0;
    for (let i = 0; i < weightInputs.length;i++){
        let val = Number(weightInputs[i].value) || 0;
        if (val == ""){
            alert("Error, sector weight must not be empty !");
            return;
        }
        total += val;
    }
    for (let i = 0; i < nameInputs.length;i++){
        if (nameInputs[i].value == ""){
            alert("Error, Sector name must not be empty !");
            return;
        }
    }
    if (total > 100){
       alert ("Error, total weight is more than 100 % !");
       return;
    }
    let target_name = target.value; let target_value = Number(shock.value);
    if (target_value > 100 || target_value < 0 || target_value == ""){
        alert("Error, please enter a valid value ! ");
        return;
    }
    let temp = 0;
    let check = false;
    for (let i = 0; i < nameInputs.length;i++){
        if ( nameInputs[i].value === target_name){
            check = true;
            temp = i;
            break;
        }
    }
    if (!check){
        alert("Error, no target sector found ");
        return;
    }
    let change = getshockvalue(weightInputs[temp].value , target_value);
    impact.textContent = `${change}`;
    if (change > threshold){
        recommendation.textContent = "Recommendation: Reduce exposure or buy Put Options to hedge";
    }
    else{
        recommendation.textContent = "Portfolio is resilient. Loss is within 5% ";
    }

});

function addSector(){
    const newRow = `
        <div class="sector-row">
            <input type="text" class="sector-name" placeholder="Sector Name">
            <input type="number" class="sector-weight" min="0" placeholder="Weight %">
        </div>`;
        if (nameInputs.length == 20){
            alert(" The maximum number of sectors is 20 !");
        }
        else {
            container.insertAdjacentHTML('beforeend', newRow);}    
}
add.addEventListener("click", addSector);

function deleteSector(){
    if (nameInputs.length <2){
        alert(" The minimum number of sectors is 1 ! ");
    }
    else{
        const rows = document.getElementsByClassName("sector-row");
        rows[rows.length - 1].remove();
    }
}
del.addEventListener("click", deleteSector);        
re.addEventListener("click",function(){
    for (let i = 0; i < nameInputs.length;i++){
        nameInputs[i].value = "";
        weightInputs[i].value = "";
    }
    impact.textContent = "Impact: --";
    recommendation.textContent = "Recommendation: --";
    target.value = "";
    shock.value = "";
    while (nameInputs.length > 2){
        deleteSector();
    }
    if (nameInputs.length == 1){
        addSector();
    }
})    



