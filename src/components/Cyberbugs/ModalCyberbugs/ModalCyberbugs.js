import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import { CHANGE_ASSIGNEES, CHANGE_TASK_MODAL, CREATE_COMMENT_SAGA, DELETE_COMMENT_SAGA, EDIT_COMMENT, GET_ALL_COMMENT_SAGA, GET_ALL_PRIORITY_SAGA, GET_ALL_STATUS_SAGA, GET_ALL_TASK_TYPE_SAGA, HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASSIGN, UPDATE_COMMENT_SAGA } from '../../../redux/constants/Cyberbugs/Cyberbugs';
import { Editor } from '@tinymce/tinymce-react';
import { USER_LOGIN } from '../../../util/constants/settingSystem';
import { Select, List, Avatar } from 'antd';

export default function ModalCyberbugs() {
    const { taskDetailModal } = useSelector(state => state.TaskReducer);
    const { arrStatus } = useSelector(state => state.StatusReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrTaskType } = useSelector(state => state.TaskReducer);
    const { projectDetail } = useSelector(state => state.ProjectReducer);
    const [visibleEditor, setVisibleEditor] = useState(false);
    const [historyContent, setHistoryContent] = useState(taskDetailModal.description);
    const [content, setContent] = useState(taskDetailModal.description);

    const [visibleCommentEditor, setVisibleCommentEditor] = useState(false);
    const { commentEdit } = useSelector(state => state.TaskReducer);
    const [commmentEditContent, setCommmentEditContent] = useState("");

    const dispatch = useDispatch();

    const editorRef = useRef(null);

    useEffect(() => {
        dispatch({ type: GET_ALL_STATUS_SAGA });
        dispatch({ type: GET_ALL_PRIORITY_SAGA });
        dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
        dispatch({ type: GET_ALL_COMMENT_SAGA });
    }, [dispatch])

    const renderCommentContent = (item) => {
        if (item.id !== commentEdit.id) {
            return <div>{ReactHtmlParser(item.commentContent)}</div>
        }
        else {
            return <div><Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={commentEdit.content}
                init={{
                    height: 150,
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
                onEditorChange={(newValue, editor) => setCommmentEditContent(newValue)}
            />
                <button className="btn btn-primary" onClick={() => {
                    dispatch({
                        type: UPDATE_COMMENT_SAGA,
                        commentUpdate: {
                            taskId: taskDetailModal.taskId,
                            id: item.id,
                            contentComment: commmentEditContent
                        }
                    })
                }}>Save</button>
                <button className="btn cancelCommentButton m-2" onClick={() => {
                    dispatch({
                        type: EDIT_COMMENT,
                        commentEdit: {
                            id: -1,
                            content: ''
                        }
                    })
                }}>Cancel</button>
            </div>
        }
    }

    const renderListComment = () => {
        const listReOrderedComment = [];
        for (let i = taskDetailModal.lstComment.length - 1; i >= 0; i--) {
            listReOrderedComment.push({
                id: taskDetailModal.lstComment[i].id,
                name: taskDetailModal.lstComment[i].name,
                avatar: taskDetailModal.lstComment[i].avatar,
                commentContent: taskDetailModal.lstComment[i].commentContent
            })
        }

        return <List
            itemLayout="vertical"
            size="large"
            pagination={{
                pageSize: 3,
            }}
            dataSource={listReOrderedComment}

            renderItem={item => (
                <List.Item key={item.id} >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a style={{ fontWeight: 'bold' }} href={item.href}>{item.name}</a>}
                        description={<div className="text-dark" style={{ fontSize: '14px' }}>
                            {renderCommentContent(item)}
                            <div>
                                <span className="editCommentButton" style={{ marginRight: 8 }}
                                    onClick={() => {
                                        setCommmentEditContent(item.commentContent)
                                        dispatch({
                                            type: EDIT_COMMENT,
                                            commentEdit: {
                                                id: item.id,
                                                content: item.commentContent
                                            }
                                        })
                                    }}
                                >Edit</span>
                                •
                                <span className="editCommentButton" style={{ marginLeft: 8 }}
                                    onClick={() => {
                                        dispatch({
                                            type: DELETE_COMMENT_SAGA,
                                            commentObject: {
                                                taskId: taskDetailModal.taskId,
                                                idComment: item.id
                                            }
                                        })
                                    }}>Delete</span>
                            </div>
                        </div>}
                    />
                </List.Item>
            )}
        />
    }


    const renderCommentEditor = () => {
        let commentDescription = <span className="text-secondary"
            style={{
                padding: '10px 400px 16px 12px',
                border: '1px solid rgb(223, 225, 230)',
                borderRadius: '4px',
                cursor: 'pointer'
            }}>Add a comment...</span>;

        return <div>
            {visibleCommentEditor ? <div> <Editor
                name="comment"
                initialValue=""
                init={{
                    selector: 'textarea#myTextArea',
                    height: 150,
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
                    setContent(content);
                }}
            />
                <button className="btn btn-primary" onClick={() => {
                    setVisibleCommentEditor(!visibleCommentEditor);

                    dispatch({
                        type: CREATE_COMMENT_SAGA,
                        commentObject: {
                            taskId: taskDetailModal.taskId,
                            contentComment: content
                        }
                    })

                }}>Save</button>
                <button className="btn cancelCommentButton m-2" onClick={() => {
                    setVisibleCommentEditor(!visibleCommentEditor);
                }}>Cancel</button>
            </div> : <div onClick={() => {
                setVisibleCommentEditor(!visibleCommentEditor);
            }}>{commentDescription}</div>}


        </div>
    }

    const renderDescription = () => {
        let jsxDescription = <span className="text-secondary">Add a description...</span>;
        if (taskDetailModal.description) {
            jsxDescription = <span>{ReactHtmlParser(taskDetailModal.description)}</span>;
        }

        return <div>
            {visibleEditor ? <div> <Editor
                name="description"
                initialValue={taskDetailModal.description}
                init={{
                    initialValue: '',
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
                    setContent(content);
                }}
            />

                <button className="btn btn-primary m-2" onClick={() => {
                    dispatch({
                        type: HANDLE_CHANGE_POST_API_SAGA,
                        actionType: CHANGE_TASK_MODAL,
                        name: 'description',
                        value: content
                    })
                    setVisibleEditor(false);
                }}>Save</button>
                <button className="btn btn-primary m-2" onClick={() => {
                    dispatch({
                        type: HANDLE_CHANGE_POST_API_SAGA,
                        actionType: CHANGE_TASK_MODAL,
                        name: 'description',
                        value: historyContent
                    })
                    setVisibleEditor(false)
                }}>Close</button>
            </div> : <div onClick={() => {

                setHistoryContent(taskDetailModal.description);
                setVisibleEditor(!visibleEditor);

            }}>{jsxDescription}</div>}


        </div>
    }

    const renderTimeTracking = () => {

        const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;

        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
        const percent = Math.round(Number(timeTrackingSpent) / max * 100)

        return <div>
            <div style={{ display: 'flex' }}>
                <i className="fa fa-clock" />
                <div style={{ width: '100%' }}>

                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p className="logged">{Number(timeTrackingRemaining)}h logged</p>
                        <p className="estimate-time">{Number(timeTrackingRemaining)}h remaining</p>
                    </div>
                </div>


            </div>
            <div className="row">

                <div className="col-6">
                    <input className="form-control" name="timeTrackingSpent" onChange={handleChange} />
                </div>
                <div className="col-6">
                    <input className="form-control" name="timeTrackingRemaining" onChange={handleChange} />
                </div>
            </div>
        </div>
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: HANDLE_CHANGE_POST_API_SAGA,
            actionType: CHANGE_TASK_MODAL,
            name,
            value
        })
    }

    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">
                            <i className="fa fa-bookmark mr-2" />
                            <select name="typeId" value={taskDetailModal.typeId} onChange={handleChange}>
                                {arrTaskType.map((tp, index) => {
                                    return <option key={index} value={tp.id}>{tp.taskType}</option>
                                })}
                            </select>

                            <span>{taskDetailModal.taskName}</span>
                        </div>
                        <div style={{ display: 'flex' }} className="task-click">
                            <div>
                                <i className="fab fa-telegram-plane" />
                                <span style={{ paddingRight: 20 }}> Give feedback</span>
                            </div>
                            <div>
                                <i className="fa fa-link" />
                                <span style={{ paddingRight: 20 }}> Copy link</span>
                            </div>
                            <i className="fa fa-trash-alt='xyz'" style={{ cursor: 'pointer' }} />
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <p className="issue">This is an issue of type: Task.</p>
                                    <div className="description">
                                        <p style={{ fontWeight: 'bold' }}>Description</p>
                                        {renderDescription()}
                                    </div>
                                    <div className="comment">
                                        <p style={{ fontWeight: 'bold', marginTop: '20px' }}>Comments</p>
                                        <div className="block-comment" style={{ display: 'flex' }}>
                                            <div className="avatar">
                                                <img src={JSON.parse(localStorage.getItem(USER_LOGIN))?.avatar} alt='xyz' />
                                            </div>
                                            <div className="input-comment">
                                                {renderCommentEditor()}
                                            </div>
                                        </div>
                                        {renderListComment()}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>STATUS</p>
                                        <select style={{ fontSize: '15px' }} name="statusId" className="custom-select" value={taskDetailModal.statusId}
                                            onChange={(e) => { handleChange(e) }}>
                                            {arrStatus.map((status, index) => {
                                                return <option value={status.statusId} key={index}>{status.statusName}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="assignees" style={{ marginBottom: 20 }}>
                                        <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>ASSIGNEES</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                            {
                                                taskDetailModal.assigness.map((user, index) => {
                                                    return <div key={index} className="item">
                                                        <div className="avatar">
                                                            <img src={user.avatar} alt={user.avatar} />
                                                        </div>
                                                        <p className="name mt-1 ml-1">
                                                            {user.name}
                                                            <i className="fa fa-times" style={{ marginLeft: 5 }} onClick={() => {
                                                                dispatch({
                                                                    type: HANDLE_CHANGE_POST_API_SAGA,
                                                                    actionType: REMOVE_USER_ASSIGN,
                                                                    userId: user.id
                                                                })
                                                            }} />
                                                        </p>
                                                    </div>
                                                })
                                            }
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Select
                                                    options={projectDetail.members?.filter(mem => {
                                                        let index = taskDetailModal.assigness?.findIndex(us => us.id === mem.userId);
                                                        if (index !== -1) {
                                                            return false;
                                                        }
                                                        return true;
                                                    }).map((mem, index) => {
                                                        return { value: mem.userId, label: mem.name };
                                                    })}
                                                    optionFilterProp="label"
                                                    style={{ width: '100%' }}
                                                    name="lstUser"
                                                    value="+ Add more"
                                                    className="form-control"
                                                    onSelect={(value) => {
                                                        if (value === '0') {
                                                            return;
                                                        }
                                                        let userSelected = projectDetail.members.find(mem => mem.userId === parseInt(value));
                                                        userSelected = { ...userSelected, id: userSelected.userId };
                                                        //dispatchReducer
                                                        dispatch({
                                                            type: HANDLE_CHANGE_POST_API_SAGA,
                                                            actionType: CHANGE_ASSIGNEES,
                                                            userSelected
                                                        })
                                                    }}>


                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>PRIORITY</p>
                                        <select name="priorityId" className="form-control" value={taskDetailModal.priorityId} onChange={(e) => {
                                            handleChange(e);
                                        }}>
                                            {arrPriority.map((item, index) => {
                                                return <option key={index} value={item.priorityId}>{item.priority}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>ORIGINAL ESTIMATE (HOURS)</p>
                                        <input name="originalEstimate" type="text" className="estimate-hours" value={taskDetailModal.originalEstimate} onChange={(e) => {
                                            handleChange(e);
                                        }} />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        {renderTimeTracking()}
                                    </div>
                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}