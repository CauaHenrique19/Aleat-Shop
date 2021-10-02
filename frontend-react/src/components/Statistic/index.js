import React from "react";

import './style.css'

const Statistic = ({ text, value, icon, color }) => {
    return(
        <div className="statistic" style={{ backgroundColor: color }} >
            <div className="info-container">
                <h2>{value}</h2>
                <h2>{text}</h2>
            </div>
            <div className="icon-container">
                <ion-icon name={icon}></ion-icon>
            </div>
        </div>
    )
}

export default Statistic