import React from "react";
import Ipblock from "../Ipblock/Ipblock";
import Dnsblock from "../Dnsblock/Dnsblock.";

const Settings = (props) => {
    return (
        <React.Fragment>
            <Ipblock type={props.type}/>
            <Dnsblock type={props.type}/>
        </React.Fragment>
    )
};

export default Settings;