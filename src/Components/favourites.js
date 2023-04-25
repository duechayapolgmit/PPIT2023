import closeIcon from '../Images/close_icon.png';
import markerImage from '../Images/location_icon.png';
import directionsImage from '../Images/directions.png';
import React, { useState, useEffect } from "react"
export default function FavouritesSidebar(props) {

    const [markers, setMarkers] = useState(props.markers);

    let closeList = () => {
        document.getElementById("favourites-list-menu").classList.remove("menu-show")
    }

    useEffect(() => {
        setMarkers(props.markers);
    }, [props.markers])
    return (
        <div id="favourites-list-menu" className="overlay markers-list bg-teal-500">
            <div className="markers-list-header">
                <div className="markers-list-heading"><h1 className="text-xl">Favourites</h1></div>
                <img className="image-clickable" src={closeIcon} onClick={() => closeList()} />
            </div>
            <hr />
            <FavouritesList markers={markers} lat={props.lat} lon={props.lon} />
        </div>
    )
}
class FavouritesList extends React.Component {
    render() {
        return this.props.markers.map((marker) => {
            return <FavouritesInfo marker={marker} lat={this.props.lat} lon={this.props.lon} />
        })
    }
}

export class FavouritesInfo extends React.Component {
    // Get capacity HTML. Will not show if capacity is 0.
    getCapacity(occupy, capacity) {
        if (capacity == 0) return;
        else return <span><br />Capacity: {occupy} / {capacity}</span>;
    }

    // Get percent with div
    getPercent(name, occupy, full) {
        if (name === "Current Location" || full == 0) return;
        let percentage = this.getPercentage(occupy, full).toFixed(0);
        let bgColour = this.getPercentageColour(percentage);
        return <span className={`${bgColour} pl-4 pr-4`}>{percentage + "%"}</span>
    }

    // Get percentage from values parsed in (uses space.empty and space.full values)
    getPercentage(empty, full) {
        if (full == 0) return 0;
        let percent = parseFloat(empty) / parseFloat(full);
        return percent * 100;
    }

    // Get the colour for the percentage background
    getPercentageColour(percent) {
        // may revisit later
        if (percent < 25) return "bg-green-500";
        if (percent < 50) return "bg-yellow-300";
        if (percent < 75) return "bg-orange-300";
        return "bg-red-300";
    }

    render() {
        if (this.props.marker.distance > 40) return "";

        // handles distance formatting
        let distance = 0;
        if (this.props.marker.distance != undefined) distance = this.props.marker.distance.toFixed(2);
        
        // handles capacity formatting
        let capacity = this.getCapacity(this.props.marker.occupied, this.props.marker.full);
        var origin = this.props.lat + "," + this.props.lon;

        //handles destination formatting
        let longitude = 0;
        let latitude = 0;
        if (this.props.marker.longitude != "") {
            longitude = this.props.marker.longitude;
            latitude = this.props.marker.latitude;
        }

        // handles percentage handling
        let percent = this.getPercent(this.props.name, this.props.marker.occupied, this.props.marker.full);

        //generate URL for directions
        var url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${latitude},${longitude}`;

        //check for favourites
        var favourites = JSON.parse(localStorage.getItem('favourites'));
        if (favourites == null) favourites = [];
        if (favourites.includes(this.props.marker.id)) {
            return (
                <div>
                    <div className="markers-list-single">
                        <div className="markers-list-image-marker"><img src={markerImage} />{distance}km</div>
                        <div className="markers-list-single-details"><p>{percent} <b>{this.props.marker.markerName}</b> {capacity}<br />{this.props.marker.type}</p></div>
                        <div className="markers-list-button-directions"><a href={url}><img src={directionsImage} /></a></div>
                    </div>
                    <hr />
                </div>
            )
        } else {
            return null;
        }
    }
}