const request = async (method, url, data, file, token = undefined) => {
    const options = {};

    if (method === "POST") {
        options.method = method;
        if (file) {

            options.headers = {
                "Content-Type": 'multipart/form-data',
            };
            options.headers = {
                "user-token": `${token}`,
            };

            const formData = new FormData();
            formData.append("file", file);
            for (const key in data) {
                formData.append(key, data[key]);
            }

            options.body = formData;
        } else {
            options.headers = {
                "Content-Type": "application/json",
            };
            options.body = JSON.stringify(data);
            if (token) {
                options.headers["user-token"] = `${token}`;
            }
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
            response_type: "JSON",
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
            console.log(result.message);
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
