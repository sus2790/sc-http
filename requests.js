class HttpExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.data = {}; // 初始化一个空对象来存储属性
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

    setProperty({ property, value }) {
        // 设置属性
        this.data[property] = value;
    }

    modifyProperty({ property, value }) {
        // 修改属性
        if (this.data[property] !== undefined) {
            this.data[property] += value;
        }
    }

    deleteProperty({ property }) {
        // 删除属性
        if (this.data[property] !== undefined) {
            delete this.data[property];
        }
    }
}

Scratch.extensions.register(new HttpExtension());
