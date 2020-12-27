import React from "react";

import { connect } from 'react-redux'

export function requireAuthentication(Component) {
    class AuthenticatedComponent extends React.Component {

        componentDidMount () {
            // check con trong phien dang nhap hay khong
            let isLoggedIn = false
            fetch("https://localhost:5000/api/Login/check", {
                credentials: 'include'
            }).then(e => e.json()).then(e => {
                isLoggedIn = e.status
                if (!isLoggedIn || localStorage.getItem('userName') === null) {
                    this.props.history.push("/pages/login")
                }
                if (isLoggedIn) {
                    localStorage.setItem('userName', e.userName)
                }
            })
        }

        render() {
            return (
                <Component />
            )
        }
    };

    const mapStateToProps = (state, ownProps) => {
        return {
          userInfo: state.auth.userInfo
        }
    }
    
    return connect(mapStateToProps)(AuthenticatedComponent)

}

export default requireAuthentication