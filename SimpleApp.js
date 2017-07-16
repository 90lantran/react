const CardList = (props) => {
	return(
  <div>
  	{props.cards.map(card => <Card {...card}/>)}
  </div>
  );
};

class Form extends React.Component {
	state = { userName: ''}
	handleSubmit = (event) => {
  	event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`).then(resp => {this.props.onSubmit(resp.data)});
  
  };
	render(){
  	return (
    	<form onSubmit={this.handleSubmit}>
        <input type="text" 
              value={this.state.userName}
              onChange={(event) => this.setState({ userName : event.target.value})}
              placeholder="Github username" required
        />
        <button type="submit"> Add </button>
      </form>
    )
  }
}

class App extends React.Component {
	state = {
   cards: [
	
  {avatar_url: "https://avatars5.githubusercontent.com/u/2984245?v=4",
  name: "Alan Tran",
  company: "RU"},
  {avatar_url: "https://avatars7.githubusercontent.com/u/10619807?v=4",
  name:"Duke Tran",
  company: "UoT"},
]

  };
  
  addNewCards = (cardInfo) => {
   		this.setState(prevState => ({cards :prevState.cards.concat(cardInfo)}));
  };

	render(){
  	return(
    	<div>
        <Form onSubmit={this.addNewCards}/>
        <CardList cards={this.state.cards}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);