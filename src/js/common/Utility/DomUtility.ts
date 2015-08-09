module Extropy {

    export class DomUtility {

        public static createElementFromTemplate(templateId: string) : HTMLElement {
            var element = document.getElementById(templateId);
            assertValue(element);

            var markup = element.innerHTML;

            var returnElement = document.createElement("div");
            returnElement.innerHTML = markup;
            var child = returnElement.children[0];
            return <HTMLElement>child;
        }

        public static isAncestorOf(elementToTest: HTMLElement, ancestorElement: HTMLElement): boolean {
            
            while (elementToTest) {
                if (elementToTest === ancestorElement)
                    return true;

                elementToTest = elementToTest.parentElement;
            }

            return false;
        }
    }
}

