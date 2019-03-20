import React from "react";

class RadioInput extends React.Component {
  render() {
    const name = this.props.name;

    return <fieldset className="o-forms o-forms--radio--round o-forms--inline-children">
      <legend>
        <span className="o-forms__label">{name.label}</span>
      </legend>
      {this.props.options.map(opt => {
        if (!opt.brands || opt.brands && opt.brands.find(brand => brand === this.props.brand)) {
          return <label key={opt.name}>
            <input type="radio"
              name={name.original}
              onChange={this.props.handleChange}
              required={this.props.required}
              defaultChecked={this.props.state[name.original] === opt.name}
              value={opt.name}
            />
            <span>{opt.name}</span>
          </label>
        }
      })}
    </fieldset>
  }
}

export default RadioInput;