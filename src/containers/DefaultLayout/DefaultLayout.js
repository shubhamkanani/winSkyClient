import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import{logout} from '../../Authentications'
import {
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
import adminNavigation from '../../admin_nav';
// routes config
import routes from '../../routes';
import {connect} from "react-redux";

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

    loading = () => <div className="animated fadeIn pt-1 text-center"><i className="fa fa-spin  fa-spinner fa-5x"></i></div>

    signOut(e) {
        e.preventDefault()
        logout();
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="app">
                <AppHeader fixed>
                    <Suspense  fallback={this.loading()}>
                        <DefaultHeader onLogout={e=>this.signOut(e)}/>
                    </Suspense>
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed display="lg">
                        <AppSidebarHeader />
                        <AppSidebarForm />
                        {this.props.items.data[0].role==='admin'?
                            <Suspense>
                                <AppSidebarNav navConfig={adminNavigation} {...this.props} router={router}/>
                            </Suspense>
                            :
                            <Suspense>
                                <AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
                            </Suspense>
                        }
                        <AppSidebarFooter />
                        <AppSidebarMinimizer />
                    </AppSidebar>
                    <main className="main">

                        <Container fluid>
                            <Suspense fallback={this.loading()}>
                                <Switch>
                                    {routes.map((route, idx) => {
                                        return route.component ? (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={props => (
                                                    <route.component {...props} />
                                                )} />
                                        ) : (null);
                                    })}
                                    <Redirect from="/" to="/dashboard" />
                                </Switch>
                            </Suspense>
                        </Container>
                    </main>
                </div>
                <AppFooter>
                    <Suspense fallback={this.loading()}>
                        <DefaultFooter />
                    </Suspense>
                </AppFooter>
            </div>
        );
    }
}
const mapStateToProps = state =>({
    ...state,
    // console.log(userData.items.data[0].role)
    // return userData.items.data[0].role
})
export default connect(mapStateToProps,null)(DefaultLayout);
