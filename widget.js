/**
 * Widget Wrapper
 * @requires widgetEvents
 */
class widget {
    constructor(name, element) {
        this.name = name;

        this.animationEnabled = 1; //to be implemented!
        this.element = element;
        this.curPos = [parseFloat(getComputedStyle(element).getPropertyValue("left")), parseFloat(getComputedStyle(element).getPropertyValue("top"))]; // x and y pos

        this.handlers = [
            element.querySelector(".top-left"),
            element.querySelector(".top-right"),
            element.querySelector(".bottom-left"),
            element.querySelector(".bottom-right")
        ];

        this.widgetEventListener = new widgetEvents(this, element);
    }

    getName() {
        return this.name;
    }

    getElement() { 
        return this.element;
    }

    /**
     * @param {number} x 
     * @param {number} y 
     */
    setPos(x, y) {
        this.element.style.left = String(x) + "px";
        this.element.style.top = String(y) + "px";
        this.curPos = [x, y];
    }

    moveBy(x, y) {
        this.element.style.left = String(this.curPos[0] + x) + "px";
        this.element.style.top = String(this.curPos[1] + y) + "px";
        this.curPos[0] += x;
        this.curPos[1] += y;
        console.log(this.curPos);
    }

    /**
     * Saves the widget's properties as localStorage items
     * assigned with the widget's name
     * 
     *  number x and number y: the current position of the widget
     */
    saveWidgetProperties() {
        localStorage.setItem(
            this.name, 
            JSON.stringify(
                {
                    x: this.curPos[0],
                    y: this.curPos[1]
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
        let savedPos = JSON.parse(localStorage.getItem(this.name));
        if (savedPos !== null) {
            this.setPos(savedPos.x, savedPos.y);
        }
    }

    /**
     * Moves the selectedWidget based on the static variable: widgetSelected.
     * 
     * it moves if a widget is selected
     * @param {Array<Float32Array>} moveXY
     */
    static moveSelectedWidget(moveXY) {
        let selectedWidget = widgetEvents.widgetSelected;
        if (selectedWidget !== null) {
            selectedWidget.moveBy(
                moveXY[0],
                moveXY[1]
            );
            widgetEvents.widgetSelected = null;
        }
    }

    static scaleSelectedWidget(scaleFactor) {
        
    }
}
