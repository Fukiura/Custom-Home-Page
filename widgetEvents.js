/**
 * widgetEvents: implementing widget event listeners
 * 
 * In widget's constructor:
 *  this must be called at the end for the widget's handlers.
 * @requires widget
 */

class widgetEvents {
    #parent;
    #element;
    static #kbKeyBefore = null;
    static widgetSelected = null;

    /**
     * @param {widget} widgetParent 
     * @param {Element} element 
     */
    constructor(widgetParent, element) {
        this.#parent = widgetParent;
        this.#element = element;

        this.#iniMouseEvents();
        this.#iniKeyboardEvents();
    }

    /**
     * Keyboard helper
     * 
     * Sets two keys event listener
     * @param {string} k1 
     * @param {string} k2 
     * @param {string} func
     */
    #iniTwoMultiKeys(k1, k2, func) {
        switch (func) {
            case "saveProperties":
                document.addEventListener("keydown", (e) => {
                    if (widgetEvents.#kbKeyBefore === k1 && e.key === k2) {
                        this.#parent.saveWidgetProperties();
                    }

                    widgetEvents.#kbKeyBefore = e.key;
                });
                break;
        }
    }

    /**
     * Keyboard helper
     * 
     * Sets one key event listener
     * @param {string} k1 
     * @param {string} func 
     */
    #iniSingleKey(k1, func) {
        switch (func) {
            case "undefined":
                break;
            default:
        }
    }

    /**
     * Keyboard events
     * addEventListener("keydown") saves the widget's properties:
     * 
     *  saving current widget's location
     */
    #iniKeyboardEvents() {
        this.#iniTwoMultiKeys("Alt", "s", "saveProperties");
    }

    /**
     * Mouse events 
     * addEventListener("mousedown") makes the widget is selected:
     * 
     *  responsible for moveSelectedWidget()
     */
    #iniMouseEvents() {
        this.#element.addEventListener("mousedown", (mouseEvent) => {
            if (mouseEvent.button === 0) {
                widgetEvents.widgetSelected = this.#parent;
            }
        });

        this.#parent.handlers.forEach((handle) => {
            handle.addEventListener("mousedown", (mouseEvent) => {
                if (mouseEvent.button === 0) {
                    console.log("Small button pressed");
                }
            });
        });
    }
}