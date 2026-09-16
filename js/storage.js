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
            });
        });
    },
    async ready(){
        if(倉庫番.db === null){
            await open();
        }
    },
    async store(カードセット){
        await 倉庫番.ready();
        return new Promise((resolve,result)=>{
            const 処理= 倉庫番.db.transaction("カードケース","readwrite");
            const 店= 処理.objectStore("カードケース");
            const 注文= 店.put(カードセット);
            注文.addEventListener("success", ()=>{
                resolve();
            });
            注文.addEventListener("error", ()=>{
                reject(注文.error)
            });
        });
    },
    async get(セットID){
        await 倉庫番.ready();
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
    async enum(){
        await 倉庫番.ready();
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
    async delete(セットID){
        await 倉庫番.ready();
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