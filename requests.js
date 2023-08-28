class HttpExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.data = {};
    }

    getInfo() {
        return {
            "id": "httpextension",
            "name": "HTTP Extension",
            "blocks": [
                {
                    "opcode": "httpRequest",
                    "blockType": "reporter",
                    "text": "HTTP [method] request to [url] with options [options]",
                    "arguments": {
                        "method": {
                            "type": "string",
                            "menu": "httpMethods",
                            "defaultValue": "GET"
                        },
                        "url": {
                            "type": "string",
                            "defaultValue": "https://jsonplaceholder.typicode.com/posts/1"
                        },
                        "options": {
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
                    "opcode": "getProperty",
                    "blockType": "reporter",
                    "text": "get property [property] from [text]",
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
                    "opcode": "setProperty",
                    "blockType": "command",
                    "text": "set property [property] to [value]",
                    "arguments": {
                        "property": {
                            "type": "string",
                            "defaultValue": "propertyName"
                        },
                        "value": {
                            "type": "any",
                            "defaultValue": ""
                        }
                    }
                },
                {
                    "opcode": "modifyProperty",
                    "blockType": "command",
                    "text": "modify property [property] by [value]",
                    "arguments": {
                        "property": {
                            "type": "string",
                            "defaultValue": "propertyName"
                        },
                        "value": {
                            "type": "number",
                            "defaultValue": 0
                        }
                    }
                },
                {
                    "opcode": "deleteProperty",
                    "blockType": "command",
                    "text": "delete property [property]",
                    "arguments": {
                        "property": {
                            "type": "string",
                            "defaultValue": "propertyName"
                        }
                    }
                }
            ],
            "menus": {
                "httpMethods": ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH", "CONNECT", "TRACE"]
            }
        };
    }

    async httpRequest({ method, url, options }) {
        try {
            const requestOptions = JSON.parse(options);

            const response = await fetch(url, {
                method: method,
                ...requestOptions,
            });

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

    getProperty({ property, text }) {
        try {
            const jsonData = JSON.parse(text);
            if (jsonData.hasOwnProperty(property)) {
                return this.data[property];
            } else {
                return "Property not found";
            }
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

    setProperty({ property, value }) {
        this.data[property] = value;
    }

    modifyProperty({ property, value }) {
        if (this.data[property] !== undefined) {
            this.data[property] += value;
        }
    }

    deleteProperty({ property }) {
        if (this.data[property] !== undefined) {
            delete this.data[property];
        }
    }
}

Scratch.extensions.register(new HttpExtension());
