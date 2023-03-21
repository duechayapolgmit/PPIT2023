import React from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { InfoCard } from "./info";
import { Markers } from "./markers";
import FindButton from "./find";
import MarkersSidebar from "./listMarkers";
import Menu, { MenuList } from "./menu";


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
        currentLocationName: "",
        markers: []
    }

    async componentDidMount() {
        let latitude, longitude;

        // Get current location via geolocation services from JS
        navigator.geolocation.getCurrentPosition(pos => {
            latitude = pos.coords.latitude;
            longitude = pos.coords.longitude;
            this.setState({ latitude: latitude, longitude: longitude})
        })

        await fetch('https://services-eu1.arcgis.com/Zmea819kt4Uu8kML/arcgis/rest/services/CarParkingOpenData/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.features)
                let markersList = this.setData(responseJson.features)
                console.log(markersList)
                this.setState({ markers: markersList})
            })
            .then(() => {
                
            })
            .catch((error) => {
                console.error(error);
            });
        
        // Get information from current location
        await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            .then(res => res.json())
            .then(resJson => {
                this.setState({currentLocationName: resJson.results[0].address_components[0].short_name});
                console.log(resJson.results[0].address_components[0].short_name)
            });
    }

    setData(markersArray) {
        let finalArray = [];
        markersArray.forEach(element => {
            let tempElement = {
                markerName: "", latitude: 0, longitude: 0, type: "", occupied: 0, full: 0
            }
            tempElement.markerName = element.properties.NAME;
            tempElement.longitude = element.geometry.coordinates[0]
            tempElement.latitude = element.geometry.coordinates[1]
            tempElement.type = element.properties.TYPE;
            tempElement.full = element.properties.NO_SPACES;
            if (tempElement.full == "") tempElement.full = 0;
            tempElement.occupied = Math.round(Math.random()*tempElement.full);
            finalArray.push(tempElement);
        });
        return finalArray;
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true});
        }

    onFindButtonClick = (markers) => {
        this.setState({
            markers: markers
        })
        document.getElementById("markers-list-menu").classList.add("menu-show")
        console.log(markers);
    }

    onMenuButtonClick = () => {
        document.getElementById("menu-overlay-list").classList.add("menu-show")
        console.log('click now')
    }

    onMenuCloseButtonClick = () => {
        document.getElementById("menu-overlay-list").classList.remove("menu-show");
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
                initialCenter={{lat: 53.27427890260826, lng: -9.049029548763558}}
                center= {{ lat: this.state.latitude, lng: this.state.longitude }}
                streetViewControl={false}
                mapTypeControl={false}
            >
                <Marker title={'Current Location'} name={'Current Location'} occupied={0} full={0} type={""} position={{ lat: this.state.latitude, lng: this.state.longitude }} 
                        onClick={this.onMarkerClick}>
                </Marker>

                <Markers markers={this.state.markers} onMarkerClick={this.onMarkerClick}/>
                <InfoWindow  marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
                    <InfoCard lat={this.state.latitude} lon={this.state.longitude} space={{occupied:this.state.activeMarker.occupied, full:this.state.activeMarker.full}} type={this.state.activeMarker.type} marker={this.state.selectedPlace}/>
                </InfoWindow>
                <MarkersSidebar markers={this.state.markers} lat = {this.state.latitude} lon = {this.state.longitude}/>
                <FindButton lat={this.state.latitude} lng={this.state.longitude} markers={this.state.markers} onFindButtonClick={this.onFindButtonClick}/>
                <Menu currentLocation={this.state.currentLocationName} onClickMenuButton={this.onMenuButtonClick}/>
                <MenuList onClickMenuCloseButton={this.onMenuCloseButtonClick}/>
            </Map>
        )

    }
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(Main);