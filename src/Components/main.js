import React from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class Main extends React.Component {

    state = {
        latitude: 0,
        longitude: 0
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(pos => {
            this.setState({latitude:pos.coords.latitude, longitude:pos.coords.longitude})
        })
    }

    render() {
        const mapStyles = {
            width: '100%',
            height: '100%',
        };
        console.log(this.state.latitude + ", "+this.state.longitude);
        return (
            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: this.state.latitude, lng: this.state.longitude }}

            >
                <Marker position={{ lat: this.state.latitude, lng: this.state.longitude }} />
            </Map>

        )

    }
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(Main);