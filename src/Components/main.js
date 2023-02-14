import React from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class Main extends React.Component {
    render() {
        const mapStyles = {
            width: '100%',
            height: '100%',
        };
        return (
            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 53.270962, lng: -9.062691 }}

            >
                <Marker position={{ lat: 53.27078784297829, lng: -9.05478100521472 }} />
            </Map>

        )

    }
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(Main);