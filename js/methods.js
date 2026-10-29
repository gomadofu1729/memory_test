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
    for(const 方式 of カードセット.methods){
        const 行= document.createElement("tr");
        行.dataset.methodId= 方式.id;
        const IDセル= document.createElement("td");
        IDセル.textContent= 方式.id;
        行.appendChild(IDセル);
        const 出題フィールドセル= document.createElement("td");
        const 出題フィールド= カードセット.fields.find((ふ) => ふ.id === 方式.Qfield);
        出題フィールドセル.textContent= 出題フィールド.name;
        行.appendChild(出題フィールドセル);
        const 解答フィールドセル= document.createElement("td");
        const 解答フィールド= カードセット.fields.find((ふ) => ふ.id === 方式.Qfield);
        解答フィールドセル.textContent= 解答フィールド.name;
        行.appendChild(解答フィールドセル);
        const 問題文セル= document.createElement("td");
        問題文セル.textContent= 方式.Qtext;
        行.appendChild(問題文セル);
        method_table.appendChild(行);
    }
    仮カードセット= structuredClone(カードセット);
    for (const よ of 初期化待ち達) {
        よ.disabled = false;
    }
}
OP();

method_table.addEventListener("click", (event)=>{
    const 対象方式= event.target.closest(("tr"));
    if(!対象方式){return;}
    const 対象のID= 対象方式.dataset.methodId;
    
    method_id.textContent= `方式ID: ${対象のID}`;
    Qtext.textContent= `問題文: ${対象方式[1].textContent}`;
    
    if(対象方式.classList.contains("for-delete")){
        body_menu.classList.add("menu-deleted");
    }else{
        body_menu.classList.add("menu-free");
    }
    指定方式ID= 対象のID;
    指定方式行= 対象方式;
    body_menu.classList.add("vertical");
    body_menu.style.left = `${event.clientX}px`;
    body_menu.style.top = `${event.clientY}px`;
});
document.addEventListener("click", (event)=>{
    if(!event.target.closest(".pop-up") && !event.target.closest("#method-table")){
        if(body_menu.classList.contains("menu-editing")){
            content_restore.click();
        }
        body_menu.classList.remove("vertical", "menu-free", "menu-deleted");
    }
});