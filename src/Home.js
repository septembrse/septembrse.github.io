
import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import styles from "./Home.css"

const Home = () => {
    return (
        <div>
            <h1>SeptembRSE</h1>
            <Link to="/interstitial">Interstitial</Link>
            <p>Under construction</p>
        </div>
    );
};
export default Home;
