const 倉庫番= {
    db: null,
    open(){
        return new Promise((resolve,result)=>{
            const 注文= indexedDB.open("めもりーくぇすちょねあ", 1);
            注文.addEventListener("upgradeneeded", ()=>{
                const 結果= 注文.result;
                結果.createObjectStore("カードケース",{keyPath:"id"});
            });
            注文.addEventListener("success", ()=>{
                倉庫番.db= 注文.result;
                resolve();
            });
            注文.addEventListener("error", ()=>{
                reject(注文.error);
            })
        })
        
    },
    store(カードセット){
        const 処理= 倉庫番.db.transaction("カードケース","readwrite");
        const 店= 処理.objectStore("カードケース"); //「たな」と読む。以下同じ。
        店.put(カードセット);
    },
    get(セットID){
        return new Promise((resolve,result)=>{
            const 処理= 倉庫番.db.transaction("カードケース","readonly");
            const 店= 処理.objectStore("カードケース");
            const 注文= 店.get(id);
            注文.addEventListener("success", ()=>{
                resolve(注文.result);
            });
            注文.addEventListener("error", ()=>{
                reject(注文.error)
            });
        });
    },
    enum(){
        return new Promise((resolve,result)=>{
            const 処理= 倉庫番.db.transaction("カードケース","readonly");
            const 店= 処理.objectStore("カードケース");
            const 注文= 店.getAll();
            注文.addEventListener("success", ()=>{
                resolve(注文.result);
            });
            注文.addEventListener("error", ()=>{
                reject(注文.error)
            });
        });
    },
    delete(セットID){
        return new Promise((resolve,result)=>{
            const 処理= 倉庫番.db.transaction("カードケース","readonly");
            const 店= 処理.objectStore("カードケース");
            const 注文= 店.delete(id);
            注文.addEventListener("success", ()=>{
                resolve();
            });
            注文.addEventListener("error", ()=>{
                reject(注文.error)
            });
        });
    }
}