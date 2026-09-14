const data_import= document.getElementById("data-import");
const history_import= document.getElementById("history-import");
const history_file= document.getElementById("history-file");
const select_sets= document.getElementById("select-sets");
const exportBTN= document.getElementById("export");
const setting= document.getElementById("setting");
const start= document.getElementById("start");

console.log(history_file.value);
data_import.addEventListener("click", ()=>{
    alert("データインポートの画面を開くよ！");
    window.location.href= "import.html";
});
history_import.addEventListener("click", ()=>{
    alert("ファイルをえらんでね！");
    history_file.click();
});
history_file.addEventListener("change", ()=>{
    if (!history_file.value){
        alert("もう一度えらんでね！");
        return;
    }
    console.log(history_file.value);
    const 読取= new FileReader();
    読取.addEventListener("load", ()=>{
        const 送信データ= JSON.parse(読取.result);
    });
    alert(`${history_file.value}を読み込むよ！`);
    読取.readAsText(history_file.value);
});
exportBTN.addEventListener("click", ()=>{
    alert(`${select_sets.value} をエクスポートするよ！`);
    
});
setting.addEventListener("click", ()=>{
    alert(`${select_sets.value} の設定をするよ！`);
    window.location.href= `set_setting.html?Set=${select_sets.value}`;
});
start.addEventListener("click", ()=>{
    alert(`${select_sets.value} ではじめるよ！`);
    window.location.href= `memorize.html?Set=${select_sets.value}`;
});
