import React from "react";

class TextInput extends React.Component {
  render() {
    const name = this.props.name;

    return <label className="o-forms o-forms--text-input">
      <span className="o-forms__label">{name.label}</span>
      <input type={this.props.inputType}
        name={name.original}
        onChange={this.props.handleChange}
        required={this.props.required}
        defaultValue={this.props.state[name.original]}
        value={this.props.state.value}
      />
    </label>
  }
}

export default TextInput;