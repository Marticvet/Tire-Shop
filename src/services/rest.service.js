import Config from "../Config.js";

export class RestService {
    resourceUrl;
    baseUrl = Config.BASE_URL;

    constructor(resourceUrl) {
        this.resourceUrl = resourceUrl;
    }

    async getAll() {
        return await fetch(this.baseUrl + this.resourceUrl, {
            method: "GET",
        })
            .then(async (result) => await result.json())
            .catch(this.handleError);
    }

    create(data) {
        return fetch(this.baseUrl + this.resourceUrl, {
            method: "POST",
            headers: this.buildDefaultHeaders(),
            body: JSON.stringify(data),
        })
            .then((result) => result.json())
            .catch(this.handleError);
    }

    update(id, data) {
        return fetch(this.baseUrl + this.resourceUrl + "/" + id, {
            method: "PUT",
            headers: this.buildDefaultHeaders(),
            body: JSON.stringify(data),
        })
            .then((result) => result.json())
            .catch(this.handleError);
    }

    getOneById(id) {
        return fetch(this.baseUrl + this.resourceUrl + "/" + id, {
            method: "GET",
            headers: this.buildDefaultHeaders(),
        })
            .then((result) => result.json())
            .catch(this.handleError);
    }

    delete() {
        return fetch(this.baseUrl + this.resourceUrl, {
            method: "DELETE",
            headers: this.buildDefaultHeaders(),
        }).catch(this.handleError);
    }

    buildDefaultHeaders() {
        const headers = new Headers();

        headers.append("Authorization", localStorage.getItem('token'));
        headers.append("Content-Type", "application/json");

        return headers;
    }

    handleError(err) {
        console.log(err);
    }
}
