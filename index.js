class MyExtension {
    constructor(runtime) {
        this.runtime = runtime;
    }

    getInfo() {
        return {
            "id": "myextension",
            "name": "My Extension",
            "blocks": [
                {
                    "opcode": "addNumbers",
                    "blockType": "reporter",
                    "text": "add [num1] and [num2]",
                    "arguments": {
                        "num1": {
                            "type": "number",
                            "defaultValue": 0
                        },
                        "num2": {
                            "type": "number",
                            "defaultValue": 0
                        }
                    }
                }
            ]
        };
    }

    addNumbers({ num1, num2 }) {
        // 在這裡實現方塊的功能
        const result = num1 + num2;
        return result;
    }
}

Scratch.extensions.register(new MyExtension());
