import React from "react";

export class InfoCard extends React.Component{

    // Get percentage from values parsed in (uses space.empty and space.full values)
    getPercentage(){
        if (this.props.space.full == 0) return 0;
        let percent = parseFloat(this.props.space.empty) / parseFloat(this.props.space.full);
        return percent*100;
    }

    // Get the colour for the percentage background
    getPercentageColour(percent){
        // may revisit later
        if (percent < 25) return "bg-green-500";
        if (percent < 50) return "bg-yellow-300";
        if (percent < 75) return "bg-orange-300";
        return "bg-red-300";
    }

    // Handle if the capacity is not known or zero. If that's the case -> display 0
    getCapacity(capacity){
        if (capacity == 0) return 0;
        else return capacity;
    }

    render(){
        let percent = this.getPercentage().toFixed(0);
        let bgColour = this.getPercentageColour(percent);
        let capacity = this.getCapacity(this.props.space.full);
        return (
            <div className="container text-left">
                <h1 className="text-xl font-bold">
                    <span className={`${bgColour} pl-4 pr-4`}>{percent+"%"}</span>&nbsp;
                    {this.props.marker}
                </h1>
                <p>Capacity: {this.props.space.empty} / {capacity}</p>
                <p>{this.props.type}</p>
            </div>
        )
    }
}