import { withFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { SET_SUBMIT_EDIT_USER, UPDATE_USER_SAGA } from '../../../redux/constants/Cyberbugs/Cyberbugs';


function FormEditUser(props) {
    const dispatch = useDispatch();

    const {
        errors,
        values,
        handleChange,
        handleSubmit
    } = props;


    useEffect(() => {
        //Load submit event to drawer
        dispatch({ type: SET_SUBMIT_EDIT_USER, submitFunction: handleSubmit });
    }, [dispatch, handleSubmit])

    return (
        <form className="container-fluid" onSubmit={handleSubmit}>
            <div className="form-group">
                <div className="row">
                    <div className="col-4">
                        <p className="font-weight-bold">User id</p>
                        <input value={values.id} disabled className="form-control" name="id" />
                    </div>
                </div>
            </div>

            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p className="font-weight-bold">Name</p>
                        <input value={values.name} className="form-control" name="name" onChange={handleChange} />
                        <div className="text-danger">{errors.name}</div>
                    </div>
                    <div className="col-6">
                        <p className="font-weight-bold">Phone number</p>
                        <input value={values.phoneNumber} name="phoneNumber" className="form-control"
                            onKeyDown={(e) => {
                                if (!((e.key >= 0 && e.key <= 9)
                                    || (e.key === 'Backspace')
                                    || (e.key === 'ArrowLeft')
                                    || (e.key === 'ArrowRight')
                                    || (e.key === 'Tab')
                                    || (e.ctrlKey && (e.key === 'a' || e.key === 'c' || e.key === 'x' || e.key === 'v')))) {
                                    e.preventDefault();
                                }
                            }} onChange={handleChange} />
                        <div className="text-danger">{errors.phoneNumber}</div>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <p className="font-weight-bold">Email</p>
                <input value={values.email} name="email" className="form-control" onChange={handleChange} />
                <div className="text-danger">{errors.email}</div>
            </div>

        </form >
    )
}

const EditUserForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { userEdit } = props;

        return {
            id: userEdit?.userId,
            passWord: userEdit?.passWord,
            email: userEdit?.email,
            name: userEdit?.name,
            phoneNumber: userEdit?.phoneNumber
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required!'),
        phoneNumber: Yup.string().required('Phone number is required!'),
        email: Yup.string().required('Email is required!').email('Email is invalid!')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        setSubmitting(true);
        props.dispatch({
            type: UPDATE_USER_SAGA,
            userUpdate: values
        })
    },
    displayName: 'EditUserForm',
})(FormEditUser);

const mapStateToProps = (state) => ({

    userEdit: state.UserReducer.userEdit

})



export default connect(mapStateToProps)(EditUserForm);