import React from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Markers } from "./markers";

export class Main extends React.Component {

    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    state = {
        currentPos: {
            latitude: 0,
            longitude: 0
        },
        markers: []
    }

    componentDidMount() {
        var markersLocation, currentPosition;
        navigator.geolocation.getCurrentPosition(pos => {
            this.setState({ currentPos: {latitude: pos.coords.latitude, longitude: pos.coords.longitude},
                markers: []
             })
            //currentPosition = { latitude: pos.coords.latitude, longitude: pos.coords.longitude }
        })

        fetch('https://services-eu1.arcgis.com/Zmea819kt4Uu8kML/arcgis/rest/services/CarParkingOpenData/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ markers: responseJson.features })
                //markersLocation = responseJson.features
            })
            .catch((error) => {
                console.error(error);
            });

        this.setState({ currentPos: currentPosition, markers: markersLocation })
        console.log(this.state)
        console.log(markersLocation)
    }

    getPosition() {

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
                initialCenter={{ lat: 53.27427890260826, lng: -9.049029548763558 }}
                center={{ lat: this.state.currentPos.latitude, lng: this.state.currentPos.longitude }}
            >
                <Marker position={{ lat: this.state.currentPos.latitude, lng: this.state.currentPos.longitude }} />


                <Markers markers={this.state.markers} Reload={this.componentDidMount}></Markers>
            </Map>

        )

    }
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(Main);