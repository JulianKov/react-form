import {DISABLE_INPUT, DISABLE_WIFI, VALIDATE_INPUT, VALIDATE_FORM} from "../constants/constants";

const initialState = {
    formControls: {
        ethernet: {
            ip: {
                disabled: true,
                value: '',
                validation: true,
                valid: false,
                touched: false,
                required: true
            },
            mask: {
                disabled: true,
                value: '',
                validation: true,
                valid: false,
                touched: false,
                required: true
            },
            gate: {
                disabled: true,
                value: '',
                validation: false,
                valid: true,
                touched: false,
                required: false
            },
            dns: {
                disabled: true,
                value: '',
                validation: true,
                valid: false,
                touched: false,
                required: true
            },
            alt: {
                disabled: true,
                value: '',
                validation: false,
                valid: true,
                touched: false,
                required: false
            }
        },
        wireless: {
            ip: {
                disabled: true,
                value: '',
                validation: true,
                valid: false,
                touched: false,
                required: true
            },
            mask: {
                disabled: true,
                value: '',
                validation: true,
                valid: false,
                touched: false,
                required: true
            },
            gate: {
                disabled: true,
                value: '',
                validation: false,
                valid: true,
                touched: false,
                required: false
            },
            dns: {
                disabled: true,
                value: '',
                validation: true,
                valid: false,
                touched: false,
                required: true
            },
            alt: {
                disabled: true,
                value: '',
                validation: false,
                valid: true,
                touched: false,
                required: false
            }
        },
        wifi: {
            name: {
                disabled: true,
                value: '',
                validation: false,
                valid: true,
                touched: false,
                required: true
            },
            key: {
                disabled: true,
                value: '',
                validation: false,
                valid: true,
                touched: false,
                required: true
            }
        }
    },
    disabledBlocks: {
        'ethernet-ip': true,
        'ethernet-dns': true,
        'wireless-ip': true,
        'wireless-dns': true,
    },
    wifiDisabled: true,
    formValid: false
}

function disableInputs(state, action) {
    const formControls = {...state.formControls};
    const type = {...formControls[action.payload.type]};
    const blockName = `${action.payload.type}-${action.payload.block}`
    let disabledBlocks = {...state.disabledBlocks};
    disabledBlocks[blockName] = !disabledBlocks[blockName];
    switch (action.payload.block) {
        case 'ip':
            type.ip.disabled = !type.ip.disabled;
            type.mask.disabled = !type.mask.disabled;
            type.gate.disabled = !type.gate.disabled;
            break;
        case 'dns':
            type.dns.disabled = !type.dns.disabled;
            type.alt.disabled = !type.alt.disabled;
            break;
        case 'name':
            type.name.disabled = !type.name.disabled;
            break;
        case 'key':
            type.key.disabled = !type.key.disabled;
            break;
        default:
    }
    formControls[action.payload.type] = type;
    return {
        ...state,
        disabledBlocks,
        formControls
    }
}

function disableWifi(state) {
    return {
        ...state,
        wifiDisabled: !state.wifiDisabled
    }
}

function validateInput(state, action) {
    const formControls = {...state.formControls};
    const control = {...formControls[action.payload.type][action.payload.name]};
    control.value = action.payload.value;
    control.touched = true;
    if (control.validation) {
        control.valid = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(control.value);
    }
    formControls[action.payload.type][action.payload.name] = control;
    return {...state, formControls}
}

function validateForm(state) {
    const result = {
        ethernet: {
            ip: 'default',
            mask: 'default',
            gate: 'default',
            dns: 'default',
            alt: 'default'
        }
    };
    const formControls = {...state.formControls};
    const disabledBlocks = state.disabledBlocks;
    let inValidBlocks = 0;
    if (!disabledBlocks["ethernet-ip"]) {
        if (!formControls.ethernet.ip.valid || !formControls.ethernet.mask.valid) {
            formControls.ethernet.ip.touched = true;
            formControls.ethernet.mask.touched = true;
            inValidBlocks++;
        } else {
            result.ethernet.ip = formControls.ethernet.ip.value;
            result.ethernet.mask = formControls.ethernet.mask.value;
            result.ethernet.gate = formControls.ethernet.mask.value || "default";
        }
    }
    if (!disabledBlocks["ethernet-dns"]) {
        if (!formControls.ethernet.dns.valid) {
            formControls.ethernet.dns.touched = true;
            inValidBlocks++;
        } else {
            result.ethernet.dns = formControls.ethernet.dns.value;
            result.ethernet.alt = formControls.ethernet.alt.value || "default";
        }
    }
    if (!state.wifiDisabled) {
        result.wireless = {
            name: '',
            ip: 'default',
            mask: 'default',
            gate: 'default',
            dns: 'default',
            alt: 'default'
        };
        if (!formControls.wifi.name.value) {
            inValidBlocks++;
        } else {
            result.wireless.name = formControls.wifi.name.value
        }
        if (!formControls.wifi.key.disabled) {
            if (!formControls.wifi.key.value) {
                inValidBlocks++;
            } else {
                result.wireless.key = formControls.wifi.key.value
            }
        }
        if (!disabledBlocks["wireless-ip"]) {
            if (!formControls.wireless.ip.valid || !formControls.wireless.mask.valid) {
                formControls.wireless.ip.touched = true;
                formControls.wireless.mask.touched = true;
                inValidBlocks++;
            } else {
                result.wireless.ip = formControls.wireless.ip.value;
                result.wireless.mask = formControls.wireless.mask.value;
                result.wireless.gate = formControls.wireless.mask.value || "default";
            }
        }
        if (!disabledBlocks["wireless-dns"]) {
            if (!formControls.wireless.dns.valid) {
                formControls.wireless.dns.touched = true;
                inValidBlocks++;
            } else {
                result.wireless.dns = formControls.wireless.dns.value;
                result.wireless.alt = formControls.wireless.alt.value || "default";
            }
        }
    }
    if (inValidBlocks>0) {
        alert('Please, fill all fields!')
    } else {
        console.log(JSON.stringify(result, 2, 2))
    }
    return {...state, formControls}
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case DISABLE_INPUT:
            return disableInputs(state, action);
        case DISABLE_WIFI:
            return disableWifi(state);
        case VALIDATE_INPUT:
            return validateInput(state, action);
        case VALIDATE_FORM:
            return validateForm(state);
        default:
            return state
    }
}