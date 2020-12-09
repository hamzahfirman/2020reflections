import React from 'react';
import './Images.css';
import { Redirect } from 'react-router-dom';
/* All images  */
import Mathematics from "../images/math.png";
import Animals from "../images/animal1.png";
import Flowers from "../images/sunflower3.png";
/* React-Bootstrap */
import { Table } from 'react-bootstrap';

class Images extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            categories: [
                {one: flowers, two: animals, three: mathematics},
            ],
            categoryName: ""
        }
    };
    // EVENT: Handles click events from images and changes the 'flowerName' value in the state with 
    // to the clicked flower name
    handleClick = (name) => {
        // event.preventDefault();
        this.setState({
            categoryName: name
        });

        // alert(name);
    }
    // FUNCTION: Returns a row with 4 columns of pictures 
    renderCategories = (cat) => {
    
        return (
            <tr>
                <td><img src={cat.one.picture} onClick={() => this.handleClick(cat.one.name)}/><br></br><div className="caption">{cat.one.name}</div></td>
                <td><img src={cat.two.picture} onClick={() => this.handleClick(cat.two.name)}/><br></br><div className="caption">{cat.two.name}</div></td>
                <td><img src={cat.three.picture} onClick={() => this.handleClick(cat.three.name)}/><br></br><div className="caption">{cat.three.name}</div></td>
            </tr>
        );
    }
   
    render(){

        if(this.state.categoryName.length > 0){ // flowerName is present 
            let username = this.props.aUsername;
            let from = { pathname: '/quiz', state: { categoryName: this.state.categoryName, username: username } }
            return (
                <Redirect to={from} />
             );
        }
        return(
            <div>
            <table className="tableFlowers" >
                {this.state.categories.map(this.renderCategories)}
            </table>
        </div>
        );}

}

// Quiz Categories 

class Category {
    constructor(name, pictureName) {
        this.name = name;
        this.picture = pictureName;
    }
}
// Flower Objects 
let flowers = new Category('life', Flowers);
let animals = new Category('divine', Animals);
let mathematics = new Category('sea', Mathematics);

export default Images;