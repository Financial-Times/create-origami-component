import React from "react";

class TextAreaInput extends React.Component {
  render() {
    return <label className="o-forms o-forms--text-area">
      <span className="o-forms__label">{this.props.name}</span>
      <textarea
        name={this.props.name}
        onChange={this.props.handleChange}
        required={this.props.required}
        defaultValue={this.props.state[this.props.name]}
        value={this.props.state.value}
      />
    </label>
  }
}

export default TextAreaInput;