import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import server from '../ServerInterface/server';
import { Carousel } from 'react-bootstrap';
/* Other Components */
import Images from './Images';
/* All images  */
import Mathematics from "../images/math.png";
import Animals from "../images/animal1.png";
import Flowers from "../images/sunflower3.png";
// import Entry from './Entry';

class Home extends React.Component {
  // State of this component
  constructor(props) {
    super(props);
    // State is an object
    this.state = {
        username: ''    
    };
  };
  notSignedIn = () => {
    return(
      <div>
        <div id="notSignedInMessage">
           
        </div>
      </div>
    );
  }
  signedIn = (aName) => {
    /* 
    Desconstruct an object
    
    The line below is equivalent to the 2 lines below */ 
    // const entries  = this.state.entries; 
    // const cursor = this.state.cursor;
    const { entries, cursor } = this.state;

    return( 

      <div id="welcomeMessage">
        
      </div>
  );
  }

  // Render function: What user see on'Homepage'
  render() {
    // Capturing the passed in data from 'Login' component
    let username = '';
    // 'location' - All of the passed in data from other components will
    // be stored here in the 'location' method by props.
    const location = this.props.location;
    if(location) {
      if(location.state){
        if(location.state.user){
          username = location.state.user;
        }
      }
    }
    {/* A user has been logged in to the website */}
    if(username.length > 0){
      return(
        <div>
          <Link to='/'>Logout</Link>
          <div className="loginButton">
          {username}
          </div>
              {this.signedIn(username)}
              <Images aUsername={username}/>
        </div>
      );
      }else{
        return (
          <div className="Home">
      
            <div className="loginButton">
                {username.length > 0 ? username: 
                <Link to='/login'>Login</Link>}
            </div>
              Fun Poem Maker
              {this.notSignedIn()}
          </div>
        );
    }
  }
};

export default Home;
