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
const field_div= document.getElementById("field-div");
const field_input= document.getElementById("field-input");
const field_edit= document.getElementById("field-edit");
const field_reset= document.getElementById("field-reset");
const field_restore= document.getElementById("field-restore");
const field_confirm= document.getElementById("field-confirm");
const field_method_from= document.getElementById("field-method-from");
const field_method_to= document.getElementById("field-method-to");
const field_delete= document.getElementById("field-delete");
const field_undelete= document.getElementById("field-undelete");
const body_menu= document.getElementById("body-menu");
const card_id= document.getElementById("card-id");
const content_name= document.getElementById("content-name");
const content_div= document.getElementById("content-div");
const content_label= document.getElementById("content-label");
const content_input= document.getElementById("content-input");
const content_reset= document.getElementById("content-reset");
const content_restore= document.getElementById("content-restore");
const content_edit= document.getElementById("content-edit");
const content_confirm= document.getElementById("content-confirm");
const card_delete= document.getElementById("card-delete");
const card_undelete= document.getElementById("card-undelete");
const card_exclusion= document.getElementById("card-exclusion");

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
    const 初期化待ち達= document.querySelectorAll(".wait");
    for (const よ of 初期化待ち達) {
        よ.disabled = true;
    }
    const params= new URLSearchParams(location.search);
    セットID= params.get("set");
    await 倉庫番.ready();
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
            セル.dataset.fieldId= フィールド.id;
            行.appendChild(セル);
        }
        card_table_body.appendChild(行);
    }
    仮カードセット= structuredClone(カードセット);
    for (const よ of 初期化待ち達) {
        よ.disabled = false;
    }
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
    field_input.placeholder= 仮フィールド.name;
    field_method_from.replaceChildren();
    field_method_to.replaceChildren();
    for(const 方式 of カードセット.methods){
        if(方式.Q == 対象のID){
            const P= document.createElement("p");
            P.textContent= `・${方式.sentence} > ${方式.A}`;
            field_method_from.appendChild(P);
        }
        if(方式.A == 対象のID){
            const P= document.createElement("p");
            P.textContent= `・${方式.Q} > ${方式.sentence}`;
            field_method_to.appendChild(P);
        }
    }
    if(対象セル.classList.contains("for-delete")){
        head_menu.classList.add("menu-deleted");
    }else{
        head_menu.classList.add("menu-free");
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
    const 対象のフィールドID= 対象セル.dataset.fieldId;
    const 仮フィールド= 仮カードセット.fields.find((ふ) => ふ.id === 対象のフィールドID);
    
    card_id.textContent= `カードID: ${対象のID}`;
    content_name.textContent= `${仮フィールド.name}: ${対象セル.textContent}`;
    content_label.textContent= `${仮フィールド.name}: `;
    content_input.placeholder= 対象セル.textContent;
    if(対象カード.classList.contains("for-delete")){
        body_menu.classList.add("menu-deleted");
    }else{
        body_menu.classList.add("menu-free");
    }

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
            if(head_menu.classList.contains("menu-editing")){
                field_restore.click();
            }
            head_menu.classList.remove("vertical", "menu-free", "menu-deleted");
        }
        if(!event.target.closest("#card-table-body")){
            if(body_menu.classList.contains("menu-editing")){
                content_restore.click();
            }
            body_menu.classList.remove("vertical", "menu-free", "menu-deleted");
        }
    }
});

