module Extropy {

    export class ViewBox {

        /*
         * ViewBox - scales the first child to fit the sized outerElement, using CSS transforms
         */
        constructor(outerElement: HTMLElement) {
            // TODO: Implement actual scalesing

            if(outerElement.firstElementChild) {
                var child = <HTMLElement>outerElement.firstElementChild;
                child.style.width = "100%";
                child.style.height = "100%";
            }
        }

    }
}

