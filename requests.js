class HttpExtension {
    constructor(runtime) {
        this.runtime = runtime;
    }

    getInfo() {
        const httpMethods = [
            "GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH", "CONNECT", "TRACE"
        ];

        return {
            "id": "httpextension",
            "name": "HTTP Extension",
            "blocks": [
                {
                    "opcode": "httpRequest",
                    "blockType": "reporter",
                    "text": "HTTP [method] request to [url]",
                    "arguments": {
                        "method": {
                            "type": "string",
                            "menu": "httpMethods",
                            "defaultValue": "GET"
                        },
                        "url": {
                            "type": "string",
                            "defaultValue": "https://jsonplaceholder.typicode.com/posts/1"
                        }
                    }
                },
                {
                    "opcode": "parseJSON",
                    "blockType": "reporter",
                    "text": "parse JSON [text]",
                    "arguments": {
                        "text": {
                            "type": "string",
                            "defaultValue": "{}"
                        }
                    }
                },
                {
                    "opcode": "getJSONProperty",
                    "blockType": "reporter",
                    "text": "get property [property] from JSON [text]",
                    "arguments": {
                        "property": {
                            "type": "string",
                            "defaultValue": "propertyName"
                        },
                        "text": {
                            "type": "string",
                            "defaultValue": "{}"
                        }
                    }
                },
                {
                    "opcode": "modifyJSONProperty",
                    "blockType": "reporter",
                    "text": "set property [property] of JSON [text] to [value]",
                    "arguments": {
                        "property": {
                            "type": "string",
                            "defaultValue": "propertyName"
                        },
                        "text": {
                            "type": "string",
                            "defaultValue": "{}"
                        },
                        "value": {
                            "type": "string",
                            "defaultValue": "newValue"
                        }
                    }
                }
            ],
            "menus": {
                "httpMethods": httpMethods
            }
        };
    }

    async httpRequest({ method, url }) {
        try {
            const response = await fetch(url, { method });
            if (response.ok) {
                const data = await response.json();
                return JSON.stringify(data);
            } else {
                return "Error: " + response.status;
            }
        } catch (error) {
            console.error(error);
            return "Error: " + error.message;
        }
    }

    parseJSON({ text }) {
        try {
            const parsedData = JSON.parse(text);
            return parsedData;
        } catch (error) {
            console.error(error);
            return "Error: " + error.message;
        }
    }

    getJSONProperty({ property, text }) {
        try {
            const jsonData = JSON.parse(text);
            if (jsonData.hasOwnProperty(property)) {
                return jsonData[property];
            } else {
                return "Property not found";
            }
        } catch (error) {
            console.error(error);
            return "Error: " + error.message;
        }
    }

    modifyJSONProperty({ property, text, value }) {
        try {
            const jsonData = JSON.parse(text);
            jsonData[property] = value;
            return JSON.stringify(jsonData);
        } catch (error) {
            console.error(error);
            return "Error: " + error.message;
        }
    }
}

Scratch.extensions.register(new HttpExtension());
