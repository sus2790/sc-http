class HttpExtension {
    constructor(runtime) {
        this.runtime = runtime;
    }

    getInfo() {
        return {
            "id": "httpextension",
            "name": "HTTP Extension",
            "blocks": [
                {
                    "opcode": "httpGet",
                    "blockType": "reporter",
                    "text": "HTTP GET request to [url]",
                    "arguments": {
                        "url": {
                            "type": "string",
                            "defaultValue": "https://jsonplaceholder.typicode.com/posts/1"
                        }
                    }
                }
            ]
        };
    }

    async httpGet({ url }) {
        try {
            const response = await fetch(url);
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
}

Scratch.extensions.register(new HttpExtension());
