import React from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

export class Markers extends React.Component {

    render() {
        const { google, map } = this.props;

        if (!google || !map) {
            return null;
        }
        return this.props.markers.map(
            (marker) => {
                return <Marker
                    position={{ lat: marker.geometry.coordinates[1], lng: marker.geometry.coordinates[0] }}
                    name={marker.properties.NAME}
                    occupied={0}
                    full={marker.properties.NO_SPACES}
                    map={map}
                    google={google}
                	onClick={this.props.onMarkerClick}
                ></Marker>
            }
        );
    }
}
export default Markers;