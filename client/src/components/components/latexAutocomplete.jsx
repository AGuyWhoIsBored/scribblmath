import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';
 
//Current list of Latex Commands (https://www.ntg.nl/doc/biemesderfer/ltxcrib.pdf)
var registeredLatexCommands = [
  //first page of pdf (filtered)
  '\\#', '\\$', '\\%', '\\&', '\\*', '\\,', '\\.', '\\/', '\\:', '\\;', '\\@', '\\[', 
  '\\]', '\\^', '\\_', '\\{', '\\|', '\\}', '\\~', "\\a’", "\\a‘", '\\a=', '\\aa', '\\acute', 
  '\\ae', '\\AE', '\\aleph', '\\alpha', '\\amalg', '\\angle', '\\approx', '\\arccos', '\\arcsin', 
  //second page of pdf (filtered)  
  '\\arctan', '\\arg', '\\ast', '\\asymp', '\\b', '\\backlash', '\\bar',
  //third page of pdf (filtered)
  '\\beta', '\\bf', '\\bigcap', '\\bigcirc', '\\bigcup', '\\bigodot', '\\bigoplus', '\\bigotimes', 
  '\\bigtriangledown', '\\bigtriangleup', '\\bigsqcup', '\\biguplus', '\\bigvee', '\\bigwedge', '\\bmod',
  '\\bot', '\\bowtie', '\\Box', '\\breve', '\\bullet', '\\c', '\\cal', '\\cap', '\\cdot', '\\cdots', 
  '\\check', '\\chi', '\\circ', '\\clubsuit', '\\cong', '\\coprod',
  //fourth page of pdf (filtered)  
  '\\copyright', '\\cos', '\\cosh', '\\cot', '\\coth', '\\csc', '\\cup', '\\d', '\\dag', '\\dagger',
  '\\dashv', '\\ddag', '\\ddagger', '\\ddot','\\ddots', '\\deg','\\delta', '\\det', '\\diamond', 
  '\\Diamond', '\\diamondsuit', '\\dim', '\\displaystyle', '\\div', '\\dot', '\\doteq', '\\downarrow', 
  '\\Downarrow', '\\ell', '\\em', '\\emptyset', '\\epsilon', '\\equiv', '\\eta', '\\exists', '\\exp',
  '\\fbox{text}', '\\flat',
  //fifth page of pdf (filtered)
  '\\forall', '\\frac{numerator}{denominator}', '\\frown', '\\gamma', '\\Gamma', '\\gcd', '\\ge', 
  '\\geq', '\\gets', '\\gg', '\\grave', '\\H', '\\hat', '\\hbar', '\\heartsuit', '\\hom', '\\hookleftarrow',
  '\\hookrightarrow', '\\huge', '\\Huge', '\\i', '\\iff', '\\Im', '\\imath', '\\in',
  '\\inf', '\\infty', '\\int', '\\iota', '\\it',
  //sixth page of pdf (filtered)
  '\\j', '\\jmath', '\\Join', '\\kappa', '\\ker', '\\l', '\\L', '\\lambda', '\\Lambda', '\\land',
  '\\langle', '\\large', '\\Large', '\\LARGE', '\\LaTeX', '\\lbrace', '\\lbrack', '\\lceil', '\\ldots',
  '\\le', '\\leadsto', '\\leftarrow', '\\Leftarrow', '\\leftharpoondown', '\\leftharpoonup', '\\leftrightarrow', 
  '\\Leftrightarrow', '\\leq', '\\lfloor', '\\lg', '\\lhd', '\\lim', '\\liminf', '\\limsup', '\\ll', '\\ln', 
  '\\lnot', '\\log', '\\longleftarrow', '\\Longleftarrow', '\\longleftrightarrow', '\\Longleftrightarrow', 
  '\\longmapsto', '\\longrightarrow', '\\Longrightarrow', '\\lor', '\\lq', 
  //seventh page of pdf (filtered)
  '\\mapsto', '\\max', '\\mbox{text}', '\\mho', '\\mid', '\\min', '\\mit', '\\models', '\\mp', 
  '\\mu', '\\nabla', '\\natural', '\\new', '\\nearrow', '\\neg', '\\neq', '\\ni', '\\not',
  '\\notin', '\\nu', '\\nwarrow', '\\o', '\\O',
  //eighth page of pdf (filtered)
  '\\odot', '\\oe', '\\OE', '\\oint', '\\omega', '\\Omega', '\\ominus',
  '\\oplus', '\\oslash', '\\otimes', '\\overbrace{text}', '\\overline{text}', '\\owns',
  '\\P', '\\parallel', '\\partial', '\\perp', '\\phi', '\\pi', '\\PI', '\\pm', '\\pmod{modulus}', 
  '\\pounds', '\\Pr', '\\prec', '\\preceq', '\\prime', '\\prod', '\\propto', '\\psi', '\\Psi', 
  //ninth page of pdf (filtered)
  '\\rangle', '\\rbrace', '\\rbrack', '\\rceil', '\\Re', '\\rfloor', '\\rhd', '\\rho', '\\rightarrow',
  '\\Rightarrow', '\\rightharpoondown', '\\rightharpoonup', '\\rightleftharpoons', '\\rm', '\\rq', 
  '\\S', '\\sc', '\\searrow', '\\sec', '\\setminus', '\\sf', '\\sharp', '\\sigma', '\\Sigma', 
  '\\sim', '\\simeq', '\\sin', '\\sinh',
  //tenth page of pdf (filtered)
  '\\small', '\\smallint', '\\smile', '\\spadesuit', '\\sqcap', 'sqcup', '\\sqrt[#]{arg}', '\\sqsubset', 
  '\\sqsubseteq', '\\sqsupset', '\\sqsupseteq', '\\ss', '\\star', '\\subset', '\\subseteq', '\\succ', '\\succeq',
  '\\sum', '\\sup', '\\supset', '\\supseteq', '\\surd', '\\swarrow', '\\symbol{cc}', 
  '\\t', '\\tan', '\\tanh', '\\tau', '\\TeX', '\\theta', '\\Theta', '\\tilde', '\\times', '\\tiny', '\\to',
  //eleventh page of pdf (filtered)
  '\\top', '\\triangle', '\\trianglefeft', '\\triangleright', '\\u', '\\unboldmath', '\\underbrace{text}',
  '\\underline{text}', '\\unlhd', '\\unrhd', '\\uparrrow', '\\Uparrow', '\\updownarrow', '\\Updownarrow', '\\uplus', 
  '\\upsilon', '\\Upsilon', '\\v', '\\varepsilon', '\\varphi', '\\varpi', '\\varrho', '\\varsigma', '\\vartheta', 
  '\\vdash', '\\vdots','\\vec', '\\vee', '\\vert', '\\Vert', '\\wedge', '\\widehat{arg}', '\\widetilde{arg}', '\\wp', 
  '\\wr', '\\xi', '\\Xi', '\\zeta'
];
 
