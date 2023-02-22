import React from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { InfoCard } from "./info";
import { Markers } from "./markers";


export class Main extends React.Component {

    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    state = {
        showingInfoWindow: false,
        selectedPlace: {},
        activeMarker: {},
        latitude: 0,
        longitude: 0,
        markers: []
    }

    componentDidMount() {
        var markersLocation, currentPosition;
        navigator.geolocation.getCurrentPosition(pos => {
            this.setState({ latitude: pos.coords.latitude, longitude: pos.coords.longitude})
        })

        fetch('https://services-eu1.arcgis.com/Zmea819kt4Uu8kML/arcgis/rest/services/CarParkingOpenData/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({ markers: responseJson.features })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true});
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
                streetViewControl={false}
            >
                <Marker title={'Current Location'} name={'Current Location'} position={{ lat: this.state.latitude, lng: this.state.longitude }} 
                        onClick={this.onMarkerClick}>
                </Marker>
                <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
                    <InfoCard space={{empty:200, full:200}} type={"Pay/Display"} marker={this.state.activeMarker.name}/>
                </InfoWindow>

                <Markers markers={this.state.markers}></Markers>
            </Map>

        )

    }
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(Main);