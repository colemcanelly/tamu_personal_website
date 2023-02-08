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