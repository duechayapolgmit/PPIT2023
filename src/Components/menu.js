import React from "react";
import markerImage from '../Images/location_icon.png';
import menuIcon from '../Images/menu_icon.png';
import closeIcon from '../Images/close_icon.png';

export default class Menu extends React.Component {

    render(){
        console.log(this.props.currentLocation)
        return (
            <div className="container overlay menu-overlay bg-teal-500 text-lg">
                <div className="menu-overlay-image" onClick={() => this.props.onClickMenuButton()}><img src={menuIcon} /></div>
                <div><b>Current Location</b><br/>{this.props.currentLocation}</div>
            </div>
        )
    }
}

export class MenuList extends React.Component {

    // Exit Menu is temporary
    render(){
        return (
            <div id="menu-overlay-list" className="overlay menu-overlay-list bg-teal-500 text-xl">
                <div className="menu-overlay-list-image" onClick={() => this.props.onClickMenuCloseButton()}><img src={closeIcon}/></div>
                <div className="menu-overlay-list-single">Favourites</div>
                <div className="menu-overlay-list-single">Settings</div>
            </div>
        )
    }
}