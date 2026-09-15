const cards_import= document.getElementById("cards-import");
const set_import= document.getElementById("set-import");
const set_file= document.getElementById("set-file");
const select_sets= document.getElementById("select-sets");
const set_export= document.getElementById("set-export");
const cards_export= document.getElementById("cards-export");
const setting= document.getElementById("setting");
const start= document.getElementById("start");

let カードセット;

const DBリクエスト= indexedDB.open("めもりーくぇすちょねあ", 1);
DBリクエスト.addEventListener("upgradeneeded", ()=>{
    const データベース= DBリクエスト.result;
    データベース.createObjectStore("Card_Sets",{keyPath:"id"});
})
cards_import.addEventListener("click", ()=>{
    alert("データインポートの画面を開くよ！");
    window.location.href= "import.html";
});
set_import.addEventListener("click", ()=>{
    alert("ファイルをえらんでね！");
    set_file.click();
});
set_file.addEventListener("change", ()=>{
    if (!set_file.value){
        alert("もう一度えらんでね！");
        return;
    }
    const 読取= new FileReader();
    読取.addEventListener("load", ()=>{
        alert(`${set_file.files[0].name}を読み込んだよ！`);
        カードセット= JSON.parse(読取.result);
        const 新選択肢= document.createElement("option");
        新選択肢.value= カードセット.id;
        新選択肢.textContent= カードセット.name;
        select_sets.appendChild(新選択肢);
    });
    読取.readAsText(set_file.files[0]);
});
set_export.addEventListener("click", ()=>{
    alert(`${select_sets.value} をエクスポートするよ！`);
    
});
cards_export.addEventListener("click", ()=>{

})
setting.addEventListener("click", ()=>{
    alert(`${select_sets.value} の設定をするよ！`);
    visit.setting(select_sets.value);
});
start.addEventListener("click", ()=>{
    alert(`${select_sets.value} ではじめるよ！`);
    visit.memorize(select_sets.value);
});
