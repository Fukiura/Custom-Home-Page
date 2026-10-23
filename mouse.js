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
        if (++mouse.count > 1) {
            throw new Error("The mouse wrapper can only be initialized ONCE");
        }

        if (debug) {
            document.addEventListener("mousedown", (mouseEvent) => {
                this.#mouseInitial = [mouseEvent.clientX, mouseEvent.clientY];
            });

            document.addEventListener("mouseup", (mouseEvent) => {
                this.#mouseCurrent = [mouseEvent.clientX, mouseEvent.clientY];
                this.#mouseMoveDelta = [this.#mouseCurrent[0]-this.#mouseInitial[0], this.#mouseCurrent[1]-this.#mouseInitial[1]];

                console.log(
                    `Initial Mouse Position: ${this.#mouseInitial[0]}, ${this.#mouseInitial[1]}\n` +
                    `Current Mouse Position: ${this.#mouseCurrent[0]}, ${this.#mouseCurrent[1]}\n` +
                    `Delta Mouse Movement: ${this.#mouseMoveDelta[0]}, ${this.#mouseMoveDelta[1]}` 
                );

                this.#mouseInitial = this.#mouseCurrent;
            });
        }

        else {
            document.addEventListener("mousedown", (mouseEvent) => {
                this.#mouseInitial = [mouseEvent.clientX, mouseEvent.clientY];
            });

            document.addEventListener("mouseup", (mouseEvent) => {
                this.#mouseCurrent = [mouseEvent.clientX, mouseEvent.clientY];
                this.#mouseMoveDelta = [this.#mouseCurrent[0]-this.#mouseInitial[0], this.#mouseCurrent[1]-this.#mouseInitial[1]];
                this.#mouseInitial = this.#mouseCurrent;

                this.#mouseUpExecution();
            });
        }
    }

    #mouseUpExecution() {
        // Widget Move Functionality
        widget.moveSelectedWidget(this.#mouseMoveDelta);
    }
}
