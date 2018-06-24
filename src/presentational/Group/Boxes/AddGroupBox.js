import React , { Component } from 'react'
import styles from '../Group.css'

class AddGroupBox extends Component {

    sayPow = () => {
        console.log("pow")
    }

    render = () => {
        return (
            <div className = {styles.addGroupBox} onClick = {this.sayPow}>
                <h5 className = "center">Yo-Yo Ma's Mama's yo-yo, yo</h5>
            </div>
        )
    }
}

export default AddGroupBox