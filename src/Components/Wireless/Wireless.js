import React from "react";
import "./Wireless.css"
import Input from "../Input/Input";
import {connect} from "react-redux";

const Wireless =(props) => {
    return (
        <React.Fragment>
            <label htmlFor="enable-wifi">
                <input
                    type="checkbox"
                    id="enable-wifi"
                    onChange={()=>{
                        props.onDisableInputs('wifi', 'name')
                        props.onDisableIWifi();
                    }}
                />Enable WiFI
            </label>
            <div className='form-data'>
                <Input text="Wireless Network Name:"  type="wifi"  name="name" required={true}/>
            </div>
            <label htmlFor="enable-key" className={`label${props.wifiDisabled? '-disabled' : ''}`}>
                <input
                    type="checkbox"
                    id="enable-key"
                    onChange={()=>{props.onDisableInputs('wifi', 'key')}}
                    disabled={props.wifiDisabled}
                />Enable Wireless Security
            </label>
            <div className="form-data">
                <Input text="Security Key:" type="wifi" name="key"  required={true}/>
            </div>
        </React.Fragment>
    )
};

const mapStateToProps = state => ({
    wifiDisabled: state.wifiDisabled,
});

const mapDispatchToProps = dispatch => ({
    onDisableIWifi: () => dispatch({type: 'DISABLE_WIFI'}),
    onDisableInputs: (type, block) => dispatch({type: 'DISABLE_INPUT', payload: {type, block}})
});

export default connect(mapStateToProps, mapDispatchToProps)(Wireless);