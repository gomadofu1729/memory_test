const set_name= document.getElementById("set-name");
const card_table_head= document.getElementById("card-table-head");
const head_row= document.getElementById("head-row");
const card_table_body= document.getElementById("card-table-body");
const confirm= document.getElementById("confirm");
const cards_import= document.getElementById("cards-import");
const cards_export= document.getElementById("cards-export");
const setting= document.getElementById("setting");
const head_menu= document.getElementById("head-menu");
const field_id= document.getElementById("field-id");
const field_name= document.getElementById("field-name");
const field_name_div= document.getElementById("field-name-div");
const field_name_input= document.getElementById("field-name-input");
const field_edit= document.getElementById("field-edit");
const field_confirm= document.getElementById("field-confirm");
const field_reset= document.getElementById("field-reset");
const field_method_from= document.getElementById("field-method-from");
const field_method_to= document.getElementById("field-method-to");
const field_delete= document.getElementById("field-delete");
const field_undelete= document.getElementById("field-undelete");
const body_menu= document.getElementById("body-menu");
const content_edit= document.getElementById("content-edit");
const card_exclusion= document.getElementById("card-exclusion");
const card_delete= document.getElementById("card-delete");
const card_reset= document.getElementById("card-reset");

let カードセット;
let セットID;
let 仮カードセット;
let 指定フィールドID;
let 指定フィールドセル
let 削除予定フィールド= new Set();
let 指定カードID;
let 指定カードセル;
let 指定カード行;
let 削除予定カード= new Set();
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
    仮カードセット= structuredClone(カードセット);
}
OP();

card_table_head.addEventListener("click", (event) =>{
    const 対象セル= event.target.closest(("th"));
    if(!対象セル){return;}
    if(対象セル.dataset.fieldId === undefined){return;}
    const 対象のID= 対象セル.dataset.fieldId;
    const フィールド= カードセット.fields.find((ふ) => ふ.id === 対象のID);
    const 仮フィールド= 仮カードセット.fields.find((ふ) => ふ.id === 対象のID);
    
    field_name.textContent= `表示名: ${仮フィールド.name}`;
    field_id.textContent= `フィールドID: ${対象のID}`;
    field_name_input.placeholder= 仮フィールド.name;
    field_method_from.replaceChildren();
    field_method_to.replaceChildren();
    for(const 方式 of カードセット.methods){
        if(方式.Q == 対象のID){
            const P= document.createElement("p");
            P.textContent= `・${方式.sentence} > ${方式.A}`;
            P.style.color= "maroon";
            field_method_from.appendChild(P);
        }
        if(方式.A == 対象のID){
            const P= document.createElement("p");
            P.textContent= `・${方式.Q} > ${方式.sentence}`;
            P.style.color= "maroon";
            field_method_to.appendChild(P);
        }
    }

    指定フィールドID= 対象のID;
    指定フィールドセル= 対象セル;
    head_menu.dataset.selectedId= 対象のID;
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
    
    指定カードID= 対象のID;
    指定カードセル= 対象セル;
    指定カード行= 対象カード;
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

field_edit.addEventListener("click", ()=>{
    field_name.hidden= true;
    field_name_div.hidden= false;
    field_edit.hidden= true;
    field_confirm.hidden= false;
    field_reset.hidden= true;
    field_delete.hidden= true;
    field_name_input.value= "";
});
field_confirm.addEventListener("click", ()=>{
    const newName= field_name_input.value.trim();
    if(newName=== ""){
        return;
    }
    field_name.hidden= false;
    field_name_div.hidden= true;
    field_edit.hidden= false;
    field_confirm.hidden= true;
    field_reset.hidden= false;
    field_delete= false;
    const 仮フィールド= 仮カードセット.fields.find((ふ) => ふ.id === 指定フィールドID);
    仮フィールド.name= field_name_input.value;
    指定フィールドセル.textContent= 仮フィールド.name;
    指定フィールドセル.style.color= "brown";
});
field_reset.addEventListener("click", ()=>{
    const フィールド= カードセット.fields.find((ふ) => ふ.id === 指定フィールドID);
    const 仮フィールド= 仮カードセット.fields.find((ふ) => ふ.id === 指定フィールドID);
    仮フィールド.name= フィールド.name;
    指定フィールドセル.textContent= フィールド.name;
    指定フィールドセル.style.color= "black";
});
field_delete.addEventListener("click", ()=>{
    field_edit.disabled= true;
    field_reset.disabled= true;
    field_delete.hidden= true;
    field_undelete.hidden= false;
    削除予定フィールド.add(指定フィールドID);
    指定フィールドセル.style.color= "gray";
    指定フィールドセル.style.textDecoration= "line-through";
});
field_undelete.addEventListener("click", ()=>{
    field_edit.disabled= false;
    field_reset.disabled= true;
    field_delete.hidden= false;
    field_undelete.hidden= true;
    指定フィールドセル.style.textDecoration= "none";
    削除予定フィールド.delete(指定フィールドID);
    const フィールド= カードセット.fields.find((ふ) => ふ.id === 指定フィールドID);
    if(指定フィールドセル.textContent === フィールド.name){
        指定フィールドセル.style.color= "black";
    }else{
        指定フィールドセル.style.color= "maroon";
    }
})

cards_import.addEventListener("click", ()=>{
    船頭.import(セットID);
});
cards_export.addEventListener("click", ()=>{
    飛脚.data(セットID)
});
setting.addEventListener("click", ()=>{
    船頭.import(セットID);
});