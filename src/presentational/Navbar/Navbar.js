import React , { Component } from 'react'
import styles from './Navbar.css'

class Navbar extends Component {

    render() {
        return(
            <nav>
                <div className = "nav-wrapper">
                    <a className="brand-logo center">mooch</a>
                    <div className = "left">
                        <a className = {styles.padL}>home </a>
                    </div>
                    <div className = "right">
                        <a className = {styles.padR}>logout </a>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar