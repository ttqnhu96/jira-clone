import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect, useState } from 'react'
import { Select, Slider } from 'antd';
import { useSelector, useDispatch, connect } from 'react-redux'
import { CREATE_TASK_SAGA, GET_ALL_PRIORITY_SAGA, GET_ALL_STATUS_SAGA, GET_ALL_TASK_TYPE_SAGA, GET_PROJECT_DROPDOWN_LIST_SAGA, GET_USER_BY_PROJECT_ID_SAGA, GET_USER_SAGA, SET_SUBMIT_CREATE_TASK } from '../../../redux/constants/Cyberbugs/Cyberbugs';
import { withFormik } from 'formik';
import * as Yup from 'yup';



const { Option } = Select;

const children = [];

for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function FormCreateTask(props) {

    //Get data from redux 
    const { projectDropDownList } = useSelector(state => state.ProjectReducer);
    const { arrTaskType } = useSelector(state => state.TaskReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrStatus } = useSelector(state => state.StatusReducer);
    const { arrUser } = useSelector(state => state.UserReducer);


    const dispatch = useDispatch();

    //Hàm biến đổi options cho thẻ select
    const userOptions = arrUser.map((item, index) => {
        return { value: item.userId, label: item.name }
    })

    const {
        handleChange,
        handleSubmit,
        setFieldValue
    } = props;

    const [size] = React.useState('default');

    const [timeTracking, setTimetracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    })



    //hook
    useEffect(() => {
        dispatch({ type: GET_PROJECT_DROPDOWN_LIST_SAGA });
        dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
        dispatch({ type: GET_ALL_PRIORITY_SAGA });
        dispatch({ type: GET_ALL_STATUS_SAGA });
        dispatch({ type: GET_USER_SAGA, keyWord: '' });

        //Load sự kiện submit lên drawer nút submit
        dispatch({ type: SET_SUBMIT_CREATE_TASK, submitFunction: handleSubmit });
    }, [dispatch, handleSubmit])


    const children = [];
    return (
        <div className="container">
            <div className="form-group" onSubmit={handleSubmit}>
                <p>Project</p>
                <select name="projectId" className="form-control" onChange={(e) => {
                    //Dispatch giá trị làm thay đổi arrUser
                    let { value } = e.target;
                    dispatch({
                        type: GET_USER_BY_PROJECT_ID_SAGA,
                        idProject: value
                    })
                    //Cập nhật giá trị cho project Id
                    setFieldValue('projectId', e.target.value);
                }}>
                    {projectDropDownList.map((project, index) => {
                        return <option key={index} value={project.id}>{project.projectName}</option>
                    })}
                </select>
            </div>
            <div className="form-group">
                <p>Task name</p>
                <input name="taskName" className="form-control" onChange={handleChange} />
            </div>
            <div className="form-group">
                <p>Status</p>
                <select name="statusId" className="form-control" onChange={handleChange}>
                    {arrStatus.map((statusItem, index) => {
                        return <option key={index} value={statusItem.statusId}>{statusItem.statusName}</option>
                    })}
                </select>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Priority</p>
                        <select name="priorityId" className="form-control" onChange={handleChange}>
                            {arrPriority.map((priority, index) => {
                                return <option key={index} value={priority.priorityId}>
                                    {priority.priority}
                                </option>
                            })}
                        </select>
                    </div>
                    <div className="col-6">
                        <p>Task type</p>
                        <select className="form-control" name="typeId" onChange={handleChange}>
                            {arrTaskType.map((taskType, index) => {
                                return <option key={index} value={taskType.id}>{taskType.taskType}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Assignees</p>
                        <Select
                            mode="multiple"
                            size={size}
                            options={userOptions}
                            placeholder="Please select"
                            optionFilterProp="label"
                            onChange={(values) => {
                                setFieldValue('listUserAsign', values);
                            }}
                            onSelect={(value) => {
                            }}
                            style={{ width: '100%' }}
                        >
                            {children}
                        </Select>
                        <div className="row mt-3">
                            <div className="col-12">
                                <p>Original Estimate</p>
                                <input type="number" min="0" name="originalEstimate" defaultValue="0" className="form-control" height="30" onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <p>Time tracking</p>

                        <Slider defaultValue={30} value={timeTracking.timeTrackingSpent} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                        <div className="row">
                            <div className="col-6 text-left font-weight-bold">{timeTracking.timeTrackingSpent}h logged</div>
                            <div className="col-6 text-right font-weight-bold">{timeTracking.timeTrackingRemaining}h remaining</div>
                        </div>
                        <div className="row" style={{ marginTop: 5 }}>
                            <div className="col-6">
                                <p>Time spent</p>
                                <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingSpent" onChange={(e) => {
                                    setTimetracking({
                                        ...timeTracking,
                                        timeTrackingSpent: e.target.value
                                    });

                                    setFieldValue('timeTrackingSpent', e.target.value);
                                }} />
                            </div>

                            <div className="col-6">
                                <p>Time remaining</p>
                                <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingRemaining" onChange={(e) => {
                                    setTimetracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: e.target.value
                                    });

                                    setFieldValue('timeTrackingRemaining', e.target.value);
                                }} />
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div className="form-group">
                <p>Description</p>
                <Editor
                    name="description"
                    initialValue=""
                    init={{
                        selector: 'textarea#myTextArea',
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}

                    onEditorChange={(content, editor) => {
                        setFieldValue('description', content);
                    }}
                />
            </div>
        </div>
    )
}

const frmCreateTask = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { projectDropDownList, arrTaskType, arrPriority, arrStatus } = props;

        return {
            taskName: '',
            description: '',
            statusId: arrStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: projectDropDownList[0]?.id,
            typeId: arrTaskType[0]?.id,
            priorityId: arrPriority[0]?.priorityId,
            listUserAsign: []
        }
    },
    validationSchema: Yup.object().shape({


    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: CREATE_TASK_SAGA,
            taskObject: values
        })
    },
    displayName: 'createTaskForm',
})(FormCreateTask);

const mapStateToProps = (state) => {
    return {
        projectDropDownList: state.ProjectReducer.projectDropDownList,
        arrTaskType: state.TaskReducer.arrTaskType,
        arrPriority: state.PriorityReducer.arrPriority,
        arrStatus: state.StatusReducer.arrStatus,
    }
}

export default connect(mapStateToProps)(frmCreateTask);