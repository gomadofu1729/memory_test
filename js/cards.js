const set_name= document.getElementById("set-name");
const card_table_head= document.getElementById("card-table-head");
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

const params = new URLSearchParams(location.search);
const セットID = params.get("set");

let 目的フィールド;
let 目的カード;

card_table_head.addEventListener("click", (event) =>{
    const 対象セル= event.target.closest(("th"));
    if(!対象セル){return;}

    const 対象のID= 対象セル.dataset.fieldId;
    if(対象のID === "id"){return;}
    
    目的フィールド= set.fields.find((ふ) => ふ.id === 対象のID);
    head_menu.classList.add("vertical");
    head_menu.style.left = `${event.clientX}px`;
    head_menu.style.top = `${event.clientY}px`;
});
card_table_body.addEventListener("click", (event)=>{
    const 対象セル= event.target.closest(("td"));
    if(!対象セル){return;}
    if(対象セル.dataset.fieldId === undefined){return;}
    const 対象のID= 対象セル.dataset.fieldId;
    
    目的カード= set.cards.find((ふ) => ふ.id === 対象のID);
    body_menu.classList.add("vertical");
    body_menu.style.left = `${event.clientX}px`;
    body_menu.style.top = `${event.clientY}px`;
})
document.addEventListener("click", (event)=>{
    if(!event.target.closest(".pop-up")){
        if(!event.target.closest("#card-table-head")){
            head_menu.classList.remove("vertical");
        }
        if(!event.target.closest("#card-table-body")){
            body_menu.classList.remove("vertical");
        }
    }
})
cards_import.addEventListener("click", ()=>{
    遷移.import(セットID);
})
cards_export.addEventListener("click", ()=>{
    エクスポート.data(セットID)
})
setting.addEventListener("click", ()=>{
    visit.import(セットID);
})