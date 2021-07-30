
import React from 'react';

import Banner from "./Banner";
import Navigation from './Navigation';

import styles from "./SimplePage.module.css";

class SimplePage extends React.Component {

  render(){
    return (
      <div className={styles.page}>
        <Banner />
        <Navigation />
        <div className={styles.content}>
          {this.props.children}
        </div>
        <div className={styles.background}/>
      </div>
    );
  }
};

export default SimplePage;