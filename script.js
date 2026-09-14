const data_import= document.getElementById("data-import");
const history_import= document.getElementById("history-import");
const history_file= document.getElementById("history-file");
const select_sets= document.getElementById("select-sets");
const export= document.getElementById("export");
const setting= document.getElementById("setting");
const start= document.getElementById("start");

data_import.addEventListener("click", ()=>{
    alert("データをインポートするよ！");
});
history_import.addEventListener("click", ()=>{
    alert("履歴をインポートするよ！");
})
export.addEventListener("click", ()=>{
    alert(select_sets.value +" をエクスポートするよ！");
})
setting.addEventListener("click", ()=>{
    alert(select_sets.value +" の設定をするよ！");
})
start.addEventListener("click", ()=>{
    alert(select_sets.value +" でスタートするよ！");
})