field_edit.addEventListener("click", ()=>{
    head_menu.classList.remove("menu-free");
    head_menu.classList.add("menu-editing");
    field_input.value= "";
});
field_reset.addEventListener("click", ()=>{
    const フィールド= カードセット.fields.find((ふ) => ふ.id === 指定フィールドID);
    const 仮フィールド= 仮カードセット.fields.find((ふ) => ふ.id === 指定フィールドID);
    仮フィールド.name= フィールド.name;
    指定フィールドセル.textContent= フィールド.name;
    指定フィールドセル.classList.remove("changed");
    指定フィールドセル.classList.add("original");
    field_name.textContent= `表示名: ${フィールド.name}`;
});
field_restore.addEventListener("click", ()=>{
    head_menu.classList.remove("menu-editing");
    head_menu.classList.add("menu-free");
});
field_confirm.addEventListener("click", ()=>{
    const newName= field_input.value.trim();
    if(newName=== ""){return;}
    head_menu.classList.remove("menu-editing");
    head_menu.classList.add("menu-free");
    const 仮フィールド= 仮カードセット.fields.find((ふ) => ふ.id === 指定フィールドID);
    仮フィールド.name= field_input.value;
    指定フィールドセル.textContent= field_input.value;
    指定フィールドセル.classList.remove("original");
    指定フィールドセル.classList.add("changed");
    field_name.textContent= `表示名: ${field_input.value}`;
});
field_delete.addEventListener("click", ()=>{
    head_menu.classList.remove("menu-free");
    head_menu.classList.add("menu-deleted");
    削除予定フィールド.add(指定フィールドID);
    指定フィールドセル.classList.add("for-delete");
});
field_undelete.addEventListener("click", ()=>{
    head_menu.classList.remove("menu-deleted");
    head_menu.classList.add("menu-free");
    削除予定フィールド.delete(指定フィールドID);
    const フィールド= カードセット.fields.find((ふ) => ふ.id === 指定フィールドID);
    指定フィールドセル.classList.remove("for-delete");
});
content_edit.addEventListener("click", ()=>{
    body_menu.classList.remove("menu-free");
    body_menu.classList.add("menu-editing");
    content_input.value="";
});
content_reset.addEventListener("click", ()=>{
    const カード= カードセット.cards.find((か) => か.id === 指定カードID);
    const 仮カード= 仮カードセット.cards.find((か) => か.id === 指定カードID);
    仮カード.data[指定カードセル.dataset.fieldId]= カード.data[指定カードセル.dataset.fieldId];
    指定カードセル.textContent= カード.data[指定カードセル.dataset.fieldId];
    指定カードセル.classList.remove("changed");
    指定カードセル.classList.add("original");
    const 仮フィールド= 仮カードセット.fields.find((ふ) => ふ.id === 指定カードセル.dataset.fieldId);
    content_name.textContent= `${仮フィールド.name}: ${カード.data[指定カードセル.dataset.fieldId]}`;
});
content_restore.addEventListener("click", ()=>{
    body_menu.classList.remove("menu-editing");
    body_menu.classList.add("menu-free");
})
content_confirm.addEventListener("click", ()=>{
    const newName= content_input.value.trim();
    if(newName=== ""){return;}
    body_menu.classList.remove("menu-editing");
    body_menu.classList.add("menu-free");
    const 仮カード= 仮カードセット.cards.find((か) => か.id === 指定カードID);
    仮カード.data[指定カードセル.dataset.fieldId]= content_input.value;
    指定カードセル.textContent= content_input.value;
    指定カードセル.classList.remove("original");
    指定カードセル.classList.add("changed");
    const 仮フィールド= 仮カードセット.fields.find((ふ) => ふ.id === 指定カードセル.dataset.fieldId);
    content_name.textContent= `${仮フィールド.name}: ${content_input.value}`;
});
card_delete.addEventListener("click", ()=>{
    body_menu.classList.remove("menu-free");
    body_menu.classList.add("menu-deleted");
    削除予定カード.add(指定カードID);
    指定カード行.classList.add("for-delete");
});
card_undelete.addEventListener("click", ()=>{
    head_menu.classList.remove("menu-deleted");
    head_menu.classList.add("menu-free");
    削除予定カード.delete(指定カードID);
    const カード= カードセット.cards.find((か) => か.id === 指定カードID);
    指定カード行.classList.remove("for-delete");
});

confirm.addEventListener("click", async ()=>{
    仮カードセット.cards= 仮カードセット.cards.filter(
        (か) => !削除予定カード.has(か.id)
    );
    仮カードセット.fields= 仮カードセット.fields.filter(
        (ふ) => !削除予定フィールド.has(ふ.id)
    );
    for(const カード of 仮カードセット.cards){
        for(const フィールド of 削除予定フィールド){
            delete カード.data[フィールド];
        }
    }
    await 倉庫番.store(仮カードセット);
    location.reload();
});

card_exclusion.addEventListener("click", ()=>{
    船頭.exclusion(セットID);
});
cards_import.addEventListener("click", ()=>{
    船頭.importID(セットID);
});
cards_export.addEventListener("click", ()=>{
    飛脚.data(カードセット);
});
setting.addEventListener("click", ()=>{
    船頭.setting(セットID);
});