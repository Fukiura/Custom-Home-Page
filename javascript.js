document.documentElement.style.setProperty("--userScreenWidth", `${window.screen.width}px`);
document.documentElement.style.setProperty("--userScreenHeight", `${window.screen.height}px`);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Widget Wrapper
 */
class Widget {
    static widgetSelected = null;
    static keyPressedBefore = null;

    constructor(name, element) {
        this.name = name;

        this.animationEnabled = 1; //to be implemented!

        this.element = element;
        this.element.style.left = getComputedStyle(element).left; // x pos
        this.element.style.top = getComputedStyle(element).top; // y pos
        
        this.initializeMouseEvents();
        this.initializeKeyboardEvents();
    }

    getName() {
        return this.name;
    }

    getElement() { 
        return this.element;
    }

    setPos(x, y) {
        this.element.style.left = x;
        this.element.style.top = y;
    }

    /**
     * Movement Widget Functionality
     */
    initializeMouseEvents() {
        this.element.addEventListener("mousedown", () => {
            Widget.widgetSelected = this;
        });
    }

    initializeKeyboardEvents() {
        document.addEventListener("keydown", (event) => {
            if (Widget.keyPressedBefore === "Alt" && event.key === "s") {
                this.saveWidgetPos();
            }

            Widget.keyPressedBefore = event.key;
        });
    }

    /**
     * Saved-Properties Widget Functionality
     */
    saveWidgetPos() {
        localStorage.setItem(
            this.name, 
            JSON.stringify(
                {
                    x: String(this.element.style.left),
                    y: String(this.element.style.top)
                }
            )
        );
    }

    loadWidgetPos() {
        let pos = JSON.parse(localStorage.getItem(this.name));
        console.log(pos);
        if (pos !== null) {
            this.setPos(pos.x, pos.y);
        }
    }

    //Improve the comment below...
    /**
     * Global Move of widget
     */
    static moveSelectedWidget(moveXY) {
        let selected = Widget.widgetSelected;
        if (selected !== null) {
            selected.setPos(
                `${parseFloat(getComputedStyle(selected.element).left) + moveXY[0]}px`,
                `${parseFloat(getComputedStyle(selected.element).top) + moveXY[1]}px`
            );
            Widget.widgetSelected = null;
        }
    }
}

/**
 * Mouse Wrapper
 */
class Mouse {
    static count = 0;

    #mouseInitial = [0, 0];
    #mouseCurrent = [0, 0];
    #mouseMoveDelta = [0, 0];

    constructor() {
        if (++Mouse.count > 1) {
            throw new Error("The mouse wrapper can only be initialized ONCE");
        }

        document.addEventListener("mousedown", (mouseEvent) => {
            this.#mouseInitial = [mouseEvent.clientX, mouseEvent.clientY];
        });

        document.addEventListener("mouseup", (mouseEvent) => {
            this.#mouseCurrent = [mouseEvent.clientX, mouseEvent.clientY];
            this.#mouseMoveDelta = [this.#mouseCurrent[0]-this.#mouseInitial[0], this.#mouseCurrent[1]-this.#mouseInitial[1]];

            this.#mouseUpExecution();
        });
    }

    #mouseUpExecution() {

        // Widget Move Functionality
        Widget.moveSelectedWidget(this.#mouseMoveDelta);
    }
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
const clockWidget = new Widget("clock", document.querySelector(".clock-container"));//document.querySelector(".clock-container .text-container");
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

/**
 * Main Execution of this JS
 */
const mouseListener = new Mouse();

clockWidget.loadWidgetPos();


updateTime();
setInterval(updateTime, 1000);