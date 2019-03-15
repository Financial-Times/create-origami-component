import React from "react";

class URLInput extends React.Component {
  render() {
    return <label className="o-forms o-forms--text-input">
      <span className="o-forms__label">{this.props.name}</span>
      <input type={this.props.inputType}
        name={this.props.name}
        onChange={this.props.handleChange}
        required={this.props.required}
        defaultValue={this.props.state[this.props.name]}
        value={this.props.state.value}
      />
    </label>
  }
}

export default URLInput;