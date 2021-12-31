import { baseService } from "./baseService";

export class PriorityService extends baseService{

    getAllPriority = () => {
        return this.get(`Priority/getAll`)
     }
   

}
export const priorityService = new PriorityService()