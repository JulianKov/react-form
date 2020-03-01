import React from "react";
import Input from "../Input/Input";
import { connect } from 'react-redux';

const Ipblock = (props) => {
    let disabled = false;
    if(props.type === 'wireless') {
        disabled = props.wifiDisabled;
    }
    return (
        <div>
            <label htmlFor={`${props.type}-ip-auto`} className={`label${disabled? '-disabled' : ''}`}>
                <input
                    disabled={disabled}
                    type="radio"
                    name={`${props.type}-ip`}
                    id={`${props.type}-ip-auto`}
                    onChange={()=>{props.onDisableInputs(props.type, 'ip')}}
                    defaultChecked={true}
                />Obtain an IP address automatically
            </label>
            <label htmlFor={`${props.type}-ip-manual`} className={`label${disabled? '-disabled' : ''}`}>
                <input
                    disabled={disabled}
                    type="radio"
                    name={`${props.type}-ip`}
                    id={`${props.type}-ip-manual`}
                    onChange={()=>{props.onDisableInputs(props.type, 'ip')}}
                />Use the following IP address:
            </label>
            <div className="form-data">
                <Input text="IP address:" type={props.type} name="ip" required={true}/>
                <Input text="Subnet Mask:" type={props.type} name="mask"  required={true}/>
                <Input text="Default Gateway:" type={props.type} name="gate" required={false}/>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    wifiDisabled: state.wifiDisabled,
});

const mapDispatchToProps = dispatch => ({
    onDisableInputs: (type, block) => dispatch({type: 'DISABLE_INPUT', payload: {type, block}})
})


export default connect(mapStateToProps, mapDispatchToProps)(Ipblock);