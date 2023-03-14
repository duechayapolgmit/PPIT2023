import React from "react";
import { Marker } from 'google-maps-react';

export class Markers extends React.Component {

    render() {
        const { google, map } = this.props;

        if (!google || !map) {
            return null;
        }
        return this.props.markers.map(
            (marker) => {
                return <Marker
                    position={{ lat: marker.latitude, lng: marker.longitude }}
                    name={marker.markerName}
                    type={marker.type}
                    occupied={marker.occupied}
                    full={marker.full}
                    map={map}
                    google={google}
                	onClick={this.props.onMarkerClick}
                ></Marker>
            }
        );
    }
}
export default Markers;