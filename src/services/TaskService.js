import { baseService } from "./baseService";

export class TaskService extends baseService {

    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    getAllTaskType = () => {
        return this.get('TaskType/getAll');
    }

    createTask = (taskObject) => {
        return this.post('Project/createTask', taskObject);
    }

    getTaskDetail = (taskId) => {
        return this.get(`Project/getTaskDetail?taskId=${taskId}`)
    }

    updateTask = (taskUpdate) => {
        return this.post(`Project/updateTask`, taskUpdate);
    }

    updateStatusTask = (taskStatusUpdate) => {
        return this.put(`Project/updateStatus`,taskStatusUpdate);
    }

    getAllComment = () => {
        return this.get('Comment/getAll');
    }

    createComment = (commentObject) => {
        return this.post('Comment/insertComment', commentObject);
    }

    deleteComment = (idComment) => {
        return this.delete(`Comment/deleteComment?idComment=${idComment}`);
    }

    updateComment = (commentUpdate) => {
        return this.put(`Comment/updateComment?id=${commentUpdate.id}&contentComment=${commentUpdate.contentComment}`);
    }

}


export const taskService = new TaskService();