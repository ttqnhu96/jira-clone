import { baseService } from "./baseService";

export class UserService extends baseService {

    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    getUser = (keyword) => {
        return this.get(`Users/getUser?keyword=${keyword}`)
    }
    assignUserProject = (userProject) => {
        return this.post(`Project/assignUserProject`, userProject);
    }
    deleteUserFromProject = (userProject) => {
        return this.post(`Project/removeUserFromProject`, userProject)
    }
    getUserByProjectId = (idProject) => {
        return this.get(`Users/getUserByProjectId?idProject=${idProject}`)
    }
    deleteUserById = (userId) => {
        return this.delete(`Users/deleteUser?id=${userId}`)
    }
    editUser = (userUpdate) => {
        return this.put("Users/editUser", userUpdate)
    }
}
export const userService = new UserService()