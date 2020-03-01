import React from "react";
import "./Input.css"
import {connect} from "react-redux";

function isDisabled(props) {
    let disabled = false;
    if (props.type === 'wireless' || props.type === 'wifi') {
        if (!props.wifiDisabled) {
            disabled = props.formControls[props.type][props.name].disabled;
        } else {
            disabled = true;
        }
    } else {
        disabled = props.formControls[props.type][props.name].disabled;
    }
    return disabled;
}

function setClassName(control, type) {
    let className = 'form-input';
    if (!control.valid && control.touched && !control.disabled) {
        className = 'form-input control-invalid'
    }
    return className;
}

const Input = (props) => {
    const disabled = isDisabled(props);
    const control = props.formControls[props.type][props.name]

    return (
        <div>
            <label className={`label${disabled? '-disabled' : ''}`} htmlFor={props.type+'-'+props.name}>{props.text}
                {props.required ? <span className='input-required'> *</span> : null}
                <input
                    onChange={(e)=>{
                        props.onChange({
                            value: e.target.value,
                            type: props.type,
                            name: props.name
                        })}}
                    value={control.value}
                    disabled={disabled}
                    className={setClassName(control)}
                    type="text"
                    id={props.type+'-'+props.name}/>
            </label>
        </div>
    )
};

const mapStateToProps = state => ({
    formControls: state.formControls,
    wifiDisabled: state.wifiDisabled
});

const mapDispatchToProps = dispatch => ({
    onChange: (data) => dispatch({type: 'VALIDATE_INPUT', payload: data})
});

export default connect(mapStateToProps, mapDispatchToProps)(Input);