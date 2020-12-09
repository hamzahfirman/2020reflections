import React from 'react';
import server from '../ServerInterface/server';
import Entry from './Entry';
import { Redirect } from 'react-router-dom';
// CSS File 
import './Quiz.css';
import { reset } from './data';

//Variables
var CHECKPOINT = false;
var allWords = [];
/* QUIZ TIME */
class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: [],
            cursor: 0,
            mounted: false,
            score: 0,
            finished: false,
            goHome: false,
            retry: false
        };
    }

    handleOnClickHome = () => {
        allWords = [];
        this.setState({goHome: true});
        this.setState({finished: false});
    
    }

    handleOnClickRetry = () => {
        allWords = [];
        reset();
        this.setState({cursor: 0});
        this.setState({retry: true});
        this.setState({score: 0});

    }
    handleOnClickFinish = () => {
        const { score } = this.state;
        reset();
        this.setState({retry: false});
        this.setState({finished: true});
    }
    onChoiceSelected = (answer) => {
        const { words } = this.state;
        allWords.push(answer); 
    }
    // MEHTOD: Handles back button whenever it gets clicked. It will 
    // take the user to the next question by substracting 1 from the cursor
    handleOnClickBack = () => {
        const { cursor } = this.state;
        this.setState({cursor: cursor - 1}); 
    }
    // MEHTOD: Handles next button whenever it gets clicked. It will 
    // take the user to the next question by adding 1 to the cursor
    handleOnClickNext = () => {
        try{ 
            const { score } = this.state;
            if(CHECKPOINT == true){
                this.setState({score: score + 10});
                this.setState({check: false});
                CHECKPOINT = false;
            }
            this.setState({cursor: this.state.cursor + 1});

        } catch(e) {
            console.log(e);
        }

    }
    // Calls 'Entry' component
    // NOTES: Once the event listener is executed below, it will 
    // sends an object that tells what event has happened 
    // For instance, it can tell you what key was pressed
    questions = () => {
        const { cursor, entries, score } = this.state;
        console.log(cursor + " " + entries);
        if((cursor == 0) && (cursor < entries.length -1)){ // Inital stage in the Quiz
            return (
                <div>
                    <Entry onChoiceSelected={this.onChoiceSelected} entry={entries[cursor]} cursor= {cursor}/> 
                    <div id="nextContainer">
                        <button id="nextButton" onClick={this.handleOnClickNext}>Next</button>
                    </div>

                </div>
            );

        }else if((cursor > 0) && (cursor < entries.length -1)) { // After passing the first question
            return (
                <div>
                    <Entry onChoiceSelected={this.onChoiceSelected} entry={entries[cursor]} cursor= {cursor}/> 
                    <div id="buttonContainer">
                        <button id="button"  onClick={this.handleOnClickNext}>Next</button>
                    </div>
         
                </div>
            );
        }
        return ( // When the user has reached the last queston of the Quiz
                <div>
                    <Entry onChoiceSelected={this.onChoiceSelected}  entry={entries[cursor]} cursor= {cursor}/>
                    <div id="backContainer">
                        <button id="theEndButtons" onClick={this.handleOnClickFinish}>Write the poem</button>
                    </div>

                </div>
            );
        
    }
   
    // This function will be executed after everything gets loaded in the DOM.
    // After 'render()' executed 
    componentDidMount() {

        var catName = "";

        const location = this.props.location;
        // const cat = {
        //     flowers: 0,animals: 1,mathematics: 2};
        if(location) {
            if(location.state){
                 if(location.state.categoryName){
                    catName = location.state.categoryName;
                    }
              }
         }

        // 'entries' - Calls a function 'fecthEntries()' in server.js component
        const quiz = server.fetchEntries(catName);
        // Passes a list of objects/ entries frome entries.js
        this.setState({entries: quiz.details});
        // Once the user pressed 
        // Also, it is placed in this component because 'window' object 
        // only available after 'render()' object gets render.
       
    }

    // Will be executed right before the page gets destroyed 
    componentWillUnmount(){
    // This will remove the current event listener in 'componentDidMount()'
    // right before the page gets detroyed 

    }   
    
    render() {

        const { score, finished, entries, goHome, retry } = this.state;
        if(retry === true){
            return(
                <div>
                 {this.questions()}
                </div> 
            );
        }
        if (goHome === true){
            let username = "";
            const location = this.props.location;
            username = location.state.username;
            let from = { pathname: '/', state: { user: username} }
            return (
                <div>
                  <Redirect to={from} />
                </div>
             );
        }
        if (finished === true){
            return(
                <div>
                    <div className="finishedContainer">
                        <div id="congrats"><i>Life</i> by {this.props.location.state.username}<br></br>
                        </div>
                        <p id="thePoem">
                        Pay attention to the {allWords[0]}<br></br>
                        The {allWords[0]} is the most {allWords[1]} chronicle of all<br></br>
                        Does the {allWords[2]} make you shiver?<br></br>
                        Does it?<br></br><br></br>
                        I cannot help but stop and <br></br>
                        look at the {allWords[3]} {allWords[4]}<br></br>
                        Now day time is just the thing, to get me <br></br>
                        wondering if {allWords[5]} is {allWords[6]}

                        </p>
                        <div className="lastPageButtons">
                        <button className="homeAndRetry" id="homeButton"  onClick={this.handleOnClickHome}>Home</button>
                        <button  className="homeAndRetry" id="retryButton" onClick={this.handleOnClickRetry}>Rewrite</button></div>
                    </div>
                </div>
            );
        }
        if(entries.length > 0){
            return(
                <div>
                    {this.questions()}
                </div>
            );
        }
        return(
            <div>
                Data is loading...
            </div>
        );

    }
}

export default Quiz;