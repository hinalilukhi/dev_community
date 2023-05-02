import './App.css';
import React,{ Fragment, useEffect } from 'react'
import Navbar  from './components/layout/Navbar';
import Landing  from './components/layout/Landing';
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import  Login  from './components/auth/Login';
import  Register  from './components/auth/Register';
import store from './Store';
import { Provider } from 'react-redux';
import Alerts from './components/layout/Alerts';
import setAuthToken from './utills/setAuthToken';
import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import ResetAccount from './components/auth/ResetAccount';
import SetPassword from './components/auth/SetPassword';
if(localStorage.token)
{
  setAuthToken(localStorage.token)
}
const App=()=> {
  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);

  return (
    <Provider store={store}>
   <Router>

   <Fragment>
   <Navbar/>

   <Route exact path="/" component={Landing}></Route>
 
   <Alerts/>
    <Switch>

     <Route exact path="/api/password-reset/:userId/:token" component={SetPassword}></Route>
     <Route exact path="/login" component={Login}></Route>
     <Route exact path="/register" component={Register}></Route>
     <Route exact path="/dashboard" component={Dashboard}></Route>
     <Route exact path="/profiles" component={Profiles}></Route>
     <Route exact path="/profile/:id" component={Profile}></Route>
     <Route exact path="/reset-password" component={ResetAccount}></Route>

     <PrivateRoute exact path="/create-profile" component={CreateProfile}></PrivateRoute>
     <PrivateRoute exact path="/edit-profile" component={EditProfile}></PrivateRoute>
     <PrivateRoute exact path="/add-education" component={AddEducation}></PrivateRoute>
     <PrivateRoute exact path="/add-experience" component={AddExperience}></PrivateRoute>
     <PrivateRoute exact path="/posts" component={Posts}></PrivateRoute>
     <PrivateRoute exact path="/posts/:id" component={Post}></PrivateRoute>
    </Switch>
   </Fragment>  
   </Router> 
   </Provider>
  );
}

export default App;
