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
                    "text": "HTTP [method] request to [url] with options [options]",
                    "arguments": {
                        "method": {
                            "type": "string",
                            "menu": "httpMethods",
                            "defaultValue": "GET"
                        },
                        "url": {
                            "type": "string",
                            "defaultValue": "https://example.com/"
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
            ],
            "menus": {
                "httpMethods": httpMethods
            }
        };
    }

    async httpRequest({ method, url, options }) {
        try {
            const requestOptions = JSON.parse(options);
            const response = await fetch(url, { 
                method, 
                mode: 'no-cors',
                ...requestOptions 
            });
            if (response.ok) {
                const data = await response.json();
                return JSON.stringify(data);
            } else {
                return "Error: " + response.status + response.message;
            }
        } catch (error) {
            console.error(error);
            return "Error: " + response.status + error.message;
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
}

Scratch.extensions.register(new HttpExtension());
