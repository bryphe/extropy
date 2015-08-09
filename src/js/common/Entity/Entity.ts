module Extropy.Entity {

    export interface Entity {
        id: string;
        entityManager: BaseEntityManager;

        name?: string;
        position?: any;
        transform?: any;
        entityType?: any;
        parent?: Entity;
        addNetworkVariable?: any;

        addVariable(name: string, initialValue: any, owner?: any, options?: EntityVariableOptions);
        addFunction(name: string, func: () => any);
        getVariableValue(name: string): any;
        setVariableOwner(name: string, owner: any);
        addComponent(component: Component): void;
        getComponentByType(type: Function): Component;

        getFirstComponentByTypeInAncestors(type: Function): Component;
        getComponentsInChildren(type: Function): Component[];

        sendMessage(messageName: string, data: any): void;

        update();
        postUpdate();

        render();
    }
}

