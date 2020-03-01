import React from "react";
import './Form.css'
import Settings from "../Settings/Settings";
import Wireless from "../Wireless/Wireless";
import {connect} from "react-redux";

const Form = (props) => {
    return (
        <form className='form' action="">
            <div className="form-content">
                <div className="form-column">
                    <h3 className="form-title">Ethernet settings</h3>
                    <Settings type="ethernet"/>
                </div>
                <div className="form-column">
                    <h3 className="form-title">Wireless settings</h3>
                    <Wireless />
                    <Settings type="wireless"/>
                </div>
            </div>
            <input
                className="form-btn"
                type="submit"
                value="Save"
                onClick={
                    (e) => {
                        e.preventDefault();
                        props.validateForm();
                    }
                }
                onSubmit={
                    (e) => {
                        e.preventDefault();
                        props.validateForm();
                    }
                }
            />
            <button
                onClick={(e) => {
                    e.preventDefault();
                }}
                className="form-btn form-btn__white"
            >Cancel</button>
        </form>
    )
};

const mapStateToProps = state => ({
    wifiDisabled: state.wifiDisabled,
});

const mapDispatchToProps = dispatch => ({
    validateForm: () => dispatch({type: 'VALIDATE_FORM'}),
    resetForm: () => dispatch({type: 'RESET_FORM'})
});


export default connect(mapStateToProps, mapDispatchToProps)(Form);