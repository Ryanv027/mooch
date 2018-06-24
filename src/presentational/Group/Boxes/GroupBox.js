import React , { Component } from 'react'
import styles from '../Group.css'

class GroupBox extends Component {

    sayOw = () => {
        console.log("ow")
    }

    render = () => {
        return (
            <div className = {styles.groupBox} onClick = {this.sayOw}>
                <h5 className = "center">Yo-Yo Ma's Mama's yo-yo, yo</h5>
            </div>
        )
    }
}

export default GroupBox