import React, { Component} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {loggedIn} from './Authentications'
import {connect} from 'react-redux';
import {fetchData} from './Reducer/Action/action'
// import { renderRoutes } from 'react-router-config';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center"><i className="fa fa-spin fa-spinner fa-5x"></i></div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const Forgot = React.lazy(()=>import('./views/Pages/Forgot'));
const Reset = React.lazy(()=>import('./views/Pages/Reset'));
const Gest = React.lazy(()=>import('./views/Gest/Gest'));
class App extends Component {

  async componentWillMount() {
    if(loggedIn()){
    await this.props.data()
  }
  }

  render() {
    const PrivateRoute = ({ component: Component, ...props }) => (
      <Route {...props} render={props => (
        loggedIn() ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/gest'
          }}/>
        )
      )}/>
    );

    return (
      <BrowserRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/forgetpassword" name="forget pass Page" render={props => <Forgot {...props}/>} />
              <Route exact path="/resetpassword" name="reset pass Page" render={props => <Reset {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route exact path="/gest" name="gest Page" render={props => <Gest {...props}/>} />
              <PrivateRoute path="/" name="Home" component={DefaultLayout}/>
            </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
  }
}
const mapDispatchToProps = (dispatch ) =>{
    return{
      data:()=>{dispatch(fetchData())}
    }
}
export default connect(null,mapDispatchToProps)(App);
