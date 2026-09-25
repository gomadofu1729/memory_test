const set_mode= document.getElementsByName("setMode");
const set_mode_new= document.getElementById("setMode-new");
const set_mode_existing= document.getElementById("setMode-existing");
const new_set_id= document.getElementById("new-set-id");
const set_id_error= document.getElementById("set-id-error");
const existing_set= document.getElementById("existing-set");
const import_type= document.getElementsByName("import-type");
const select_file= document.getElementById("select-file");
const file_info= document.getElementById("file-info");
const methods= document.getElementById("methods");
const add_method= document.getElementById("add-method");
const summary= document.getElementById("summary");
const register= document.getElementById("register");
const sections= document.getElementsByTagName("section");
const prev= document.getElementsByClassName("prev");
const next1= document.getElementById("next1");
const next2= document.getElementById("next2");
const next3= document.getElementById("next3");
const confirm= document.getElementById("confirm");

const ID形式 = /^[A-Za-z0-9_]+$/;
let セットID;
function display_section(番号){
    for(const セクション of sections){
        if(セクション.dataset.section== 番号){
            セクション.classList.remove("hide");
        }else{
            セクション.classList.add("hide");
        }
    }
}
function setMode_change(){
    const 選択= document.querySelector('input[name="setMode"]:checked').value;
    new_set_id.disabled= 選択!=="new";
    existing_set.disabled= 選択!=="existing";
}
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
        existing_set.appendChild(新選択肢);
    }
    const params= new URLSearchParams(location.search);
    const URLセット= params.get("set");
    if(URLセット=== null){
        set_mode_new.checked= true;
    }else{
        set_mode_existing.checked= true;
        existing_set.value= URLセット;
    }
    setMode_change();
    for (const よ of 初期化待ち達) {
        よ.disabled = false;
    }
}
OP();

display_section(1);
for(const ボタン of prev){
    ボタン.addEventListener("click", ()=>{
        display_section(ボタン.dataset.destiny);
    });
}

next1.addEventListener("click", async ()=>{
    const 選択= document.querySelector('input[name="setMode"]:checked').value;
    if(選択=== "new"){
        セットID= new_set_id.value;
        if(セットID== ""){
            set_id_error.classList.remove("hide");
            set_id_error.textContent= "セットIDを入力してください。";
            return;
        }
        if(!ID形式.test(セットID)){
            set_id_error.classList.remove("hide");
            set_id_error.textContent= "IDに使用できるのは、英数字、アンダースコア(_)のみです。";
            return;
        }
        if(await 倉庫番.get(セットID) !== undefined){
            set_id_error.classList.remove("hide");
            set_id_error.textContent= "このIDは既に使用されています。"
            return;
        }
    }else{
        if(existing_set.value== ""){
            return;
        }
    }
    display_section(2)
});