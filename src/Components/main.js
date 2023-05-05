import React from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { InfoCard } from "./info";
import { Markers } from "./markers";
import { FooterMenu } from "./footerMenu";
import MarkersSidebar from "./listMarkers";
import Menu, { MenuList } from "./menu";

import FavouritesSidebar from "./favourites";
import accessiblebays from "../Data/accessiblebays.geojson"
import favourite_empty from '../Images/favourite_empty.png';
import favourite_full from '../Images/favourite_full.png';

import bell_on from '../Images/bell-on.png';
import bell_off from '../Images/bell-off.png';

export class Main extends React.Component {

    markersInfo = []; // Outside of state, as setting the state will refresh the entire thing

    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    state = {
        showingInfoWindow: false,
        selectedPlace: {},
        activeMarker: {},
        activeMarkerInfo: {
            occupied: 0, full: 0
        },
        latitude: 0,
        longitude: 0,
        currentLocationName: "",
        markers: [],
        accessiblebays: [],
        notify: false
    }

    componentDidMount() {
        if (!("Notification" in window)) console.log("This browser does not support notifications")
        else Notification.requestPermission(); // request notification
        let latitude, longitude;

        // Get current location via geolocation services from JS
        navigator.geolocation.getCurrentPosition(pos => {
            latitude = pos.coords.latitude;
            longitude = pos.coords.longitude;
            this.setState({ latitude: latitude, longitude: longitude })
            console.log("nav")
            // Get information from current location
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
                .then(res => res.json())
                .then(resJson => {
                    this.setState({ currentLocationName: resJson.results[0].formatted_address });
                    console.log("info")
                    this.getData();
                });
        })

        this.interval = setInterval(() => {
            this.markersInfo = this.setInfoData()
        }, 30000);
    }

    // Get data from API
    getData() {
        console.log('data')
        var markersData, accessibilityMarkersData;
        fetch('https://services-eu1.arcgis.com/Zmea819kt4Uu8kML/arcgis/rest/services/CarParkingOpenData/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson')
            .then((response) => response.json())
            .then((responseJson) => {
                markersData = responseJson.features;

                fetch(accessiblebays)
            .then((response) => response.json())
            .then((responseJson) => {
                accessibilityMarkersData = responseJson.features;
                //merge markers
                var markers = [];
                markersData.map((marker) => {
                    markers.push(marker)
                })
                accessibilityMarkersData.map((marker) => {
                    markers.push(marker)
                })
                this.setState({ markers: this.setData(markers) }) // Set marker geographical information
                this.markersInfo = this.setInfoData(this.setData(markers)); // Set marker array information

            })
            .catch((error) => {
                console.error(error);
            });
            })
            .catch((error) => {
                console.error(error);
            });

        
    }

    // Set geological data to an array of markers
    setData(markersArray) {
        let finalArray = [];

        markersArray.forEach(element => {
            let tempElement = {
                id: 0, markerName: "", latitude: 0, longitude: 0, type: "", capacity: 0
            }
            if (element.properties.FID != null) {
                tempElement.id = "A" + element.id
                tempElement.markerName = "Accessibility Bay"
            } else {
                tempElement.id = element.id;
                tempElement.markerName = element.properties.NAME;
                tempElement.capacity = element.properties.NO_SPACES;
            }
            tempElement.longitude = element.geometry.coordinates[0]
            tempElement.latitude = element.geometry.coordinates[1]
            tempElement.type = element.properties.TYPE;
            finalArray.push(tempElement);
        });
        return finalArray;
    }

    // Set informational data (parking spaces) to an array of markers information
    setInfoData(markers) {
        let finalArray = [];
        console.log('set info data')
        let markersArray;
        if (markers) {
            markersArray = markers; // get the markers from parameters
        }
        else {
            markersArray = this.state.markers; // get the markers from state
        }
        // Loop through the markers array, get info data
        markersArray.forEach(element => {
            let tempElement = {
                id: 0, occupied: 0, full: 0
            };
            tempElement.id = element.id;
            tempElement.full = element.capacity;
            if (tempElement.full == "") tempElement.full = 0;
            tempElement.occupied = Math.round(Math.random() * tempElement.full); // random number generator for occupied spaces -- temporary

            finalArray.push(tempElement);

            // Notify user if the parking space is almost full
            if ((tempElement.occupied / tempElement.full) > 0.01 && this.state.notify === true) {
                let markerName = this.state.markers.find((element) => tempElement.id === element.id).markerName;

                new Notification(markerName + " is almost full.")
            }
        })  
        return finalArray;
    }

