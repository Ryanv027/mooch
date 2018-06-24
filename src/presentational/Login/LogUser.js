import React , { Component } from 'react'

class LogUser extends Component {
    render = () => {
        return (
            <div className="row">
                <div className = "col s10 offset-s1 center">
                <form className="col s10">
                    <div className="row">
                        <div className="input-field col s6">
                            <input placeholder = "username" type="text" className="validate" />
                        </div>
                        <div className="input-field col s6">
                            <input placeholder = "password" type="password" className="validate" />
                        </div>
                    </div>
                    <button className = "btn waves-effect waves light">submit</button>
                </form>
                </div>
            </div>
        )
    }
}

export default LogUser