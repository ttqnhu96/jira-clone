import { baseService } from "./baseService";

export class StatusService extends baseService {

    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    getAllStatus = () => {
        return this.get(`Status/getAll`)
    }

}


export const statusService = new StatusService();