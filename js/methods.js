const set_name= document.getElementById("set-name");
const confirm= document.getElementById("confirm");
const add= document.getElementById("add");
const setting= document.getElementById("setting");
const method_table= document.getElementById("method-table");
const body_menu= document.getElementById("body-menu");
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
const add_menu= document.getElementById("add-menu");
const add_Qfield_select= document.getElementById("add-Qfield-select");
const add_Qfield_reset= document.getElementById("add-Qfield-reset");
const add_Afield_select= document.getElementById("add-Afield-select");
const add_Afield_reset= document.getElementById("add-Afield-reset");
const add_QA_swap= document.getElementById("add-QA-swap");
const add_Qtext= document.getElementById("add-Qtext");
const add_confirm= document.getElementById("add-confirm");
const add_close= document.getElementById("add-close");

let カードセット;
let セットID;
let 仮カードセット;
let 指定方式ID;
let 指定方式行;
let 削除予定方式= new Set();
function success_Qop(){
    const 選択済_Q= new Set(
        [...add_Qfield_select.selectedOptions].map((せ) => せ.value)
    );
    for(const 選択肢 of add_Afield_select.options){
        選択肢.selected&= !選択済_Q.has(選択肢.value);
        選択肢.disabled= 選択済_Q.has(選択肢.value);
    }
}
function success_Aop(){
    const 選択済_A= new Set(
        [...add_Afield_select.selectedOptions].map((せ) => せ.value)
    );
    for(const 選択肢 of add_Qfield_select.options){
        選択肢.selected&= !選択済_A.has(選択肢.value);
        選択肢.disabled= 選択済_A.has(選択肢.value);
    }
}
function construct_table(){
    method_table.innerHTML="";
    for(const 方式 of 仮カードセット.methods){
        const 行= document.createElement("tr");
        行.dataset.methodId= 方式.id;

        const IDセル= document.createElement("td");
        IDセル.textContent= 方式.id;
        行.appendChild(IDセル);
        if(削除予定方式.has(方式.id)){
            行.classList.add("for-delete");
        }

        const 出題フィールドセル= document.createElement("td");
        const 出題フィールド= 仮カードセット.fields.find((ふ) => ふ.id === 方式.Qfield);
        出題フィールドセル.textContent= 出題フィールド.name;
        行.appendChild(出題フィールドセル);

        const 解答フィールドセル= document.createElement("td");
        const 解答フィールド= カードセット.fields.find((ふ) => ふ.id === 方式.Afield);
        解答フィールドセル.textContent= 解答フィールド.name;
        行.appendChild(解答フィールドセル);

        const 問題文セル= document.createElement("td");
        問題文セル.textContent= 方式.Qtext;
        行.appendChild(問題文セル);
        if(
            !カードセット.methods.includes(方式.Qtext) ||
            方式.Qtext!== カードセット.methods.find((ほ) => ほ.id==方式.id).Qtext
        ){
            問題文セル.classList.add("changed");
        }

        method_table.appendChild(行);
    }
}
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
    
    for(const フィールド of カードセット.fields){
        const Q選択肢= document.createElement("option");
        Q選択肢.textContent= フィールド.name;
        Q選択肢.value= フィールド.id;
        add_Qfield_select.appendChild(Q選択肢);

        const A選択肢= document.createElement("option");
        A選択肢.textContent= フィールド.name;
        A選択肢.value= フィールド.id;
        add_Afield_select.appendChild(A選択肢);
    }
    仮カードセット= structuredClone(カードセット);
    construct_table();
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
    Qtext.textContent= `問題文: ${対象方式.children[3].textContent}`;
    
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
            Qtext_restore.click();
        }
        body_menu.classList.remove("vertical", "menu-free", "menu-deleted");
    }
});

