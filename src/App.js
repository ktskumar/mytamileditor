import Plain from 'slate-plain-serializer';
import { Editor } from 'slate-react'

import React from 'react';

import logo from './logo.svg';
import './App.css';
require('es6-promise').polyfill();
require('isomorphic-fetch');

const initialValue = Plain.deserialize(
  'This is editable plain text, just like a <textarea>!'
)


class App extends React.Component {

  state = {
    value: initialValue,
    word:''
  }

  constructor(props){
    super(props);
    

  }

  onChange = ({ value }) => {
    this.setState({ value });

    
  }


  onKeyDown = (event, editor, next) => {

    if(event.key != " "){
      this.setState({
        word:this.state.word +event.key
      });
      
    }

    
    fetch('https://www.google.com/inputtools/request?text='+event.key+'&ime=transliteration_en_ta&num=5&cp=0&cs=0&ie=utf-8')
	.then(function(response) {
		if (response.status >= 400) {
			throw new Error("Bad response from server");
		}
		return response.json();
	})
	.then(function(stories) {
		console.log(stories);
  });
  
    // Return with no changes if the keypress is not '&'
    if (event.key !== ' ') return next()

    // Prevent the ampersand character from being inserted.
    event.preventDefault()

    // Change the value by inserting 'and' at the cursor's position.
    editor.insertText(' space ')


  }

  

  render(){
    
  return (
    <div className="App">
      <Editor
        placeholder="Enter some plain text..."
        
        value={this.state.value}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
      />
    </div>
  );
  }
}

export default App;
