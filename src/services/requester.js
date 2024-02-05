const request = async (method, url, data, token = undefined) => {
    const options = {};

    if (method === "POST") {
        options.method = method;
        if (data) {
            options.headers = {
                "Content-Type": "application/json",
            };

            options.body = JSON.stringify(data);
        }
    }

    if (method === "PUT") {
        options.method = method;
        if (data) {
            options.headers = {
                "Content-Type": "application/json",
            };

            options.body = JSON.stringify(data);
        }
    }

    if (method === "GET") {
        options.method = method;

        if (token) {
            options.headers = {
                "user-token": `${token}`,
                "content-type": "application/json",
            };
        }

        options.headers = {
            "response_type": "JSON",
            "api_key": "8b1fdb20-2d0e-4400-a885-a8b2b3331162",
            // "Access-Control-Allow-Origin": "*",
        };
    }

    try {
        const response = await fetch(url, options);

        if (response.status === 204) {
            return {};
        }

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message);
        }
        if (result) {
            return result;
        }
    } catch (error) {
        console.log(error);
    }
};

export const get = request.bind(null, "GET");
export const post = request.bind(null, "POST");
export const put = request.bind(null, "PUT");
export const patch = request.bind(null, "PATCH");
export const del = request.bind(null, "DELETE");
