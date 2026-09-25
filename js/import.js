const set_mode= document.getElementsByName("setMode");
const new_set_name= document.getElementById("new-set-name");
const existing_set= document.getElementById("existing-set");
const import_type= document.getElementsByName("import-type");
const select_file= document.getElementById("select-file");
const file_info= document.getElementById("file-info");
const methods= document.getElementById("methods");
const add_method= document.getElementById("add-method");
const summary= document.getElementById("summary");
const register= document.getElementById("register");
const sections= document.getElementsByTagName("section");
const Spre= document.getElementsByClassName("Spre");
const Snext= document.getElementsByClassName("Snext");

let カードセット;
async function OP(){
    const 初期化待ち達= document.querySelectorAll(".wait");
    for (const よ of 初期化待ち達) {
        よ.disabled = true;
    }
    await 倉庫番.ready();
    const カードケース= await 倉庫番.enumerate();
    for (const よ of 初期化待ち達) {
        よ.disabled = false;
    }
}
OP();

