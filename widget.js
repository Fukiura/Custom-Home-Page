/**
 * Widget Wrapper
 */
class widget {
    static widgetSelected = null;
    static keyPressedBefore = null;

    constructor(name, element) {
        this.name = name;
        this.handlers = [
            element.querySelector(".top-left"),
            element.querySelector(".top-right"),
            element.querySelector(".bottom-left"),
            element.querySelector(".bottom-right")
        ];

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
     * Mouse events 
     * addEventListener("mousedown") makes the widget is selected:
     * 
     *  responsible for moveSelectedWidget()
     */
    initializeMouseEvents() {
        this.element.addEventListener("mousedown", (mouseEvent) => {
            if (mouseEvent.button === 0) {
                widget.widgetSelected = this;
            }
        });

        this.handlers.forEach((handle) => {
            handle.addEventListener("mousedown", (mouseEvent) => {
                if (mouseEvent.button === 0) {
                    console.log("the small box is pressed!");
                }
            });
        });
    }

    /**
     * Keyboard events
     * addEventListener("keydown") saves the widget's properties:
     * 
     *  saving current widget's location
     */
    initializeKeyboardEvents() {
        document.addEventListener("keydown", (event) => {
            if (widget.keyPressedBefore === "Alt" && event.key === "s") {
                this.saveWidgetProperties();
            }

            widget.keyPressedBefore = event.key;
        });
    }

    /**
     * Saves the widget's properties as localStorage items
     * 
     *  x and y: the current position of the widget
     */
    saveWidgetProperties() {
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

    /**
     * Loads the widget's saved position, if saved.
     * 
     *  pos: {x, y} - the saved position of the widget
     */
    loadWidgetPos() {
        let pos = JSON.parse(localStorage.getItem(this.name));
        if (pos !== null) {
            this.setPos(pos.x, pos.y);
        }
    }

    /**
     * Moves the selectedWidget based on the static variable: widgetSelected.
     * 
     * it moves if a widget is selected
     */
    static moveSelectedWidget(moveXY) {
        let selected = widget.widgetSelected;
        if (selected !== null) {
            selected.setPos(
                `${parseFloat(getComputedStyle(selected.element).left) + moveXY[0]}px`,
                `${parseFloat(getComputedStyle(selected.element).top) + moveXY[1]}px`
            );
            widget.widgetSelected = null;
        }
    }
}
