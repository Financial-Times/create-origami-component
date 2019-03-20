import React from "react";

class CheckboxInput extends React.Component {
  render() {
    const name = this.props.name;

    return <fieldset className="o-forms o-forms--checkbox">
      <legend>
        <span className="o-forms__label">{name.label}</span>
      </legend>
      {this.props.options.map(opt => {
        if (!opt.brands || opt.brands && opt.brands.find(brand => brand === this.props.brand)) {
          return <label key={opt.name}>
              <input type="checkbox"
                name={name.original}
                onChange={this.props.handleChange}
                required={this.props.required}
              />
              <span>{opt.name}</span>
            </label>
          }
      })}
    </fieldset>
  }
}

export default CheckboxInput;