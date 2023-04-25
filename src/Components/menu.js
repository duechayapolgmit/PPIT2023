import React from "react";
import markerImage from '../Images/location_icon.png';
import menuIcon from '../Images/menu_icon.png';
import closeIcon from '../Images/close_icon.png';

export default class Menu extends React.Component {

    render(){
        return (
            <div className="overlay menu-overlay bg-teal-500 text-lg">
                <img className="image-clickable" src={menuIcon} onClick={() => this.props.onClickMenuButton()}/>
                <div className="menu-overlay-details"><b>Current Location</b><br/>{this.props.currentLocation}</div>
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
                <div className="menu-overlay-list-single menu-button" onClick={() => this.props.onFavouritesMenuClick(this.props.markers)}>Favourites</div>
                <div className="menu-overlay-list-single">Settings</div>
            </div>
        )
    }
}