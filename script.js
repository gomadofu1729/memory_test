const data_import= document.getElementById("data-import");
const history_import= document.getElementById("history-import");
const history_file= document.getElementById("history-file");
const select_sets= document.getElementById("select-sets");
const history_export= document.getElementById("history-export");
const data_export= document.getElementById("data-export");
const setting= document.getElementById("setting");
const start= document.getElementById("start");

let カードセット;

const DBリクエスト= indexedDB.open("めもりーくぇすちょねあ", 1);
DBリクエスト.addEventListener("upgradeneeded", ()=>{
    const データベース= DBリクエスト.result:
    データベース.createObjectStore("Card_Sets",{keyPath:"id"});
})
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
    const 読取= new FileReader();
    読取.addEventListener("load", ()=>{
        alert(`${history_file.files[0].name}を読み込んだよ！`);
        カードセット= JSON.parse(読取.result);
        const 新選択肢= document.createElement("option");
        新選択肢.value= カードセット.id;
        新選択肢.textContent= カードセット.name;
        select_sets.appendChild(新選択肢);
    });
    読取.readAsText(history_file.files[0]);
});
history_export.addEventListener("click", ()=>{
    alert(`${select_sets.value} をエクスポートするよ！`);
    
});
data_export.addEventListener("click", ()=>{

})
setting.addEventListener("click", ()=>{
    alert(`${select_sets.value} の設定をするよ！`);
    window.location.href= `set_setting.html?Set=${select_sets.value}`;
});
start.addEventListener("click", ()=>{
    alert(`${select_sets.value} ではじめるよ！`);
    window.location.href= `memorize.html?Set=${select_sets.value}`;
});
