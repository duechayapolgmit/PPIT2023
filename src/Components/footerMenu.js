import React from "react";

import bell_on from '../Images/bell-on.png';
import bell_off from '../Images/bell-off.png';

export class FooterMenu extends React.Component {


    getNearestSpace(lat, lng, markers) 
    {
        markers.forEach(marker => {
            let coords = [marker.longitude, marker.latitude]
            var R = 6371; // in kilometers
            var dLat = this.toRad(coords[1]-lat);
            var dLon = this.toRad(coords[0]-lng);
            var lat1 = this.toRad(lat);
            var lat2 = this.toRad(coords[1]);

            var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c;
            marker.distance = d;
        });

        markers.sort( (a,b) => a.distance - b.distance);

        this.props.onFindButtonClick(markers);
    }

    toRad(Value) 
    {
        return Value * Math.PI / 180;
    }

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
                <div className="container find-button text-2xl bg-teal-500" onClick={() => this.getNearestSpace(lat, lng, markers)}>
                    Find
                </div>
                <div className="container notify-button bg-teal-500">
                    <img id="notify-button" src={bell_off} onClick={() => this.toggleNotification()}/>
                </div>
            </div>
        )
    }
}