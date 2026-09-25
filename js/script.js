const cards_import= document.getElementById("cards-import");
const set_import= document.getElementById("set-import");
const set_file= document.getElementById("set-file");
const select_sets= document.getElementById("select-sets");
const set_export= document.getElementById("set-export");
const setting= document.getElementById("setting");
const start= document.getElementById("start");

let カードセット;
async function OP(){
    const 初期化待ち達= document.querySelectorAll(".wait");
    for (const よ of 初期化待ち達) {
        よ.disabled = true;
    }
    await 倉庫番.ready();
    const カードケース= await 倉庫番.enumerate();
    for(const D of カードケース){
        const 新選択肢= document.createElement("option");
        新選択肢.value= D.id;
        新選択肢.textContent= D.name;
        select_sets.appendChild(新選択肢);
    }
    for (const よ of 初期化待ち達) {
        よ.disabled = false;
    }
}
OP();

cards_import.addEventListener("click", ()=>{
    船頭.import();
});
set_import.addEventListener("click", ()=>{
    set_file.click();
});
set_file.addEventListener("change", ()=>{
    if (!set_file.value){return;}
    const 読取= new FileReader();
    読取.addEventListener("load", async ()=>{
        let D= JSON.parse(読取.result);
        const 新選択肢= document.createElement("option");
        新選択肢.value= D.id;
        新選択肢.textContent= D.name;
        select_sets.appendChild(新選択肢);
        倉庫番.store(D);
    });
    読取.readAsText(set_file.files[0]);
});
select_sets.addEventListener("change", async ()=>{
    if(!select_sets.value){
        set_export.disabled= true;
        setting.disabled= true;
        start.disabled= true;
        return;
    }
    set_export.disabled= false;
    setting.disabled= false;
    start.disabled= false;
    カードセット= await 倉庫番.get(select_sets.value);
})
set_export.addEventListener("click", ()=>{
    飛脚.history(カードセット)
});
setting.addEventListener("click", ()=>{
    船頭.setting(select_sets.value);
});
start.addEventListener("click", ()=>{
    船頭.memorize(select_sets.value);
});
