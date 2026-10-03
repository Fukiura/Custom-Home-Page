/**
 * Widget Wrapper
 */
class widget {
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
            widget.widgetSelected = this;
        });
    }

    initializeKeyboardEvents() {
        document.addEventListener("keydown", (event) => {
            if (widget.keyPressedBefore === "Alt" && event.key === "s") {
                this.saveWidgetPos();
            }

            widget.keyPressedBefore = event.key;
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
