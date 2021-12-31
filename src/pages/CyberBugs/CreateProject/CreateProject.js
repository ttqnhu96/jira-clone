import React, { useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { withFormik } from 'formik'
import * as Yup from 'yup';
import { CREATE_PROJECT_SAGA, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../../redux/constants/Cyberbugs/Cyberbugs';
import { TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem';
import { history } from '../../../util/history';

function CreateProject(props) {
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
    const dispatch = useDispatch();

    const {
        handleChange,
        setFieldValue,
        handleSubmit,
    } = props;


    useEffect(() => {
        if (localStorage.getItem(USER_LOGIN) && localStorage.getItem(TOKEN)) {
            //Gọi api để lấy dữ liệu thẻ select
            dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA })
        } else {
            history.push('/login');
        }
    });

    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }

    return (
        <div className="container m-5">
            <h3>CreateProject</h3>
            <form className="container" onSubmit={handleSubmit} onChange={handleChange}>
                <div className="form-group">
                    <p>Name</p>
                    <input className="form-control" name="projectName" />
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
                        onEditorChange={handleEditorChange}
                    />
                </div>
                <div className="form-group">
                    <select name="categoryId" className="form-control" onChange={handleChange}>
                        {arrProjectCategory.map((item, index) => {
                            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                        })}
                    </select>
                </div>
                <button className="btn btn-outline-primary" type="submit">Create project</button>
            </form>
        </div>
    )
}

const createProjectForm = withFormik({
    mapPropsToValues: (props) => {
        return {
            projectName: '',
            description: '',
            categoryId: props.arrProjectCategory[0]?.id
        }
    },
    validationSchema: Yup.object().shape({


    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: CREATE_PROJECT_SAGA,
            newProject: values
        })
    },
    displayName: 'CreateProjectFormik',
})(CreateProject);


const mapStateToProps = (state) => ({

    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory

})


export default connect(mapStateToProps)(createProjectForm);
