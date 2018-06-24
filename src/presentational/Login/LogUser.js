import React , { Component } from 'react'

class LogUser extends Component {
    render = () => {
        return (
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input placeholder = "username" type="text" className="validate" />
                        </div>
                        <div className="input-field col s6">
                            <input placeholder = "password" type="password" className="validate" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default LogUser