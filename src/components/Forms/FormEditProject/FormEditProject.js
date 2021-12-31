import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik';
import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { GET_ALL_PROJECT_CATEGORY_SAGA, SET_SUBMIT_EDIT_PROJECT, UPDATE_PROJECT_SAGA } from '../../../redux/constants/Cyberbugs/Cyberbugs';


function FormEditProject(props) {
    const editorRef = useRef(null);
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
    const dispatch = useDispatch();

    const {
        values,
        handleChange,
        handleSubmit
    } = props;


    //componentdidmount
    useEffect(() => {
        //Call api load project category 
        dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA })

        //Load sự kiện submit lên drawer nút submit
        dispatch({ type: SET_SUBMIT_EDIT_PROJECT, submitFunction: handleSubmit });


    }, [dispatch, handleSubmit])

    return (
        <form className="container-fluid" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-4">

                    <div className="form-group">
                        <p className="font-weight-bold">Project id</p>
                        <input value={values.id} disabled className="form-control" name="id" />
                    </div>


                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project name</p>
                        <input value={values.projectName} className="form-control" name="projectName" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project Category</p>
                        <select className="form-control" name="categoryId" value={values.categoryId} onChange={handleChange}>
                            {arrProjectCategory?.map((item, index) => {
                                return <option key={index} value={item.id}>
                                    {item.projectCategoryName}
                                </option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold">Description</p>
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue={values.description}
                            init={{
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
                            onEditorChange={(newValue, editor) => values.description = newValue}
                        />
                    </div>
                </div>
            </div>
        </form >
    )
}

const EditProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { projectEdit } = props;

        return {
            id: projectEdit?.id,
            projectName: projectEdit.projectName,
            description: projectEdit.description,
            categoryId: projectEdit.categoryId
        }
    },
    validationSchema: Yup.object().shape({


    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: UPDATE_PROJECT_SAGA,
            projectUpdate: values
        })
    },
    displayName: 'EditProjectForm',
})(FormEditProject);

const mapStateToProps = (state) => ({

    projectEdit: state.ProjectReducer.projectEdit

})



export default connect(mapStateToProps)(EditProjectForm);