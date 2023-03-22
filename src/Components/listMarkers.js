import React, { useState, useEffect } from "react"
import markerImage from '../Images/location_icon.png';
import directionsImage from '../Images/directions.png';

export default function MarkersSidebar(props){

    const [markers, setMarkers] = useState(props.markers);

    let closeList = () => {
        document.getElementById("markers-list-menu").classList.remove("menu-show")
    }

    useEffect( () => {
        setMarkers(props.markers);
    },[props.markers])
    return (
        <div id="markers-list-menu" className="overlay markers-list bg-teal-500">
            <div className="markers-list-header">
                <div className="markers-list-heading"><h1 className="text-xl">List of Markers</h1></div>
                <img className="image-clickable" src={closeIcon} onClick={() => closeList()}/>
            </div>
            <hr/>
            <MarkersList markers={markers} lat={props.lat} lon={props.lon}/>
        </div>
    )
}

class MarkersList extends React.Component {
    render(){
        return this.props.markers.map( (marker) => {
            return <MarkerInfo marker={marker} lat={this.props.lat} lon={this.props.lon}/>
        })
    }
}

class MarkerInfo extends React.Component {
    render(){
        // handles distance formatting
        let distance = 0;
        if (this.props.marker.distance != undefined) distance = this.props.marker.distance.toFixed(2);
        
        // handles capacity formatting
        let capacity = 0;
        if (this.props.marker.properties.NO_SPACES != "") capacity = this.props.marker.properties.NO_SPACES;
        
        var origin = this.props.lat + "," + this.props.lon;

        //handles destination formatting
        let destination = 0;
        if (this.props.marker.geometry.coordinates[0] != "") destination = this.props.marker.geometry.coordinates;

        //generate URL for directions
        var longitude = destination[0];
        var latitude = destination[1];
        var directionsURL = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${latitude},${longitude}`;

        return (
            <div>
                <div className="markers-list-single">
                    <div className="markers-list-image-marker"><img src={markerImage}/>{distance}km</div>
                    <div className="markers-list-single-details"><p>{percent} <b>{this.props.marker.markerName}</b> {capacity}<br/>{this.props.marker.type}</p></div>
                    <div className="markers-list-button-directions"><a href={url}><img src={directionsImage}/></a></div>
                </div>
                <hr/>
            </div>
            
           
        )
        
    }
}