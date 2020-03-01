import React from "react";
import Input from "../Input/Input";
import {connect} from "react-redux";

const Dnsblock = (props) => {
    let disabled = false;
    if(props.type === 'wireless') {
        disabled = props.wifiDisabled;
    }

    return (
        <div>
            <label htmlFor={`${props.type}-dns-auto`} className={`label${disabled? '-disabled' : ''}`}>
                <input
                    disabled={disabled}
                    type="radio"
                    name={`${props.type}-dns`}
                    id={`${props.type}-dns-auto`}
                    defaultChecked={true}
                    onChange={()=>{props.onDisableInputs(props.type, 'dns')}}
                />Obtain DNS server address automatically
            </label>
            <label htmlFor={`${props.type}-dns-manual`} className={`label${disabled? '-disabled' : ''}`}>
                <input
                    disabled={disabled}
                    type="radio"
                    name={`${props.type}-dns`}
                    id={`${props.type}-dns-manual`}
                    onChange={()=>{props.onDisableInputs(props.type, 'dns')}}
                />Use the following DNS address:
            </label>
            <div className="form-data">
                <Input text="Preferred DNS address:" type={props.type} name="dns" required={true}/>
                <Input text="Alternative DNS server:" type={props.type} name="alt" required={false}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(Dnsblock);