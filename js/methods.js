const set_name= document.getElementById("set-name");
const confirm= document.getElementById("confirm");
const add= document.getElementById("add");
const setting= document.getElementById("setting");
const method_table= document.getElementById("method-table");
const method_id= document.getElementById("method-id");
const Qtext= document.getElementById("Qtext");
const Qtext_div= document.getElementById("Qtext-div");
const Qtext_input= document.getElementById("Qtext-input");
const Qtext_edit= document.getElementById("Qtext-edit");
const Qtext_reset= document.getElementById("Qtext-reset");
const Qtext_restore= document.getElementById("Qtext-restore");
const Qtext_confirm= document.getElementById("Qtext-confirm");
const method_delete= document.getElementById("method-delete");
const method_undelete= document.getElementById("method-undelete");

let カードセット;
let セットID;
let 仮カードセット;
let 指定方式ID;
let 指定方式行;
let 削除予定方式= new Set();
async function OP() {
    const 初期化待ち達= document.querySelectorAll(".wait");
    for (const よ of 初期化待ち達) {
        よ.disabled = true;
    }
    const params= new URLSearchParams(location.search);
    セットID= params.get("set");
    await 倉庫番.ready();
    カードセット= await 倉庫番.get(セットID);
    set_name.textContent= カードセット.name;
    
    仮カードセット= structuredClone(カードセット);
    for (const よ of 初期化待ち達) {
        よ.disabled = false;
    }
}
OP();