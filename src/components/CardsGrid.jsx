import React from "react";
import {Card} from './Card';
import persons from './data.json';

export class CardsGrid extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            btnTxt: 'Grid',
            isGrid: true
        }
    }

    selectGrid = () =>{
        this.setState({
            btnTxt: 'Grid',
            isGrid: true
        })
    }
    
    selectList = () =>{
        this.setState({
            btnTxt: 'List',
            isGrid: false
        })
    }

    render(){
        return(
            <div>
                <div className="main-title">
                    <h2>Previous Rulings</h2>
                    <div className="dropdown">
                        <button className="dropbtn">{this.state.btnTxt}</button>
                        <div className="dropdown-content">
                            <button onClick={this.selectList}>List</button>
                            <button onClick={this.selectGrid}>Grid</button>
                        </div>
                    </div>
                </div>
                <div className="cards-slider">
                    <div className={`cards-container${this.state.isGrid ? ' cards-grid' : ""}`}>
                        {
                            persons.data.map(person => (<Card person={person} />) )
                        }
                    </div>
                </div>
            </div>
        )
    }
}