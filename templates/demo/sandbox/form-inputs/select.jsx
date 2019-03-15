import React from "react";

class SelectInput extends React.Component {
  render() {
    return <>
      <label className="o-forms o-forms--select">
        <span className="o-forms__label">{this.props.name}</span>
        {this.props.required ? <span className="o-forms__prompt">required</span> : ''}
        <select
          name={this.props.name}
          onChange={this.props.handleChange}
          required={this.props.required}
          defaultValue={this.props.state[this.props.name]}
          value={this.props.state.value}
        >
          {this.props.options.map(opt => {
            if (!opt.brands || opt.brands && opt.brands.find(brand => brand === this.props.brand)) {
              return <option key={opt.name} value={opt.name}>{opt.name}</option>
            }
          })}
        </select>
      </label>
    </>
  }
}

export default SelectInput;