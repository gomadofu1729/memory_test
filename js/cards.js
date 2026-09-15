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

const set= {
    "id": "hoge",
    "name": "hoge",
    "fields": [
        {
            "id": "id",
            "name": "id"
        },
        {
            "id": "hoge",
            "name": "仮"
        }
    ],
    "cards": [
        {
            "id": "01",
            "hoge": "ふが"
        }
    ]
};

card_table_head.addEventListener("click", (event)=>{
    const 対象セル= event.target.closest(("th"));
    if (!対象セル){return;}

    const 対象のID= 対象セル.dataset.fieldId;
    if(対象のID === "id"){return;}
    
    const 目的フィールド= set.fields.find(f => f.id === 対象のID);
    console.log(目的フィールド);
    head_menu.style.left = `${event.clientX}px`;
    head_menu.style.top = `${event.clientY}px`;
    head_menu.classList.add("vertical");
});