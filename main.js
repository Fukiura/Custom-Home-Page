/**
 * Main script of customHomePage.html
 * @requires mouse
 * @requires widget
 */

document.documentElement.style.setProperty("--userScreenWidth", `${window.screen.width}px`);
document.documentElement.style.setProperty("--userScreenHeight", `${window.screen.height}px`);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Search Bar Functionality
 */
const searchBar = document.querySelector(".search-container input")
searchBar.addEventListener("keydown", function(KeyboardEvent){
    if (KeyboardEvent.key == "Enter") {
        window.location.assign(`https://duckduckgo.com/?q=${searchBar.value}`);
    }
});

/**
 * Clock Widget
 * If got time, maybe improve the implementation of dowMessages?
 */
const clockWidget = new widget("clock", document.querySelector(".clock-container"));
const time = clockWidget.getElement().querySelector('[name="time"]');
const date = clockWidget.getElement().querySelector('[name="date"]');
const dayOfWeek = clockWidget.getElement().querySelector('[name="dayofweek"]')
const dows = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dowMessages = [
    `It's the beloved !`,
    `Ehhh, it's .`,
    `Today is .`,
    `Happy !`,
    `Greetings .`,
    `Welcome .`,
];
const randomDowsMsgs = Math.floor(Math.random() * dowMessages.length);

function updateTime() {
    let curDate = new Date();
    let hrs = curDate.getHours();
    let mins = curDate.getMinutes();
    let secs = curDate.getSeconds();
    let label = "AM";
    let mth = curDate.getMonth()+1;
    let day = curDate.getDate();
    let yr = curDate.getFullYear();
    let dow = curDate.getDay();
    
    if (hrs > 11 && hrs < 24) {
        label = "PM";
        hrs -= 12;
    }

    if (hrs == 0) {
        hrs = 12;
    }

    let timeFormat = `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")} ${label}`;
    let dateFormat = `${mth}/${day}/${yr}`;
    let dowFormat = dowMessages[randomDowsMsgs].slice(0, -1) + dows[dow] + dowMessages[randomDowsMsgs].slice(-1);


    time.textContent = timeFormat;
    date.textContent = dateFormat;
    dayOfWeek.textContent = dowFormat;
}

/**
 * Main Execution of this JS
 */
const mouseListener = new mouse(1);

//Load widget saves
//clockWidget.loadWidgetPos();


updateTime();
setInterval(updateTime, 1000);