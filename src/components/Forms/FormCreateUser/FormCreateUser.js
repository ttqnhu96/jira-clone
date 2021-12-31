import { withFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { CREATE_USER_SAGA, SET_SUBMIT_CREATE_USER } from '../../../redux/constants/Cyberbugs/Cyberbugs';


function FormCreateUser(props) {
    const dispatch = useDispatch();

    const {
        errors,
        handleChange,
        handleSubmit,
    } = props;


    useEffect(() => {
        //Load submit event to drawer
        dispatch({ type: SET_SUBMIT_CREATE_USER, submitFunction: handleSubmit });
    }, [dispatch, handleSubmit])

    return (
        <form className="container-fluid" onSubmit={handleSubmit}>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <input placeholder="Name" name="name" className="form-control" onChange={handleChange} />
                        <div className="text-danger">{errors.name}</div>
                    </div>
                    <div className="col-6">
                        <input placeholder="Phone Number" name="phoneNumber" className="form-control"
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
                <input placeholder="Email" name="email" className="form-control" onChange={handleChange} />
                <div className="text-danger">{errors.email}</div>
            </div>
            <div className="form-group">
                <input placeholder="Password" name="password" type="password" className="form-control" onChange={handleChange} />
                <div className="text-danger">{errors.password}</div>
            </div>
        </form >
    )
}

const CreateUserForm = withFormik({
    mapPropsToValues: () => ({
        name: '',
        phoneNumber: '',
        email: '',
        password: ''
    }),
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required!'),
        phoneNumber: Yup.string().required('Phone number is required!'),
        email: Yup.string().required('Email is required!').email('Email is invalid!'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').max(32, 'Password must be at most 32 characters')
    }),
    handleSubmit: ({ name, phoneNumber, email, password }, { props, setSubmitting }) => {
        setSubmitting(true);
        props.dispatch({
            type: CREATE_USER_SAGA,
            userSignup: {
                email: email,
                passWord: password,
                name: name,
                phoneNumber: phoneNumber
            }
        })
    },
    displayName: 'CreateUser',
})(FormCreateUser);


export default connect()(CreateUserForm);