Qtext_edit.addEventListener("click", ()=>{
    body_menu.classList.remove("menu-free");
    body_menu.classList.add("menu-editing");
    Qtext_input.value="";
});
Qtext_reset.addEventListener("click", ()=>{
    const 方式= カードセット.methods.find((ほ) => ほ.id === 指定方式ID);
    const 仮方式= 仮カードセット.methods.find((ほ) => ほ.id === 指定方式ID);
    仮方式.Qtext= 方式.Qtext;
    指定方式行.children[3].textContent= 方式.Qtext;
    指定方式行.children[3].classList.remove("changed");
    指定方式行.children[3].classList.add("original");
    Qtext.textContent= 方式.Qtext;
});
Qtext_restore.addEventListener("click", ()=>{
    body_menu.classList.remove("menu-editing");
    body_menu.classList.add("menu-free");
});
Qtext_confirm.addEventListener("click", ()=>{
    const newName= Qtext_input.value.trim();
    if(newName== ""){return;}
    body_menu.classList.remove("menu-editing");
    body_menu.classList.add("menu-free");
    const 仮方式= 仮カードセット.methods.find((ほ) => ほ.id === 指定方式ID);
    仮方式.Qtext= Qtext_input.value;
    指定方式行.children[3].textContent= Qtext_input.value;
    指定方式行.children[3].classList.remove("original");
    指定方式行.children[3].classList.add("changed");
    Qtext.textContent= Qtext_input.value;
});
method_delete.addEventListener("click", ()=>{
    body_menu.classList.remove("menu-free");
    body_menu.classList.add("menu-deleted");
    削除予定方式.add(指定方式ID);
    指定方式行.classList.add("for-delete");
});
method_undelete.addEventListener("click", ()=>{
    body_menu.classList.remove("menu-deleted");
    body_menu.classList.add("menu-free");
    削除予定方式.delete(指定方式ID);
    指定方式行.classList.remove("for-delete");
});

confirm.addEventListener("click", async ()=>{
    仮カードセット.methods= 仮カードセット.methods.filter(
        (ほ) => !削除予定方式.has(ほ.id)
    );
    await 倉庫番.store(仮カードセット);
    location.reload();
});

setting.addEventListener("click", ()=>{
    船頭.setting(セットID);
});
add.addEventListener("click", ()=>{
    add_menu.classList.add("vertical");
    add_Qfield_reset.click();
    add_Afield_reset.click();
    add_Qtext.value="";
});

add_Qfield_select.addEventListener("change", success_Qop);
add_Qfield_reset.addEventListener("click", ()=>{
    add_Qfield_select.selectedIndex = -1;
    success_Qop();
});
add_Afield_select.addEventListener("change", success_Aop);
add_Afield_reset.addEventListener("click", ()=>{
    add_Afield_select.selectedIndex = -1;
    success_Aop();
});
add_QA_swap.addEventListener("click", ()=>{
    const 選択済_Q= new Set(
        [...add_Qfield_select.selectedOptions].map((せ) => せ.value)
    );
    const 選択済_A= new Set(
        [...add_Afield_select.selectedOptions].map((せ) => せ.value)
    );
    for(const 選択肢 of add_Qfield_select.options){
        選択肢.selected= 選択済_A.has(選択肢.value);
        選択肢.disabled= 選択済_Q.has(選択肢.value);
    }
    for(const 選択肢 of add_Afield_select.options){
        選択肢.selected= 選択済_Q.has(選択肢.value);
        選択肢.disabled= 選択済_A.has(選択肢.value);
    }
});
add_confirm.addEventListener("click", ()=>{
    if(
        add_Qfield_select.selectedOptions.length ==0 ||
        add_Afield_select.selectedOptions.length ==0
    ){return;}
    if(add_Qtext.value==""){
        add_Qtext.value="{解答}は何?";
    }
    for(Q選択肢 of add_Qfield_select.selectedOptions){
        for(A選択肢 of add_Afield_select.selectedOptions){
            追加予定ID= `${Q選択肢.value}-to-${A選択肢.value}`;
            const 重複= 仮カードセット.methods.some((ほ) => ほ.id === 追加予定ID);
            if(重複){continue;}

            const 問題フィールド名= 仮カードセット.fields.find((ふ) => ふ.id= Q選択肢.value);
            const 解答フィールド名= 仮カードセット.fields.find((ふ) => ふ.id= A選択肢.value);
            const 追加方式= {
                id: 追加予定ID,
                Qfield: Q選択肢.value,
                Afield: A選択肢.value,
                Qtext: add_Qtext.value
                    .replaceAll("{問題}", 問題フィールド名)
                    .replaceAll("{解答}", 解答フィールド名)
            };
            仮カードセット.methods.push(追加方式);
        }
    }
    construct_table();
});
add_close.addEventListener("click", ()=>{
    add_menu.classList.remove("vertical");
});