const searchBar = document.querySelector(".search-container input")
function handleMouseOver() {
}
searchBar.addEventListener("keydown", function(KeyboardEvent){
    if (KeyboardEvent.key == "Enter") {
        window.location.assign(`https://duckduckgo.com/?q=${searchBar.value}`);
    }
});