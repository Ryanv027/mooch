import React , { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import AddGroupBox from '../Group/Boxes/AddGroupBox'
import GroupBox from '../Group/Boxes/GroupBox'
// import styles from './Dashboard.css'

class Dashboard extends Component {
    state = {

    }

    render() {
        return (
            <div>
                <Navbar />
                <div>
                   <AddGroupBox />
                   <GroupBox />
                </div>
            </div>
        )
    }
}

export default Dashboard