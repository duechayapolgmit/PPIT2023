import React from "react"
import markerImage from '../Images/location_icon.png';

export default class MarkersList extends React.Component {
    render(){
        return (
        <div className="overlay list-markers bg-teal-500">
            <h1 className="text-lg">List of Markers</h1><hr/>
            <MarkerInfo/>
        </div>
        )
        
    }
}

class MarkerInfo extends React.Component {
    render(){
        return (
            <div>
                <div className="list-markers-single">
                    <img src={markerImage}/>
                    <p>Marker Name<br/>Cap<br/>Type</p>
                </div>
                <hr/>
            </div>
            
           
        )
        
    }
}