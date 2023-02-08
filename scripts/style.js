const STYLE1 = "style1";
const STYLE2 = "style2";
const STYLESHEET_KEY = "current_style_sheet";

function setStyle(style = "") {
    if (style === "") style = localStorage.getItem(STYLESHEET_KEY) || "style1";
    style = style + '/';
    document.querySelectorAll("link[href]").forEach(elem => {
        let sheet = elem.getAttribute("href").split("/")[1];
        elem.setAttribute("href", style + sheet);
    });
}

let styleToggle = () => {
    const style = document.querySelector("link[href]").getAttribute("href").includes(STYLE1) ? STYLE2 : STYLE1;
    setStyle(style);
    localStorage.setItem(STYLESHEET_KEY, style);
}

window.onload = () => { setStyle(); }