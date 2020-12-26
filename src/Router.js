import React, { Suspense, lazy } from "react"
import { Router, Switch, Route } from "react-router-dom"
import { history } from "./history"
import { connect } from "react-redux"
import Spinner from "./components/@vuexy/spinner/Loading-spinner"
import { ContextLayout } from "./utility/context/Layout"

import requireAuthentication from "./HOC/auth"


// Route-based code splitting
const Home = lazy(() =>
  import("./views/pages/Home")
)

const DashBoard = lazy(() =>
  import("./views/pages/Dashboard")
)

const login = lazy(() =>
  import("./views/pages/authentication/login/Login")
)

const userList = lazy(() => import("./views/pages/user/list/List"))
const userEdit = lazy(() => import("./views/pages/user/edit/Edit"))
const userView = lazy(() => import("./views/pages/user/view/View"))
const postManage = lazy(() => import("./views/pages/posts/PostManage"))
const listPost = lazy(() => import("./views/pages/posts/ListPost"))
const postReport = lazy(() => import("./views/pages/posts/Report"))
const requestExtend = lazy(() => import("./views/pages/posts/RequestExtend"))
const cmtManager = lazy(() => import("./views/pages/posts/CommentManage"))

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => (
    <Route
      {...rest}
      render={props => {
        return (
          <ContextLayout.Consumer>
            {context => {
              let LayoutTag =
                fullLayout === true
                  ? context.fullLayout
                  : context.state.activeLayout === "horizontal"
                    ? context.horizontalLayout
                    : context.VerticalLayout
              return (
                <LayoutTag {...props} permission={props.user}>
                  <Suspense fallback={<Spinner />}>
                    <Component {...props} />
                  </Suspense>
                </LayoutTag>
              )
            }}
          </ContextLayout.Consumer>
        )
      }}
    />
  )
const mapStateToProps = state => {
  return {
    user: state.auth.login.userRole
  }
}

const AppRoute = connect(mapStateToProps)(RouteConfig)

class AppRouter extends React.Component {
  render () {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute
            exact
            path="/"
            component={Home}
          />
          <AppRoute
            path="/dashboard"
            component={requireAuthentication(DashBoard)}
          />
          <AppRoute
            path="/pages/login"
            component={login}
            fullLayout
          />
          <AppRoute
            path="/admin/user-manage"
            component={
              lazy(() =>
                import("./views/pages/Dashboard/UserManage")
              )
            }
          />
          <AppRoute path="/app/user/list" component={requireAuthentication(userList)} />
          <AppRoute path="/app/user/edit" component={requireAuthentication(userEdit)} />
          <AppRoute path="/app/user/view" component={requireAuthentication(userView)} />
          <AppRoute path="/app/admin/post-manage/:id" component={requireAuthentication(postManage)} />
          <AppRoute path="/app/admin/list-post" component={requireAuthentication(listPost)} />
          <AppRoute path="/app/admin/post-report" component={requireAuthentication(postReport)} />
          <AppRoute path="/app/admin/request-extend" component={requireAuthentication(requestExtend)} />
          <AppRoute path="/app/admin/cmt-manage" component={requireAuthentication(cmtManager)} />
        </Switch>
      </Router>
    )
  }
}

export default AppRouter
