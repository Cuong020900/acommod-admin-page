import React from "react";

import { connect } from 'react-redux'

export function requireAuthentication(Component) {
    class AuthenticatedComponent extends React.Component {

        componentDidMount () {
            if (this.props.userInfo.userName === "") {
                this.props.history.push("/pages/login")
            }
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