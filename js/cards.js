const set_name= document.getElementById("set-name");
const card_table_head= document.getElementById("card-table-head");
const head_row= document.getElementById("head-row");
const card_table_body= document.getElementById("card-table-body");
const confirm= document.getElementById("confirm");
const cards_import= document.getElementById("cards-import");
const cards_export= document.getElementById("cards-export");
const setting= document.getElementById("setting");
const head_menu= document.getElementById("head-menu");
const field_name= document.getElementById("field-name");
const field_edit= document.getElementById("field-edit");
const field_id= document.getElementById("field-id");
const field_method_from= document.getElementById("field-method-from");
const field_method_to= document.getElementById("field-method-from");
const body_menu= document.getElementById("body-menu");
const content_edit= document.getElementById("content-edit");
const card_exclusion= document.getElementById("card-exclusion");
const card_delete= document.getElementById("card-delete");
const card_undelete= document.getElementById("card-undelete");

let カードセット;
let セットID;
async function OP(){
    await 倉庫番.ready();
    const params= new URLSearchParams(location.search);
    セットID= params.get("set");
    カードセット= await 倉庫番.get(セットID);
    for(const フィールド of カードセット.fields){
        const 見出し= document.createElement("th");
        見出し.textContent= フィールド.name;
        見出し.dataset.fieldId= フィールド.id;
        head_row.appendChild(見出し);
    }
    for(const カード of カードセット.cards){
        const 行= document.createElement("tr");
        行.dataset.cardId= カード.id
        const IDセル= document.createElement("td");
        IDセル.textContent= カード.id
        行.appendChild(IDセル);
        for(const フィールド of カードセット.fields){
            const セル=document.createElement("td");
            セル.textContent= カード.data[フィールド.id]
            行.appendChild(セル);
        }
        card_table_body.appendChild(行);
    }
}
OP();

card_table_head.addEventListener("click", (event) =>{
    const 対象セル= event.target.closest(("th"));
    if(!対象セル){return;}
    if(対象セル.dataset.fieldId === undefined){return;}
    const 対象のID= 対象セル.dataset.fieldId;
    const フィールド= カードセット.fields.find((ふ) => ふ.id === 対象のID);
    
    field_name.textContent= `表示名: ${フィールド.name}`;
    field_id.textContent= `フィールドID: ${フィールド.id}`
    
    head_menu.classList.add("vertical");
    head_menu.style.left = `${event.clientX}px`;
    head_menu.style.top = `${event.clientY}px`;
});
card_table_body.addEventListener("click", (event)=>{
    const 対象セル= event.target.closest(("td"));
    if(!対象セル){return;}
    const 対象カード= event.target.closest(("tr"));
    if(!対象カード){return;}
    const 対象のID= 対象カード.dataset.cardId;
    
    body_menu.classList.add("vertical");
    body_menu.style.left = `${event.clientX}px`;
    body_menu.style.top = `${event.clientY}px`;
});
document.addEventListener("click", (event)=>{
    if(!event.target.closest(".pop-up")){
        if(!event.target.closest("#card-table-head")){
            head_menu.classList.remove("vertical");
        }
        if(!event.target.closest("#card-table-body")){
            body_menu.classList.remove("vertical");
        }
    }
});
cards_import.addEventListener("click", ()=>{
    船頭.import(セットID);
});
cards_export.addEventListener("click", ()=>{
    飛脚.data(セットID)
});
setting.addEventListener("click", ()=>{
    船頭.import(セットID);
});