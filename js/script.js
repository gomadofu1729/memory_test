const cards_import= document.getElementById("cards-import");
const set_import= document.getElementById("set-import");
const set_file= document.getElementById("set-file");
const select_sets= document.getElementById("select-sets");
const set_export= document.getElementById("set-export");
const cards_export= document.getElementById("cards-export");
const setting= document.getElementById("setting");
const start= document.getElementById("start");

let カードセット;

cards_import.addEventListener("click", ()=>{
    船頭.import();
});
set_import.addEventListener("click", ()=>{
    set_file.click();
});
set_file.addEventListener("change", ()=>{
    if (!set_file.value){
        return;
    }
    const 読取= new FileReader();
    読取.addEventListener("load", async ()=>{
        カードセット= JSON.parse(読取.result);
        const 新選択肢= document.createElement("option");
        新選択肢.value= カードセット.id;
        新選択肢.textContent= カードセット.name;
        select_sets.appendChild(新選択肢);
        倉庫番.store(カードセット);
    });
    読取.readAsText(set_file.files[0]);
});
cards_export.addEventListener("click", ()=>{
    飛脚.data(select_sets.value)
})
set_export.addEventListener("click", ()=>{
    飛脚.history(select_sets.value)
});
setting.addEventListener("click", ()=>{
    船頭.setting(select_sets.value);
});
start.addEventListener("click", ()=>{
    船頭.memorize(select_sets.value);
});
