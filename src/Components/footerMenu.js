import React from "react";

import bell_on from '../Images/bell-on.png';
import bell_off from '../Images/bell-off.png';

export class FooterMenu extends React.Component {

    // Toggle notification for users
    toggleNotification(){
        this.props.onNotifyButtonClick();
    }

    render(){
        const { google, map, lat, lng, markers } = this.props;

        if (!google || !map) {
            return null;
        }

        return (
            <div className="container footer-menu text-2xl">
                <div className="container find-button text-2xl bg-teal-500" onClick={() => this.props.onFindButtonClick()}>
                    Find
                </div>
                <div className="container notify-button bg-teal-500">
                    <img id="notify-button" src={bell_off} onClick={() => this.toggleNotification()}/>
                </div>
            </div>
        )
    }
}