import { RestService } from "./rest.service.js";

export class SearchService extends RestService {
    constructor() {
        super("searchBy");
    }

    // search model by name
    searchModelByName(manufacturer ,modelName) {
        this.resourceUrl = `searchBy?manufacturer=${manufacturer}&modelName=${modelName}`;

        return this.getAll();
    }
}
