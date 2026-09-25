const 船頭= {
    index(){
        window.location.href= "index.html";
    },
    memorize(セットID){
        window.location.href= `memorize.html?set=${セットID}`;
    },
    import(){
        window.location.href= "import.html";
    },
    importID(セットID){
        window.location.href= `import.html?set=${セットID}`;
    }
    setting(セットID){
        window.location.href= `set_setting.html?set=${セットID}`;
    },
    cards(セットID){
        window.location.href= `cards.html?set=${セットID}`;
    },
    methods(セットID){
        window.location.href= `methods.html?set=${セットID}`;
    },
    exclusion(セットID){
        window.location.href= `exclusion.html?set=${セットID}`;
    }
}