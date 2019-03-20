import React from "react";

class TextAreaInput extends React.Component {
  render() {
    const name = this.props.name;

    return <label className="o-forms o-forms--text-area">
      <span className="o-forms__label">{name.label}</span>
      <textarea
        name={name.original}
        onChange={this.props.handleChange}
        required={this.props.required}
        defaultValue={this.props.state[name.original]}
        value={this.props.state.value}
      />
    </label>
  }
}

export default TextAreaInput;