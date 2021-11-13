import React, { Component } from 'react';
import styles from "./Chain.module.css";

export default function Chain (props: any) {
    return (
        <div  className={styles.container}>
        <div className={styles.dot} style={{backgroundColor: props.dotcolor}}></div>
        <div className={styles.blockchain} >
            {props.blockchain}
        </div>
        
        </div>
    )
}
