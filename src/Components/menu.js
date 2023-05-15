import React from "react";
import markerImage from '../Images/location_icon.png';
import menuIcon from '../Images/menu_icon.png';
import closeIcon from '../Images/close_icon.png';

export default class Menu extends React.Component {

    render() {
        return (
            <div className="overlay menu-overlay bg-teal-500 text-lg">
                <img className="image-clickable" src={menuIcon} onClick={() => this.props.onClickMenuButton()} />
                <div className="menu-overlay-details"><b>Current Location</b><br />{this.props.currentLocation}</div>
            </div>
        )
    }
}

export class MenuList extends React.Component {
    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() {
        this.props.onRefreshRateUpdate();
    }
    getNearestSpace(lat, lng, markers) {
        markers.forEach(marker => {
            let coords = [marker.longitude, marker.latitude]
            var R = 6371; // in kilometers
            var dLat = this.toRad(coords[1] - lat);
            var dLon = this.toRad(coords[0] - lng);
            var lat1 = this.toRad(lat);
            var lat2 = this.toRad(coords[1]);

            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            marker.distance = d;
        });

        markers.sort((a, b) => a.distance - b.distance);

        this.props.onFavouritesMenuClick(this.props.markers)
    }

    toRad(Value) {
        return Value * Math.PI / 180;
    }
    // Exit Menu is temporary
    render() {
        return (
            <div id="menu-overlay-list" className="overlay menu-overlay-list bg-teal-500 text-xl">
                <div className="menu-overlay-list-image" onClick={() => this.props.onClickMenuCloseButton()}><img src={closeIcon} /></div>
                <div className="menu-overlay-list-single menu-button" onClick={() => this.getNearestSpace(this.props.lat, this.props.lon, this.props.markers)}>Favourites</div>
                <div className="menu-overlay-list-single">
                    <div className="menu-overlay-list-single-text">Refresh Delay (s)</div>
                    <input className="menu-overlay-input" type="number" defaultValue={this.props.refreshRate} onInput={e => this.props.onRefreshRateUpdate(e)} />
                </div>
            </div>
        )
    }
}