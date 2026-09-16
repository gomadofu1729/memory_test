const set_name_display= document.getElementById("set-name-display");
const set_name_div= document.getElementById("set-name-div");
const set_name_input= document.getElementById("set-name-input");
const set_name_edit= document.getElementById("set-name-edit");
const set_name_confirm= document.getElementById("set-name-confirm");
const set_name_restore= document.getElementById("set-name-restore");
const cards_number= document.getElementById("cards-number");
const cards_edit= document.getElementById("cards-edit");
const cards_import= document.getElementById("cards-import");
const cards_export= document.getElementById("cards-export");
const methods_number= document.getElementById("methods-number");
const methods_edit= document.getElementById("methods-edit");
const exclusion_number= document.getElementById("exclusion-number");
const exclusion_edit= document.getElementById("exclusion-edit");
const set_export= document.getElementById("set-export");
const set_delete= document.getElementById("delete");
const index= document.getElementById("index");
const start= document.getElementById("start");

let カードセット;
let セットID;
async function OP(){
    const params= new URLSearchParams(location.search);
    セットID= params.get("set");
    await 倉庫番.ready();
    カードセット= await 倉庫番.get(セットID);
    const 初期化待ち達= document.querySelectorAll(".wait");
    for (const よ of 初期化待ち達) {
        よ.disabled = false;
    }
    set_name_display.textContent= `セット名: ${カードセット.name}`;
    cards_number.textContent= `${カードセット.cards.length}件`;
    methods_number.textContent= `${カードセット.methods.length}件`;
    exclusion_number.textContent= `${カードセット.exclusions.length}件`;
}
OP();

set_name_edit.addEventListener("click", ()=>{
    set_name_display.hidden= true;
    set_name_div.hidden= false;
    set_name_edit.hidden= true;
    set_name_confirm.hidden= false;
    set_name_restore.hidden= false;
    set_name_input.placeholder= カードセット.name;
    set_name_input.value= "";
});
set_name_confirm.addEventListener("click", async ()=>{
    set_name_display.hidden= false;
    set_name_div.hidden= true;
    set_name_edit.hidden= false;
    set_name_confirm.hidden= true;
    set_name_restore.hidden= true;
    await 倉庫番.store(カードセット);
    カードセット.name= set_name_input.value;
    set_name_display.textContent =`セット名: ${カードセット.name}`;
});
set_name_restore.addEventListener("click", ()=>{
    set_name_display.hidden= false;
    set_name_div.hidden= true;
    set_name_edit.hidden= false;
    set_name_confirm.hidden= true;
    set_name_restore.hidden= true;
});
cards_edit.addEventListener("click", ()=>{
    船頭.cards(セットID);
});
cards_import.addEventListener("click", ()=>{
    船頭.import();
});
cards_export.addEventListener("click", ()=>{
    飛脚.data(カードセット);
});
methods_edit.addEventListener("click", ()=>{
    船頭.methods(セットID);
});
exclusion_edit.addEventListener("click", ()=>{
    船頭.exclusion(セットID);
});
set_export.addEventListener("click", ()=>{
    飛脚.history(カードセット);
});
set_delete.addEventListener("click", async ()=>{
    const 返答= confirm(`本当に「${カードセット.name}」を削除しますか?`);
    if(!返答){return;}
    const 返答2= confirm(`ホンマに? 後悔せん?`);
    if(!返答2){return;}
    await 倉庫番.delete(セットID);
    船頭.index();
});
index.addEventListener("click", ()=>{
    船頭.index();
});
start.addEventListener("click", ()=>{
    船頭.memorize(セットID);
})