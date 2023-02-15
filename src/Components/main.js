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

    getPosition(){
        
    }

    render() {
        const mapStyles = {
            width: '100%',
            height: '100%',
        };
        return (
            <Map
                google={this.props.google}
                zoom={15}
                style={mapStyles}
                initialCenter={{lat: 53.27427890260826, lng: -9.049029548763558}}
                center= {{ lat: this.state.latitude, lng: this.state.longitude }}
            >
                <Marker position={{ lat: this.state.latitude, lng: this.state.longitude }} />
            </Map>

        )

    }
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(Main);