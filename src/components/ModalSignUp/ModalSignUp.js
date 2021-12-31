import React from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup';
import { connect, useSelector } from 'react-redux';
import { signupCyberbugAction } from '../../redux/actions/CyberbugsActions';

function ModalSignUp(props) {
    const {
        errors,
        handleChange,
        handleSubmit,
    } = props;


    //Get data from redux 
    const { signUpNotification } = useSelector(state => state.AuthenticationReducer);

    const renderSignUpMessage = () => {
        if (signUpNotification === 1) {
            return <div className="text-success text-center mb-2">Sign up success. Click <span
                className="signUpButton text-dark font-weight-bold" style={{ cursor: 'pointer' }}
                data-dismiss="modal" onClick={() => {}}>Login</span> to continue!</div>
        }
        else if (signUpNotification === 0) {
            return <div className="text-danger text-center mb-2">Sign up fail. Please try again!</div>
        }
        else {
            return <div></div>
        }
    }

    return (
        <div className="modal fade" id="signUpModal" tabIndex={-1} role="dialog" aria-labelledby="signUpModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Sign Up</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} className="container">
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
                            {renderSignUpMessage()}
                            <div className="text-center">
                                <button type="submit" style={{ marginTop: '7px', marginBottom: '7px', paddingLeft: 35, paddingRight: 35, fontWeight: 'bold' }} className="btn btn-success">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SignUpCyberBugsWithFormik = withFormik({
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
        props.dispatch(signupCyberbugAction(name, phoneNumber, email, password));
    },
    displayName: 'SignUp CyberBugs',
})(ModalSignUp);


export default connect()(SignUpCyberBugsWithFormik);
