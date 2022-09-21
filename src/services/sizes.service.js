import { RestService } from "./rest.service.js";

export class SizesService extends RestService {
    constructor() {
        super("sizes");
    }

    // get models with specific sizes and criterias
    async getModelSizes(width, height, diameter, season, manufacturer) {
        this.resourceUrl = `sizes?width=${width}&height=${height}&diameter=${diameter}&season=${season}&manufacturer=${manufacturer}`;
        
        return await this.getAll();
    }

    // get all sizes by modelId
    async getSizesByModelId(modelId) {
        this.resourceUrl = "sizes/model-sizes/" + modelId;

        return await this.getAll();
    }
}
