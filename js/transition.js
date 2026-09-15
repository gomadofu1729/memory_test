const visit= {
    index(){
        window.location.href= `index.html`;
    },
    memorize(セット){
        window.location.href= `memorize.html?set=${セット}`;
    },
    import(){
        window.location.href= `import.html`;
    },
    setting(セット){
        window.location.href= `set_setting.html?set=${セット}`;
    },
    cards(セット){
        window.location.href= `cards.html?set=${セット}`;
    },
    methods(セット){
        window.location.href= `methods.html?set=${セット}`;
    },
    exclusion(セット){
        window.location.href= `exclusion.html?set=${セット}`;
    }
}