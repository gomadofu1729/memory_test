const data_import= document.getElementById("data-import");
const history_import= document.getElementById("history-import");
const select_sets= document.getElementById("select-sets");
const exportBTN= document.getElementById("export");
const setting= document.getElementById("setting");
const start= document.getElementById("start");

data_import.addEventListener("click", ()=>{
    alert("データインポートの画面を開くよ！");
    window.location.href= "import.html";
});
history_import.addEventListener("click", ()=>{
    alert(" をインポートするよ！");

})
exportBTN.addEventListener("click", ()=>{
    alert(`${select_sets.value} をエクスポートするよ！`);
    
})
setting.addEventListener("click", ()=>{
    alert(`${select_sets.value} の設定をするよ！`);
    window.location.href= `setting.html?Set=${select_sets.value}`;
})
start.addEventListener("click", ()=>{
    alert(`${select_sets.value} ではじめるよ！`);
    window.location.href= `memorize.html?Set=${select_sets.value}`;
})