    onMarkerClick = (props, marker, e) => {
        let activeMarkerInfo = this.markersInfo.find((element) => element.id == marker.id);
        this.setState({
            selectedPlace: props,
            activeMarkerInfo: activeMarkerInfo,
            activeMarker: marker,
            showingInfoWindow: true
        });
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

    onFavouritesMenuClick = (markers) => {
        this.setState({
            markers: markers
        })
        document.getElementById("favourites-list-menu").classList.add("menu-show")
        console.log(markers);
    }

    onMenuCloseButtonClick = () => {
        document.getElementById("menu-overlay-list").classList.remove("menu-show");
    }

    shouldComponentUpdate(nextProps) {
        return true;
    }

    onFavouritesClick = (marker) => {
        var favourites = JSON.parse(localStorage.getItem('favourites'));
        if (favourites == null) favourites = []
        if (favourites.includes(marker.id)) {
            favourites = favourites.filter(id => id !== marker.id);
        } else {
            favourites.push(marker.id);
        }
        localStorage.setItem("favourites", JSON.stringify(favourites));
        this.setState({ favourites: favourites });
    }

    onInfoWindowOpen(props, e) {
        console.log("info window open")
        // if activeMarkerInfo is undefined, set a default onw
        if (this.state.activeMarkerInfo == null) {
            this.setState({ activeMarkerInfo: { occupied: 0, full: 0 } })
        }

        var favourites = JSON.parse(localStorage.getItem('favourites'));
        if (favourites == null) favourites = []
        let button = document.createElement('button');
        let image = document.createElement('img');

        if (favourites.includes(this.state.selectedPlace.id) ) {
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
        if (this.state.selectedPlace.id != null && this.state.selectedPlace.id[0] != "A") {
            infoWindow.appendChild(button);
        }
    }

    onNotifyButtonClick() {
        let notifyButton = document.getElementById("notify-button");
        if (this.state.notify == true) {
            this.setState({ notify: false });
            notifyButton.src = bell_off;
        } else {
            this.setState({ notify: true });
            notifyButton.src = bell_on;
        }
    }

    render() {
        const mapStyles = {
            width: '100%',
            height: '100%',
        };
        // Use z-index CSS for overlays - set it higher than 100

        //controlling the center of the screen so the user
        //doesn't go back to their current location each time they
        //click on a marker
        var center;
        if (this.state.selectedPlace.position === undefined) {
            center = { lat: this.state.latitude, lng: this.state.longitude };
        } else {
            center = { lat: this.state.selectedPlace.position.lat, lng: this.state.selectedPlace.position.lng };
        }
        return (
            <Map
                className="background"
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{ lat: 53.27427890260826, lng: -9.049029548763558 }}
                center={center}
                streetViewControl={false} mapTypeControl={false} fullscreenControl={false}
            >
                <Menu currentLocation={this.state.currentLocationName} onClickMenuButton={this.onMenuButtonClick} />
                <Marker title={'Current Location'} name={'Current Location'} occupied={0} full={0} type={""} position={{ lat: this.state.latitude, lng: this.state.longitude }}
                    onClick={this.onMarkerClick} icon={{ url: 'http://maps.google.com/mapfiles/ms/micons/green-dot.png', scaledSize: new window.google.maps.Size(40, 40) }}>
                </Marker>

                <Markers accessiblebays={this.state.accessiblebays} markers={this.state.markers} onMarkerClick={this.onMarkerClick.bind(this)} />
                <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onOpen={e => { this.onInfoWindowOpen(this.props, e); }}>
                    <InfoCard markersInfo={this.markersInfo} lat={this.state.latitude} lon={this.state.longitude} type={this.state.activeMarker.type} marker={this.state.selectedPlace}
                        occupied={this.state.activeMarkerInfo.occupied} full={this.state.activeMarkerInfo.full} />
                </InfoWindow>

                <MarkersSidebar markers={this.state.markers} markersInfo={this.markersInfo} lat={this.state.latitude} lon={this.state.longitude} />
                <FooterMenu lat={this.state.latitude} lng={this.state.longitude} markers={this.state.markers} onNotifyButtonClick={this.onNotifyButtonClick.bind(this)} onFindButtonClick={this.onFindButtonClick} />
                <MenuList onClickMenuCloseButton={this.onMenuCloseButtonClick} onFavouritesMenuClick={this.onFavouritesMenuClick} markers={this.state.markers} />
                <FavouritesSidebar markers={this.state.markers} markersInfo={this.markersInfo} lat={this.state.latitude} lon={this.state.longitude} />
            </Map>
        )

    }
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(Main);