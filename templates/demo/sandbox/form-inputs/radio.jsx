import React from "react";

class RadioInput extends React.Component {
  render() {
    return <fieldset className="o-forms o-forms--radio--round o-forms--inline-children">
      <legend>
        <span className="o-forms__label">{this.props.name}</span>
      </legend>
      {this.props.options.map(opt => {
        return <label key={opt.name}>
          <input type="radio"
            name={this.props.name}
            onChange={this.props.handleChange}
            required={this.props.required}
            defaultChecked={this.props.state[this.props.name] === opt.name}
            value={opt.name}
          />
          <span>{opt.name}</span>
        </label>
      })}
    </fieldset>
  }
}

export default RadioInput;