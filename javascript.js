document.documentElement.style.setProperty("--userScreenWidth", `${window.screen.width}px`);
document.documentElement.style.setProperty("--userScreenHeight", `${window.screen.height}px`);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Mouse events helpers
 */
let mouseInitialX = 0;
let mouseInitialY = 0;
let mouseCurrentX = 0;
let mouseCurrentY = 0;
let mouseMoveDifference = [0, 0];
document.addEventListener("mousedown", function(MouseEvent) {
    mouseInitialX = MouseEvent.clientX;
    mouseInitialY = MouseEvent.clientY;
    console.log(mouseInitialX, mouseInitialY);
});
document.addEventListener("mouseup", function(MouseEvent) {
    mouseCurrentX = MouseEvent.clientX;
    mouseCurrentY = MouseEvent.clientY;
    mouseMoveDifference = [mouseCurrentX-mouseInitialX, mouseCurrentY-mouseInitialY];

    // Operations to do after mouse
    console.log(mouseMoveDifference);
    WidgetMove(mouseMoveDifference);
})

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
 * Movement Widget Functionality
 */
let WidgetSelected = null;
const Widgets = document.querySelectorAll(".clock-container");
Widgets.forEach(e => {
    e.addEventListener("mousedown", () => {
        WidgetSelected = e;
    });
});

function WidgetMove(moveXY) {
    if (WidgetSelected !== null) {
        WidgetSelected.style.left = `${parseFloat(getComputedStyle(WidgetSelected).left) + moveXY[0]}px`;
        WidgetSelected.style.top = `${parseFloat(getComputedStyle(WidgetSelected).top) + moveXY[1]}px`;
        WidgetSelected = null;
    }
}

/**
 * Clock Widget
 * If got time, maybe improve the implementation of dowMessages?
 */
const clockWidget = document.querySelector(".clock-container .text-container");
const time = clockWidget.querySelector('[name="time"]');
const date = clockWidget.querySelector('[name="date"]');
const dayOfWeek = clockWidget.querySelector('[name="dayofweek"]')
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
    let mth = curDate.getMonth();
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


updateTime();
setInterval(updateTime, 1000);