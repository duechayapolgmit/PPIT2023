import React from "react"
import markerImage from '../Images/location_icon.png';

export default class MarkersList extends React.Component {
    render(){
        return (
        <div className="overlay list-markers bg-teal-500">
            <h1 className="text-lg">List of Markers</h1>
            <MarkerInfo/>
        </div>
        )
        
    }
}

class MarkerInfo extends React.Component {
    render(){
        return (
            <div className="list-markers-single">
                <img src={markerImage}/>
            </div>
        )
        
    }
}