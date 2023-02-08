// This function inserts html from a file into an element on the DOM
let injectHTML = async (filePath,elem) => {
    try {
        const response = await fetch(filePath);
        if (!response.ok) return;
        const text = await response.text();
        elem.innerHTML = text;
    } catch (err) {
        console.error(err.message);
    }
}

/*
    This self-invoking function finds all `div` elements with `include` attributes
    and inserts the specified file
*/
let injectAll = (() => {
    document.querySelectorAll("div[include]").forEach(elem => {
        injectHTML(elem.getAttribute("include"),elem);
    });
})();


const STYLE1 = "style1";
const STYLE2 = "style2";
const STYLESHEET_KEY = "current_style_sheet";

let setStyle = (style = "") => {
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