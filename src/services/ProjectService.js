import { baseService } from "./baseService";

export class ProjectService extends baseService {

    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    createProject = (newProject) => {
        return this.post(`Project/createProjectAuthorize`, newProject);
    }

    updateProject = (projectUpdate) => {
        return this.put(`Project/updateProject?projectId=${projectUpdate.id}`, projectUpdate)
    }

    getAllProjectCategory = () => {
        return this.get(`ProjectCategory`)
    }

    getAllProject = () => {
        return this.get(`Project/getAllProject`)
    }

    deleteProject = (id) => {
        return this.delete(`Project/deleteProject?projectId=${id}`);
    }

    getProjectDetail = (id) => {
        return this.get(`Project/getProjectDetail?id=${id}`)
    }

}


export const projectService = new ProjectService();