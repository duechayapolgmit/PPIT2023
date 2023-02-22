import React from "react";
import { GoogleApiWrapper, Marker } from 'google-maps-react';

export class MarkerItem extends React.Component {

    constructor(){
        super(); 
    }

    render() {
        return (
            <Marker position={{ lat: this.props.marker.geometry.coordinates[0], lng: this.props.marker.geometry.coordinates[1] }}/>
        )
    }
}
export default MarkerItem;