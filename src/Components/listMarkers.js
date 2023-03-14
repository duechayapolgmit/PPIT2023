import React, { useState, useEffect } from "react"
import markerImage from '../Images/location_icon.png';
import directionsImage from '../Images/directions.png';

export default function MarkersSidebar(props){

    const [markers, setMarkers] = useState(props.markers);


    useEffect( () => {
        setMarkers(props.markers);
    },[props.markers])
    return (
        <div id="markers-list-menu" className="overlay list-markers bg-teal-500">
            <h1 className="text-lg">List of Markers</h1><hr/>
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
    // Get capacity HTML. Will not show if capacity is 0.
    getCapacity(occupy, capacity) {
        if (capacity == 0) return;
        else return <span><br/>Capacity: {occupy} / {capacity}</span>;
    }

    render(){
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

        //generate URL for directions
        var url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${latitude},${longitude}`;

        return (
            <div>
                <div className="list-markers-single">
                    <div className="list-markers-image"><img src={markerImage}/>{distance}km</div>
                    <p>{this.props.marker.markerName}{capacity}<br/>{this.props.marker.type}</p>
                    <div className="list-buttons-image"><a href={url}><img src={directionsImage}/></a></div>
                </div>
                <hr/>
            </div>
            
           
        )
        
    }
}