import React from 'react';
import './Entry.css';
import { data }  from './data';

// All necessary data to each quiz question
class Entry extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userAnswers: []
        }
    }
    // METHOD: Shuffles the index of a sorted arrray 
    shuffle = (array) => {
        array.sort(() => Math.random() - 0.5);
    }
    // METHOD: Handles 'onClick' event listener in radios from 'getPossibleAnswers()'
    handleOnClick = (e) => {
    
        //Storing the checked answered 
        let index = this.props.cursor;
        let obj = data[index];
        obj["answer"] = e.target.value;
        // Updating 'userAnswers' in the state
        this.setState({userAnswers: data});
        this.props.onChoiceSelected(e.target.value);
    }
    getPossibleAnswers = () => {
        
        const { entry, cursor } = this.props;

        if(data[cursor]["passed"] === false) {   // Initial visit to the page
        
           
            var answers = [entry.guesses[0], entry.guesses[1], entry.guesses[2]];
            
            //Records the choices 
            let index = this.props.cursor;
            let obj = data[index];
            obj["choices"] = answers;

            //To show that this page has been passed 
            data[cursor]["passed"] = true;
            // Randomized the option locations 
            this.shuffle(answers);
            return(
                <div>
                    <input type="radio" name="categories" className="answers" onClick={this.handleOnClick} checked={this.state.userAnswers[cursor] === answers[0] ? "checked" : ""} value={answers[0]}/> {answers[0]}
                    <input type="radio" name="categories" className="answers" onClick={this.handleOnClick} checked={this.state.userAnswers[cursor] === answers[1] ? "checked" : ""} value={answers[1]}/>{answers[1]}
                    <input type="radio" name="categories" className="answers" onClick={this.handleOnClick} checked={this.state.userAnswers[cursor] === answers[2] ? "checked" : ""} value={answers[2]}/> {answers[2]}
                </div>
            );
        }else{ // 
            // Get all the stored choices 
            let index = this.props.cursor;
            let obj = data[index];
            let storedChoices =  obj["choices"];
            let currAnswer = obj["answer"];

            return(
                <div>
                    <input type="radio" name="categories" className="answers" onClick={this.handleOnClick} checked={currAnswer === storedChoices[0] ? "checked" : ""} value={storedChoices[0]}/> {storedChoices[0]}
                    <input type="radio" name="categories" className="answers" onClick={this.handleOnClick} checked={currAnswer === storedChoices[1]? "checked" : ""} value={storedChoices[1]}/>{storedChoices[1]}
                    <input type="radio" name="categories" className="answers" onClick={this.handleOnClick} checked={currAnswer === storedChoices[2] ? "checked" : ""} value={storedChoices[2]}/> {storedChoices[2]}
                </div>
            );
        }

    }
    // METHOD: Renders the return values into GUI 
    render() {

        const { entry } = this.props;
        return(
            <div>
                <div className="allEntries">
                    <p id="question">
                    <div id="image"><img src={require("../images/" + entry.image)} alt={entry.image}/></div>
                    <div clas="artistCreds">
                       <i>{entry.artist}</i>
                    </div>
                    {entry.question}</p>
                    {this.getPossibleAnswers()}
                </div>
                
            </div>
        );
    }}

export default Entry;