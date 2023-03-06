import React, { useState, useEffect } from "react"
import markerImage from '../Images/location_icon.png';

export default function MarkersSidebar(props){

    const [markers, setMarkers] = useState(props.markers);

    useEffect( () => {
        setMarkers(props.markers);
    },[props.markers])

    return (
        <div id="markers-list-menu" className="overlay list-markers bg-teal-500">
            <h1 className="text-lg">List of Markers</h1><hr/>
            <MarkersList markers={markers}/>
        </div>
    )
}

class MarkersList extends React.Component {
    render(){
        return this.props.markers.map( (marker) => {
            return <MarkerInfo marker={marker}/>
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
        return (
            <div>
                <div className="list-markers-single">
                    <div className="list-markers-image"><img src={markerImage}/>{distance}km</div>
                    <p>{this.props.marker.properties.NAME}<br/>Capacity: 0 / {capacity}<br/>{this.props.marker.properties.TYPE}</p>
                </div>
                <hr/>
            </div>
            
           
        )
        
    }
}