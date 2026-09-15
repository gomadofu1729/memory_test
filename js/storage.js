const 蔵= {
    db: null,
    open(){
        const DBリクエスト= indexedDB.open("めもりーくぇすちょねあ", 1);
        DBリクエスト.addEventListener("upgradeneeded", ()=>{
            const 結果= DBリクエスト.result;
            結果.createObjectStore("Card_Sets",{keyPath:"id"});
        })
        DBリクエスト.addEventListener("success", ()=>{
            蔵.db= DBリクエスト.result;
        })
    }
    
}