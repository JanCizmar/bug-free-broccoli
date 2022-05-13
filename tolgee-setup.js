const { Tolgee, IcuFormatter } = window["@tolgee/core"]
const tg = Tolgee.use(IcuFormatter).init({
    apiUrl: "https://app.tolgee.io",
    //apiKey: "",
    inputPrefix: "{{",
    inputSuffix: "}}",
    watch: true,
    ui: window["@tolgee/ui"].UI,
});

tg.run().then(() => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("language-select").value = tg.lang
})

function onLangChange(select) {
    tg.lang = select.value;
}