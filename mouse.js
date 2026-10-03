/**
 * Mouse Wrapper
 * @requires widget
 */
class mouse {
    static count = 0;

    #mouseInitial = [0, 0];
    #mouseCurrent = [0, 0];
    #mouseMoveDelta = [0, 0];

    constructor(debug) {
        if (debug === undefined) {
            if (++mouse.count > 1) {
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

        else {
            document.addEventListener("mouseup", (mouseEvent) => {
                //print mouse current location
                let curPos = [mouseEvent.clientX, mouseEvent.clientY];
                console.log(`
                    Current Mouse Position: ${curPos[0]}, ${curPos[1]}
                `.trim());
            });
        }
        
    }

    #mouseUpExecution() {

        // Widget Move Functionality
        widget.moveSelectedWidget(this.#mouseMoveDelta);
    }
}