export default class Autocomplete extends Component {
  /*Required Props*/
  static propTypes = {
    wrapper: PropTypes.instanceOf(string).isRequired
  };

  /*Initial State*/
  state = {
      wrapperPresent: '',
      charStart: 0,
      activeOption: -1,
      charCount: 0, 
      filteredOptions: [],
      showOptions: false,
      autocompleteStatus: false,
      prevInput: '', 
      userInput: '',
  };
 
  /*When content in input box changes */
  onChange = (e) => {
    
    const { charStart, prevInput, wrapperPresent, charCount} = this.state;
    const { wrapper } = this.props;

    console.log("Our wrapper: " + wrapper);

    //reset state to default when user clears input box
    if (e.currentTarget.value === '')
    {
      this.setState({
        wrapperPresent: '',
        charStart: 0,
        charCount: 0, 
        activeOption: -1,
        filteredOptions: [],
        showOptions: false,
        autocompleteStatus: false,
        prevInput: '', 
        userInput: '',
      })
      return;
    }
 
    //Assign the current string in our input box to currentVal
    var currentVal = e.currentTarget.value;
    var userInputTemp;
    var latestKeyCharIndex;
    var wrapperCount;
    var i, j;

    //Find the position of the latest ' ' or wrapper ('$')
    for (i = currentVal.length - 1; i >= 0; i--)
    {
      if (currentVal[i] === ' ' || currentVal[i] === wrapper)
      {
        latestKeyCharIndex = i + 1;
        break;
      }
    }

    //Case where char(s) are inserted or deleted in the middle or start of our input string
    if (latestKeyCharIndex !== prevInput.length)
    {
      console.log("xxxx")
      //Count number of wrappers in currentVal
      wrapperCount = 0;
      for (j = 0; j < currentVal.length; j++)
      {
        if (currentVal[j] === wrapper)
          wrapperCount++;
      }

      //If ' ' or wrapper ('$') is found inside input string
      if (latestKeyCharIndex)  
      {
        console.log("' ' or " + wrapper + " have been deleted")
        
        this.setState({
          charStart: latestKeyCharIndex,
          prevInput: currentVal.substring(0, latestKeyCharIndex)
        })

        //if wrapperCount after deletion is odd, activate wrapper state and display autocomplete options
        if(wrapperCount % 2) {
          //Refilter potential autocomplete options
          userInputTemp = currentVal.substring(latestKeyCharIndex);
          const filteredOptions = registeredLatexCommands.filter(
            (optionName) =>
                optionName.toLowerCase().indexOf(userInputTemp.toLowerCase()) > -1
          );
        
          this.setState({
            filteredOptions,
            showOptions: true,
            wrapperPresent: wrapper,
          });
        }
        //if wrapperCount after deletion is even, deactivate wrapper state
        else {
          this.setState({
            wrapperPresent: '',
            showOptions: false  
          })
        }
      }
    }
 
    //Case where left wrapper ('$') is present and a single char is inserted
    else if (wrapperPresent === wrapper)
    {
      console.log("char added with wrapper ('" + wrapper + "') presence");
      
      userInputTemp = currentVal.substring(charStart); 
 
      //Deals with cases when ' ' character appears
      if (userInputTemp.indexOf(' ') === userInputTemp.length - 1 || userInputTemp.indexOf(' ', e.currentTarget.value.length-1) === userInputTemp.length - 1)
      {
        //store content to prevInput
        this.setState({prevInput: prevInput + userInputTemp});
    
        //set new starting character to the position after the space (aka empty string)
        this.setState({charStart: charStart + userInputTemp.length});
      }
 
      //Deals with closing wrapper ('$')
      if (userInputTemp.indexOf(wrapper) === userInputTemp.length - 1 && charCount <= currentVal.length) {
        this.setState({
          prevInput: prevInput + userInputTemp,
          charStart: charStart + userInputTemp.length,
          wrapperPresent: '' })
        console.log("Closing wrapper ('" + wrapper + "')")
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
 
    //Case where wrapper ('$') is not present and a single char is introduced
    else {
      console.log("char added without wrapper ('" + wrapper + "') presence");
 
      //Deals with ' '
      if (currentVal.indexOf(' ') === currentVal.length-1 || currentVal.indexOf(' ', currentVal.length - 1 ) === currentVal.length-1) {
        this.setState({
          prevInput: prevInput + currentVal.substring(charStart),
          charStart: charStart + currentVal.substring(charStart).length,
        })
      }

      //Deals with opening wrapper ('$')
      if (currentVal.indexOf(wrapper) === currentVal.length-1 || currentVal.indexOf(wrapper, currentVal.length - 1 ) === currentVal.length-1) {
        this.setState({
          wrapperPresent: wrapper,
          prevInput: prevInput + currentVal.substring(charStart),
          charStart: charStart + currentVal.substring(charStart).length,
        })
      }

      this.setState({
        showOptions: false,
      })
    }
 
    this.setState({
      activeOption: -1,
      charCount: currentVal.length,
      autocompleteStatus: false,
      userInput: currentVal
    });
  };
  
  onClick = (e) => {
    const { prevInput } = this.state;
    this.setState({
      activeOption: -1,
      filteredOptions: [],
      showOptions: false,
      userInput: prevInput + e.currentTarget.innerText
    });
  };
 
  onKeyDown = (e) => {
    const { activeOption, filteredOptions, prevInput, autocompleteStatus } = this.state;
 
    //enter key
    if (e.keyCode === 13) {
      console.log("THIS RAN FIRST")
      if (document.querySelector('ul.options') && activeOption !== -1){        
        this.setState({
          activeOption: -1,
          showOptions: false,
          userInput: prevInput + filteredOptions[activeOption],
          autocompleteStatus: true
        });
      }
      if (autocompleteStatus)
      {
        console.log("GOOD");
        this.setState({autocompleteStatus: false})
      }
    }
    //up arrow key
    else if (e.keyCode === 38) {
      if (activeOption === -1) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
      if (activeOption - 1 === -1)
        this.setState({showOptions: false})
    } 
    //down arrow key
    else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        console.log(activeOption);
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
    //left arrow key
    else if (e.keyCode === 37) {
      this.setState({
        showOptions: false,
        activeOption: -1
      })
    }
    //right arrow key
    else if (e.keyCode === 39) { 
      this.setState({
        showOptions: false,
        activeOption: -1
      })
    }
  };
 
  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { activeOption, filteredOptions, showOptions, userInput, autocompleteStatus }
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
        {
          autocompleteStatus ? <div id = "Autocomplete-active"></div>:<React.Fragment></React.Fragment>
        }
        <input className="inputMessage" placeholder="Type here..." onChange={onChange} onKeyDown={onKeyDown} value={userInput} / > 
        {optionList}
      </React.Fragment>
    );
  }
}
