import React, { Component } from 'react';
 
//Current list of Latex Commands
var registeredLatexCommands = [
  "Dog",
  "Cat",
  "Woof",
  "Go",
  "Papaya",
  "Meow",
  "Persimmon",
  "PawPaw",
  "Prickly",
  "Peach",
  "Pomegranate",
  "Pineapple"
];
 
export default class Autocomplete extends Component {
  /*Initial State*/
  state = {
      wrapperPresent: '',
      charStart: 0,
      charCount: 0,
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      prevInput: '', 
      userInput: ''
  };
 
  /*When content in input box changes */
  onChange = (e) => {
    
    const { charStart, charCount, lastChar, prevInput, wrapperPresent} = this.state;
 
    //reset state to default when user clears input box
    if (e.currentTarget.value === '')
    {
      this.setState({
        wrapperPresent: '',
        charStart: 0,
        charCount: 0,
        lastChar: '',
        activeOption: 0,
        filteredOptions: [],
        showOptions: false,
        prevInput: '', 
        userInput: ''
      })
      return;
    }
 
    //Assign the current string in our input box to currentVal
    var currentVal  = e.currentTarget.value;
    
    //Case where user inputs backspace
    if (charCount > currentVal.length)
    {
      //Count number of wrappers in currentVal
      var wrapperCount = 0;
      for (var i = 0; i < currentVal.length; i++)
      {
        if (currentVal[i] === '$')
          wrapperCount++;
      }
 
      //If currentVal contains an even number of wrappers ('$') and the deleted char was not a wrapper ('$') proceed w/o changes
      if (wrapperCount % 2 || lastChar === '$') 
      {
        var latestKeyCharIndex;
        //case for when the deleted char is ' ' or '$'
        if (lastChar === ' ' || lastChar === '$')  {
          console.log("' ' or '$' have been deleted")
          
          /*Testing
          console.log ("CharStart: " + charStart)
          */
          for (i = currentVal.length - 1; i >= 0; i--)
          {
            if (currentVal[i] === ' ' || currentVal[i] === '$')
            {
              latestKeyCharIndex = i + 1;
              break;
            }
          }
 
          /*Testing
          console.log(latestKeyCharIndex)
          console.log(currentVal.substring(0, latestKeyCharIndex))
          */
          this.setState({
            charStart: latestKeyCharIndex,
            prevInput: currentVal.substring(0, latestKeyCharIndex)
          })
 
          //if wrapperCount after deletion is odd, activate wrapper state and if odd, deactivate wrapper state
          if (lastChar === '$') {
            wrapperCount % 2 ? this.setState({wrapperPresent: '$'}) :
                               this.setState({wrapperPresent: ''})
          } 
        }
      }
    }
 
    //Case where left '$' wrapper is present
    else if (wrapperPresent === '$')
    {
      console.log("char added with '$' presence");
      
      var userInputTemp = currentVal.substring(charStart); 
 
      /*Testing
      console.log ("CharStart: " + charStart)
      console.log("Current Input Segment: " + userInputTemp);*/
 
 
      //Deals with cases when ' ' character appears
      if (userInputTemp.indexOf(' ') === userInputTemp.length - 1 || userInputTemp.indexOf(' ', e.currentTarget.value.length-1) === userInputTemp.length - 1){
 
        //store content to prevInput
        this.setState({prevInput: prevInput + userInputTemp});
    
        //set new starting character to the position after the space (aka empty string)
        this.setState({charStart: charStart + userInputTemp.length});
 
        //removes all options when the first character typed is a space
        if (userInputTemp === '')
          userInputTemp = ' ';
      }
 
      //Deals with closing wrapper ('$')
      if (userInputTemp.indexOf('$') === userInputTemp.length - 1) {
        this.setState({
          prevInput: prevInput + userInputTemp,
          charStart: charStart + userInputTemp.length,
          wrapperPresent: '' })
        console.log("Closing '$'")
      }
 
      //Filters potential autocomplete options
      const filteredOptions = registeredLatexCommands.filter(
          (optionName) =>
              optionName.toLowerCase().indexOf(userInputTemp.toLowerCase()) > -1
      );
      
      
      this.setState({
          filteredOptions,
          showOptions: true
      });
    }
 
    //Case where wrapper ('$') is not present or is introduced
    else {
      this.setState({
        showOptions: false,
      })
      console.log("char added with '$' presence");
 
      //Deals with opening wrapper ('$')
      if (currentVal.indexOf('$') === currentVal.length-1 || currentVal.indexOf('$', currentVal.length - 1 ) === currentVal.length-1) {
        console.log(currentVal)
        this.setState({
          wrapperPresent: '$',
          prevInput: prevInput + currentVal.substring(charStart),
          charStart: charStart + currentVal.substring(charStart).length,
        })
        /*Testing
        console.log(prevInput)
        console.log(charStart)*/
      }
    }
 
    this.setState({
      charCount: currentVal.length,
      lastChar: currentVal.charAt(currentVal.length - 1),
      activeOption: 0,
      userInput: currentVal
    });
  };
  
  onClick = (e) => {
    const { prevInput } = this.state;
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: prevInput + e.currentTarget.innerText
    });
  };
 
  onKeyDown = (e) => {
    const { activeOption, filteredOptions, prevInput } = this.state;
 
    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: prevInput + filteredOptions[activeOption] 
      });
    } 
    else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } 
    else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        console.log(activeOption);
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };
 
  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { activeOption, filteredOptions, showOptions, userInput }
    } = this;
    let optionList;
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = 'option-active';
              }
              return (
                <li className={className} key={optionName} onClick={onClick}>
                  {optionName}
                </li>
              );
            })}
          </ul>
        );
      } 
    }
    
    return (
      <React.Fragment>
        <input className="inputMessage" placeholder="Type here..." onChange={onChange} onKeyDown={onKeyDown} value={userInput} / > 
        {optionList}
      </React.Fragment>
    );
  }
}
