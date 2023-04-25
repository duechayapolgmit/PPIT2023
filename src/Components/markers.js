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
                //changing color to yellow if the marker is one of the favourites                
                var favourites = JSON.parse(localStorage.getItem('favourites'));

                if (favourites == null) 
                    markerColor = 'red';
                else{
                    var isFavourite = favourites.includes(marker.id);
                    var markerColor = isFavourite ? 'yellow' : 'red';
                }

                return <Marker
                    position={{ lat: marker.latitude, lng: marker.longitude }}
                    name={marker.markerName}
                    type={marker.type}
                    id={marker.id}
                    occupied={marker.occupied}
                    full={marker.full}
                    map={map}
                    google={google}
                	onClick={this.props.onMarkerClick}
                    icon={{
                        url: `http://maps.google.com/mapfiles/ms/micons/${markerColor}-dot.png`,
                        scaledSize: new google.maps.Size(40, 40), 
                      }}
                ></Marker>
            }
        );
    }
}
export default Markers;