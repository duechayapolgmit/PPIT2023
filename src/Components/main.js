import React from "react";
import * as ReactDOM from 'react-dom';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { InfoCard } from "./info";
import { Markers } from "./markers";
import FindButton from "./find";
import MarkersSidebar from "./listMarkers";

import favourite_empty from '../Images/favourite_empty.png';
import favourite_full from '../Images/favourite_full.png';


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
        markers: [],
        favourites: []
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(pos => {
            this.setState({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
        })

        fetch('https://services-eu1.arcgis.com/Zmea819kt4Uu8kML/arcgis/rest/services/CarParkingOpenData/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ markers: responseJson.features })
            })
            .catch((error) => {
                console.error(error);
            });

        //retrieve favourites from local storage
        var favourites = localStorage.getItem('favourites');
        if (favourites) { //if favourites is not empty
            favourites = JSON.parse(favourites)
            this.setState({ favourites: favourites });
        }
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onFavouritesClick = (marker) => {
        var favourites = JSON.parse(localStorage.getItem('favourites'));
        if (favourites.includes(marker.id)) {
            favourites = favourites.filter(id => id !== marker.id);
        } else {
            favourites.push(marker.id);
        }
        localStorage.setItem("favourites", JSON.stringify(favourites));
        this.setState({ favourites: favourites });
        console.log(localStorage);
    }

    onFindButtonClick = (markers) => {
        this.setState({
            markers: markers
        })
        document.getElementById("markers-list-menu").classList.add("menu-show")
        console.log(markers);
    }

    onInfoWindowOpen(props, e) {
        var favourites = JSON.parse(localStorage.getItem('favourites'));
        let button = document.createElement('button');
        let image = document.createElement('img');
        let imageStyle = { width: '40px', height: '40px' };
        
        if (favourites.includes(this.state.selectedPlace.id)) {
            image.src = favourite_full;
        } else {
            image.src = favourite_empty;
        }

        image.width = "40";
        image.height = "40";

        button.appendChild(image);
        button.addEventListener('click', () => {
            this.onFavouritesClick(this.state.selectedPlace)
        });
        const infoWindow = document.getElementById('infoWindow');
        if (this.state.selectedPlace.id != null) {
            infoWindow.appendChild(button);
        }

    }

    render() {
        const mapStyles = {
            width: '100%',
            height: '100%',
        };
        // Use z-index CSS for overlays - set it higher than 100
        return (
            <Map
                className="background"
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{ lat: 53.27427890260826, lng: -9.049029548763558 }}
                center={{ lat: this.state.latitude, lng: this.state.longitude }}
                streetViewControl={false}
                mapTypeControl={false}
            >
                <Marker title={'Current Location'} name={'Current Location'} occupied={0} full={0} type={""} position={{ lat: this.state.latitude, lng: this.state.longitude }}
                    onClick={this.onMarkerClick}>
                </Marker>

                <Markers markers={this.state.markers} onMarkerClick={this.onMarkerClick} />
                <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onOpen={e => { this.onInfoWindowOpen(this.props, e); }}>
                    <InfoCard favourites={this.state.favourites} lat={this.state.latitude} lon={this.state.longitude}
                        space={{ occupied: this.state.activeMarker.occupied, full: this.state.activeMarker.full }}
                        type={this.state.activeMarker.type} marker={this.state.selectedPlace} onFavouritesClick={this.onFavouritesClick} />
                </InfoWindow>
                <MarkersSidebar markers={this.state.markers} lat={this.state.latitude} lon={this.state.longitude} />
                <FindButton lat={this.state.latitude} lng={this.state.longitude} markers={this.state.markers} onFindButtonClick={this.onFindButtonClick} />

            </Map>
        )

    }
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(Main);