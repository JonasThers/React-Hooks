import React from 'react';
import { InputRange } from 'mdbreact';
import classNames from 'classnames';

let oneStep = '';

class IWInputRange extends InputRange {
  componentDidMount() {
    this.setState({ value: this.props.inputValue });
    let input = this.inputRange;
    let inputWidth = input.offsetWidth;
    oneStep = inputWidth / (this.props.max - this.props.min);
    this.setState({
      leftPosition: oneStep * this.props.value - oneStep * this.props.min,
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.inputValue && nextProps.inputValue !== this.state.value) {
      this.setState({value: nextProps.inputValue});
    }
  }

  rangeMouseLeave() {
    let input = this.inputRange;
    input.blur();
    this.setState({
      thumbActive: false,
      thumbHeight: 0,
      thumbWidth: 0,
      thumbTop: '10px',
      thumbMarginLeft: '-6px',
    });
  }

  render() {
    const { className, min, max } = this.props;

    const inputClass = classNames(className);

    return (
      <div className="range-field">
        <input
          className={inputClass}
          min={min}
          max={max}
          value={this.state.value}
          ref={c => (this.inputRange = c)}
          type="range"
          onChange={this.rangeChange}
          onFocus={this.rangeFocus}
          onMouseLeave={this.rangeMouseLeave}
        />
      </div>
    );
  }
}

export default IWInputRange;
