import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const Card = (props) => {
  return (
    <div style={{ margin: '1em' }}>
      <img width="75" src={props.avatar_url} />
      <div style={{ display: 'inline-block', marginLeft: 10 }}>
        <div style={{ fontSize: '1.25em', fontWeight: 'bold' }}>{props.name}</div>
        <div>Company: {props.company}</div>
        <div>Email: {props.email}</div>
        <div>Bio: {props.bio}</div>
        <div>Blog: <a href={props.blog} target="_blank">Link to Blog</a></div>
        <div>Profile: <a href={props.html_url} target="_blank">GitHub Profile</a></div>
      </div>
    </div>
  );
};

const CardList = (props) => {
  
  return (
    <div>
      {props.cards.map(card => <Card {...card} />)}
    </div>
  );
};

class Form extends Component {
  state = { userName: '' }
  handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    .then(resp =>{
      this.props.onSubmit(resp.data);
      this.setState({ userName: ''});
    })
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.userName}
          onChange={(event)=> this.setState({userName: event.target.value})}
        placeholder="Github Name" required />
        <button type="submit">Add Card</button>
      </form>
    )
  }
}

class App extends Component {
  state = {
    cards: []
  };
  addNewCard = (cardInfo) =>{
    this.setState(prevState =>({
      cards: prevState.cards.concat(cardInfo)
    }));
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.addNewCard} />
        <CardList cards={this.state.cards} />
      </div>
    );
  }

}

export default App;
