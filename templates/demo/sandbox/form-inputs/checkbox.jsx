import React from "react";

class CheckboxInput extends React.Component {
  render() {
    return <fieldset className="o-forms o-forms--checkbox">
      <legend>
        <span className="o-forms__label">{this.props.name}</span>
      </legend>
      {this.props.options.map(opt => {
        return <label  key={opt}>
          <input type="checkbox"
            name={this.props.name}
            onChange={this.props.handleChange}
            required={this.props.required}
          />
          <span>{opt}</span>
        </label>
      })}
    </fieldset>
  }
}

export default CheckboxInput;