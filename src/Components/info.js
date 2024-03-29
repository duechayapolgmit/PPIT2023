import React from "react";
import directionsImage from '../Images/directions-dark.png';

export class InfoCard extends React.Component {

    // Get percent HTML. Will not show if capacity is 0.
    getPercent(name, occupy, full) {
        if (name === "Current Location" || full == 0) return;
        let percentage = this.getPercentage(occupy, full).toFixed(0);
        let bgColour = this.getPercentageColour(percentage);
        return <span className={`${bgColour} pl-4 pr-4`}>{percentage + "%"}</span>
    }

    // Get percentage from values parsed in (uses space.empty and space.full values)
    getPercentage(empty, full) {
        if (full == 0) return 0;
        let percent = parseFloat(empty) / parseFloat(full);
        return percent * 100;
    }

    // Get the colour for the percentage background
    getPercentageColour(percent) {
        // may revisit later
        if (percent < 25) return "bg-green-500";
        if (percent < 50) return "bg-yellow-300";
        if (percent < 75) return "bg-orange-300";
        return "bg-red-300";
    }

    // Get capacity HTML. Will not show if capacity is 0.
    getCapacity(occupy, capacity) {
        if (capacity == 0) return;
        else return <p>Capacity: {occupy} / {capacity}</p>;
    }

    render() {
        let percent = this.getPercent(this.props.name, this.props.occupied, this.props.full);
        let capacity = this.getCapacity(this.props.occupied, this.props.full);

        var origin = this.props.lat + "," + this.props.lon;
        let destination = 0;
        if (this.props.marker.position != undefined) destination = this.props.marker.position;

        //generate URL for directions
        var longitude = destination.lng;
        var latitude = destination.lat;
        var url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${latitude},${longitude}`;

        let imageStyle = { width: '40px', height: '40px' };
        if(this.props.marker.name == "Current Location")imageStyle = { width: '0px', height: '0px' };
        return (
            <div className="container text-left" id="infoWindow">
                <h1 className="text-xl font-bold">{percent} {this.props.marker.name}</h1>
                {capacity}
                <p>{this.props.type}</p>
                <a href={url}><img src={directionsImage} style={imageStyle}/></a>
                
            </div>
        )
    }
}