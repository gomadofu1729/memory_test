const 飛脚= {
    download(中身, 名前, 方式){
        console.log(名前)
        const ブロブ= new Blob([中身], {type: 方式});
        const url= URL.createObjectURL(ブロブ);
        const リンク= document.createElement("JohnDoe");
        リンク.href= url;
        リンク.download= `${名前}.${方式}`;
        リンク.click();
        URL.revokeObjectURL(url);
    },
    history(カードセット){
        飛脚.download(
            JSON.stringify(カードセット, null, 4),
            `${カードセット.name}.json`,
            "application/json"
        );
    },
    data(カードセット){
        const 見出し= カードセット.fields.map((ふ) => ふ.id);
        const 中身= [["id"].concat(見出し).join("\t")];
        for(const カード of カードセット.cards){
            const 行 =[カード.id];
            for(フィールド of 見出し){
                行.push(カード.data[フィールド]);
            }
            中身.push(行.join("\t"));
        }
        const tsv= 中身.join("\n");
        飛脚.download(
            tsv,
            `${カードセット.name}.tsv`,
            "text/tab-separated-values"
        );
    }
}