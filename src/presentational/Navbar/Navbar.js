import React , { Component } from 'react'
import styles from './Navbar.css'

class Navbar extends Component {

    sayHello = () => {
        console.log("hello!")
    }

    render = () => {
        return (
            <nav>
                <div className = "nav-wrapper">
                        <a className="brand-logo center">mooch</a>
                    <div className = "left">
                        <ul>
                            <li>
                                <a className = {styles.padL} onClick = {this.sayHello}>home</a>
                            </li>
                        </ul>
                    </div>
                    <div className = "right">
                        <ul>
                            <li>
                                <a className = {styles.padR} onClick = {this.sayHello}>logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar