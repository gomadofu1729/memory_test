const set_mode= document.getElementsByName("setMode");
const set_mode_new= document.getElementById("setMode-new");
const set_mode_existing= document.getElementById("setMode-existing");
const new_set_id= document.getElementById("new-set-id");
const set_id_error= document.getElementById("set-id-error");
const existing_set= document.getElementById("existing-set");

const import_type= document.getElementById("import-type");
const select_file= document.getElementById("select-file");
const file_error= document.getElementById("file-error");

const summary= document.getElementById("summary");
const register= document.getElementById("register");

const sections= document.getElementsByTagName("section");
const next1= document.getElementById("next1");
const next2= document.getElementById("next2");
const next3= document.getElementById("next3");
const settle= document.getElementById("settle");

const ID形式 = /^[A-Za-z0-9_]+$/;
let セットID;
let カードセット;
let 仮カードセット;
let 使用ファイル;
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
    set_id_error.classList.add("hide");
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

for(const せ of set_mode){
    せ.addEventListener("change", setMode_change);
}
next1.addEventListener("click", async ()=>{
    const 初期化待ち達= document.querySelectorAll(".wait2");
    for (const よ of 初期化待ち達) {
        よ.disabled = true;
    }
    const 選択= document.querySelector('input[name="setMode"]:checked').value;
    if(選択=== "new"){
        セットID= new_set_id.value;
        if(!セットID){
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
        カードセット= {
            "id": セットID,
            "name": セットID,
            "fields":[],
            "cards":[],
            "methods":[],
            "histories":{},
            "exclusions":{}
        };
    }else{
        if(!existing_set.value){return;}
        セットID= existing_set.value;
        カードセット= await 倉庫番.get(セットID);
    }
    for (const よ of 初期化待ち達) {
        よ.disabled = false;
    }
    display_section(2);
});

import_type.addEventListener("change", ()=>{
    if(import_type.value == "user-file"){
        select_file.classList.remove("hide");
    }else{
        select_file.classList.add("hide");
    }
});
select_file.addEventListener("change", ()=>{
    file_error.classList.add("hide");
    if(!select_file.value){
        file_error.textContent= "ファイルを選択してください。";
        file_error.classList.remove("hide");
        return;
    }

    const 読取= new FileReader();
    読取.addEventListener("load", ()=>{
        仮カードセット= structuredClone(カードセット);
        const テキスト= 読取.result;
        const 表= テキスト.split(/\r?\n/).map((も) => も.split("\t"));
        const 見出し= 表[0];
        if(見出し[0] != "id"){
            file_error.textContent= "1行目の形式が不正です。";
            file_error.classList.remove("hide");
            return;
        }
        const フィールド数= 見出し.length;
        const フィールド総覧= new Set(["id"]);
        const カードパック= 表.slice(1);
        let フィールド重複= false;
        let 重複数= 0;
        let 上書き= false;
        for(const フィールドID of 見出し.slice(1)){
            if(フィールド総覧.has(フィールドID)){
                file_error.textContent= "1行目の形式が不正です。";
                file_error.classList.remove("hide");
                return;
            }
            const フィールド= 仮カードセット.fields.find((ふ) => ふ.id === フィールドID);
            if(フィールド=== undefined){
                仮カードセット.fields.push({"id":フィールドID, "name":フィールドID});
            }else{
                フィールド重複= true;
            }
            フィールド総覧.add(フィールドID);
        }
        const カード総覧= new Set();
        for(const カード of カードパック){
            if(カード.every(セル => セル === "")){
                continue;
            }
            if(カード[0]==""){
                file_error.textContent= "IDが指定されていないカードがあります。";
                file_error.classList.remove("hide");
                return;
            }
            if(カード総覧.has(カード[0])){
                file_error.textContent= `ID${カード[0]}のカードが複数あります。`;
                file_error.classList.remove("hide");
                return;
            }
            if(カード.length > フィールド数){
                file_error.textContent= `ID${カード[0]}のカードの形式が不正です。`;
                file_error.classList.remove("hide");
                return;
            }
            const 既存= 仮カードセット.cards.find((か) => か.id === カード[0]);
            if(既存 !== undefined){
                重複数++;
            }
        }
        if(重複数){
            上書き= confirm(`既存のカードが${重複数}件あります。\n上書きしますか？`);
        }
        for(const カード of カードパック){
            if (カード.every(セル => セル === "")){
                continue;
            }
            const 既存= 仮カードセット.cards.find((か) => か.id === カード[0]);
            const 初出= 既存===undefined;
            const スリーブ= {"id":カード[0], "data":{}};
            for(let i=1; i<フィールド数; i++){
                if(初出 || 上書き || 既存.data[見出し[i]]===undefined){
                    スリーブ.data[見出し[i]]= カード[i];
                }
            }
            if(初出){
                仮カードセット.cards.push(スリーブ);
            }else{
                Object.assign(既存, スリーブ);
            }
        }
    });
    読取.readAsText(select_file.files[0]);
});
next2.addEventListener("click", async ()=>{
    if(仮カードセット=== undefined){return;}
    if(!file_error.classList.contains("hide")){return;}
    await 倉庫番.store(仮カードセット);
    const 初期化待ち達= document.querySelectorAll(".wait3");
    for (const よ of 初期化待ち達) {
        よ.disabled = true;
    }
    display_section(3);

    for (const よ of 初期化待ち達) {
        よ.disabled = false;
    }
});