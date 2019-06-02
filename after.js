
import React, { useState, useRef, useEffect } from 'react';
import { InputRange } from 'mdbreact';
import classNames from 'classnames';

let oneStep = '';

const IWInputRange= (InputRange) => (props) => {

  const inputRange = useRef(null);
	
  const newProps = Object.assign({}, props , {
    rangeChange: InputRange.prototype.rangeChange,
    rangeFocus: InputRange.prototype.rangeFocus,
  });
  
  const { className, min, max, inputValue  } = props;
  
  const [ value, setValue ] = useState(0);
  const [ leftPosition , setLeftPosition] = useState(0);
  const [ thumbActive , setThumbActive] = useState(false);
  const [ thumbHeight , setThumbHeight] = useState(0);
  const [ thumbWidth , setThumbWidth] = useState(0);
  const [ thumbTop , setThumbTop] = useState('0px');
  const [ thumbMarginLeft , setThumbMarginLeft] = useState('0px');

  useLayoutEffect( () => {
    setValue(props.inputValue)
    let inputWidth = inputRange.offsetWidth;
    oneStep = inputWidth / ( props.max - props.min );
    setLeftPosition(oneStep * props.value - oneStep * props.min);
  }, []);
  useLayoutEffect( () => setValue(props.inputValue), [props.inputValue]);

  const rangeMouseLeave= () =>{
    let input = inputRange;
    input.blur();
    setThumbActive(false);
    setThumbHeight(0);
    setThumbWidth(0);
    setThumbTop('10px');
    setThumbMarginLeft('-6px');
  }

  const inputClass = classNames(className);
    
  return (
    <div className="range-field">
      <input
        className={inputClass}
        min={min}
        max={max}
        value={value}
        ref={inputRange}
        type="range"
        onChange={newProps.rangeChange}
        onFocus={newProps.rangeFocus}
        onMouseLeave={rangeMouseLeave}
      />
    </div>
  );
};

export default IWInputRange(InputRange);