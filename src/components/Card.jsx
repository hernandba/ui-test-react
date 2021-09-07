import React, { Component } from 'react'

export class Card extends Component {
    constructor(props) {

        super(props);

        this.name = this.props.person.name;
        this.description = this.props.person.description;
        this.category = this.props.person.category.charAt(0).toUpperCase() + this.props.person.category.slice(1);
        this.picture = this.props.person.picture;

        this.state = {
            btnUpSelected: false,
            btnDownSelected: false,
            voted: false,
            positives: this.props.person.votes.positive,
            negatives: this.props.person.votes.negative,
            lastDate: this.props.person.lastUpdated
        }
    }

    selectUp = () => {
        this.setState({
            btnUpSelected: true,
            btnDownSelected: false,
        })
    }

    selectDown = () => {
        this.setState({
            btnUpSelected: false,
            btnDownSelected: true,
        })
    }

    vote = () => {
        if (this.state.btnUpSelected || this.state.btnDownSelected) {
            if (this.state.btnUpSelected) {
                this.setState(prevState => {
                    return {
                        positives: prevState.positives + 1 
                    }
                })
            }

            if (this.state.btnDownSelected) {
                this.setState(prevState => {
                    return {
                        negatives: prevState.negatives + 1 
                    }
                })
            }

            this.setState({
                btnUpSelected: false,
                btnDownSelected: false,
                voted: true
            })
        }
    }

    voteAgain = () => {
        this.setState({
            btnUpSelected: false,
            btnDownSelected: false,
            voted: false
        })
    }

    render() {
        let totalVotes = this.state.positives + this.state.negatives;
        let positivePercentage = ((this.state.positives / totalVotes) * 100).toFixed(1);
        let negativePercentage = ((this.state.negatives / totalVotes) * 100).toFixed(1);
        let winnig = this.state.positives > this.state.negatives ? true : false;

        let lastUpdate = new Date(this.state.lastDate);
        let actualDate = new Date();
        let monthsAgo = (actualDate.getFullYear() - lastUpdate.getFullYear()) * 12;
        monthsAgo -= lastUpdate.getMonth();
        monthsAgo += actualDate.getMonth();
        monthsAgo = (monthsAgo <= 0) ? 0 : monthsAgo;
        monthsAgo = (monthsAgo > 1) ? monthsAgo + ' months' : monthsAgo + ' month';

        return (
            <div className="card" style={{ backgroundImage: `url(${this.picture})` }}>
                <div className="card_general">
                    <div className={`card_indicator card_indicator_up ${winnig ? 'd-flex' : 'd-none'}`}>
                        <img className="thumbs-up-img" src="assets/img/thumbs-up.svg" alt="thumbs up" />
                    </div>
                    <div className={`card_indicator card_indicator_down ${winnig ? 'd-none' : 'd-flex'}`}>
                        <img className="thumbs-up-img" src="assets/img/thumbs-down.svg" alt="thumbs down" />
                    </div>
                    <div className="card_info">
                        <div className="card_info_main">
                            <h2 className="card_name">{this.name}</h2>
                            <p className="card_description">{this.description}</p>
                        </div>

                        <div className="card_info_add">
                            <p className={`card_detail ${this.state.voted ? 'd-none' : ""}`}><span className="card_updated">{monthsAgo}</span> ago in <span className="card_category">{this.category}</span></p>
                            <p className={`card_detail ${this.state.voted ? '' : 'd-none'}`}>Thank you for your vote!</p>
                            <div className="card_buttons">
                                <button
                                    className={`icon-button ${this.state.btnUpSelected ? 'button-selected' : ""} ${this.state.voted ? 'd-none' : ""}`}
                                    onClick={this.selectUp}
                                    aria-label="thumbs up"
                                >
                                    <img src="assets/img/thumbs-up.svg" alt="thumbs up" />
                                </button>
                                <button className={`icon-button ${this.state.btnDownSelected ? 'button-selected' : ""} ${this.state.voted ? 'd-none' : ""}`} onClick={this.selectDown} aria-label="thumbs down">
                                    <img src="assets/img/thumbs-down.svg" alt="thumbs down" />
                                </button>
                                <button className={`vote-button ${this.state.voted ? 'd-none' : ""}`} onClick={this.vote}>Vote Now</button>
                                <button className={`vote-button ${this.state.voted ? '' : 'd-none'}`} onClick={this.voteAgain}>Vote Again</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card_ruler">
                    <div className="card_ruler_pos" style={{ width: `${positivePercentage}%` }}>
                        <div className="card_ruler_pos_indicator">
                            <img src="assets/img/thumbs-up.svg" alt="thumbs up" />
                            <span className="pos_percentage">{`${positivePercentage}%`}</span>
                        </div>
                    </div>
                    <div className="card_ruler_neg" style={{ width: `${negativePercentage}%` }}>
                        <div className="card_ruler_neg_indicator">
                            <span className="neg_percentage">{`${negativePercentage}%`}</span>
                            <img src="assets/img/thumbs-down.svg" alt="thumbs down" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}