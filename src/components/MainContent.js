import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Auth from '../Auth';

const auth = new Auth(); 

const mystyle = {
  color: "white",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial"
};

const container ={
  position: "relative"
}

const centeredElement ={
  height: "100px",
  width: "30%",
  position: "absolute",
  left: "50%",
  marginLeft: "-80px",
  top: "35%",
  marginTop: "-50px"
}

const centeredElementOne ={
  height: "100px",
  width: "30%",
  position: "absolute",
  left: "50%",
  marginLeft: "-80px",
  top: "35%",
  marginTop: "170px"
}

const inputControl ={
  width: "100%",
  height: "40px",
  borderRadius: "4px",
  position: "relative",
  backgroundColor: "rgba(255,255,255,0.3)",
  transition: "0.3s all"
} 

const suggestions ={
  border: "1px solid antiquewhite",
  borderTopWidth: "0",
  listStyle: "none",
  marginTop: "0",
  maxHeight: "143px",
  overflowY: "auto",
  paddingLeft: "0",
  width: "101%",
  position: "absolute",
  background:"white",
  lineHeight: "35px"
}

const suggestionactive= {
  backgroundColor:"lightblue",
  color:"black",
  cursor: "pointer",
  fontWeight: "700",
  borderBottom: "1px solid white"
}

const fullWidth = {
  width: "100%",
    marginTop: "5%"
}

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
      filteredData:""
    };
  }

  componentDidMount() {
    fetch("https://reactwebapi.azurewebsites.net/api/v1/book?Page=1&PageCount=10")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.value
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  keywords:Array<any> = [];

 displayUserInformation() {
  const auth = new Auth();
  if (auth.isLoggedIn()) {
    console.log(auth.currentUser());
    return (
      <div>
        <p>
          Welcome, {auth.currentUser().firstName} {auth.currentUser().lastName} from {auth.currentUser().city}, {auth.currentUser().country}
        </p>
      </div>
    );
    
  }
};

 useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fullWidth: {
    width: '100%',
  },
}));


  data = [{
  Name: "ABC",
  Author:"sphere" ,
  AvailableOrRented:"Available"   
},  
{
  Name: "ABCD",
  Author:"spheress" ,
  AvailableOrRented:"Rented"
}]

// Event fired when the input value is changed
onChange=(e) => {
  this.setState({filteredData:""})
  debugger;
  this.keywords=[];
  this.state.items.forEach(element => {
    this.keywords.push(element.Name +' '+ element.Author);
  });

  const suggestions  = this.keywords;
  const userInput = e.currentTarget.value;

  // Filter our suggestions that don't contain the user's input
  const filteredSuggestions = suggestions.filter(
    suggestion =>
      suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
  );

  // Update the user input and filtered suggestions, reset the active
  // suggestion and make sure the suggestions are shown
  this.setState({
    activeSuggestion: 0,
    filteredSuggestions,
    showSuggestions: true,
    userInput: e.currentTarget.value
  });
};

onClick=(e) => {
  
  let searchData = this.state.items;
  let chosenWord;
  if (e.currentTarget.innerText) {
    chosenWord = searchData.find(x => x.Name === e.currentTarget.innerText.substr(0,e.currentTarget.innerText.indexOf(' ')));
  }
 
  // Update the user input and reset the rest of the state
  this.setState({
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: e.currentTarget.innerText,
    filteredData:chosenWord
  });
};

  // Event fired when the user presses a key down
onKeyDown=(e) => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  
 render() {
  //const classes = useStyles();
  
  const {
    onChange,
    onClick,
    onKeyDown,
    state: {
      activeSuggestion,
      filteredSuggestions,
      showSuggestions,
      userInput
    }
  } = this;

  let suggestionsListComponent;
  let detailComponent;

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul style={suggestions}>
          {filteredSuggestions.map((suggestion, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }

            return (
              <li
                style={suggestionactive}
                key={suggestion}
                onClick={onClick}
              >
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className="no-suggestions">
          <em>No suggestions, you're on your own!</em>
        </div>
      );
    }
  }

  if (this.state.filteredData) {
    detailComponent = (
      <div>
            <div>
                <div>
                <label>BOOK NAME : </label>
                <label><span><i><b>{"  "+ this.state.filteredData.Name +"  "}</b></i></span></label>
                {/* <label>{"  "+ this.state.filteredData.Name +"  "}</label> */}
              </div>
              <br></br>
              <div>
                <label>AUTHOR : </label>
                <label><span><i><b>{"  " +this.state.filteredData.Author+ "  "}</b></i></span></label>
                {/* <label>{"  " +this.state.filteredData.Author+ "  "}</label> */}
              </div>
              <br></br>
              <div>
                <label>AVAILABLE / RENTED : </label>
                <label><span><i><b>{"  " +this.state.filteredData.AvailableOrRented+ " "}</b></i></span></label>
                {/* <label>{"  " +this.state.filteredData.AvailableOrRented+ " "}</label> */}
              </div>
           </div>
          
        
      </div>
    );
  } 
  
    // }

    return (
      
      <main style={fullWidth}>
        <div className={"toolbar"} />
        <div className={"title"}>
        <h2 className="center">
            Welcome, {auth.currentUser().firstName} {auth.currentUser().lastName} from {auth.currentUser().city}, {auth.currentUser().country}
          </h2> 
        </div>
        <div style={container, centeredElement}>
          <input
            type="text"
            placeholder="Search Books"
            style={inputControl}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={this.state.userInput}
          />
          {suggestionsListComponent}
        </div>
        
        <div style={container, centeredElementOne}>
         
          {detailComponent}
        </div>
        
       
      </main>
    );
  
}

}

export default MainContent;
