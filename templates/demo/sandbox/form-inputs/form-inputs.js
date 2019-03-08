import React from 'react';
import SelectInput from './select';
import CheckboxInput from './checkbox';
import RadioInput from './radio';
import TextInput from './text';
import TextAreaInput from './textarea';
import URLInput from './url';

class FormInputs extends React.Component {
  constructor (props) {
    super(props);
    this.state = props.state;
    this.handleChange = props.handleChange;
  }

  buildInputType (config) {
    const inputType = config.inputType

    if (inputType === 'select') {
      return <SelectInput
        name={config.name}
        key={config.name}
        required={config.required}
        options={config.options}
        handleChange={this.handleChange}
        state={this.state}
      />
    }

    if (inputType === 'checkbox') {
      return <CheckboxInput
        name={config.name}
        key={config.name}
        required={config.required}
        options={config.options}
        handleChange={this.handleChange}
        state={this.state}
      />
    }

    if (inputType === 'radio') {
      return <RadioInput
        name={config.name}
        key={config.name}
        required={config.required}
        options={config.options}
        handleChange={this.handleChange}
        state={this.state}
      />
    }

    if (inputType === 'text') {
      return <TextInput
        name={config.name}
        key={config.name}
        required={config.required}
        options={config.options}
        handleChange={this.handleChange}
        state={this.state}
      />
    }

    if (inputType === 'textarea') {
      return <TextAreaInput
        name={config.name}
        key={config.name}
        required={config.required}
        options={config.options}
        handleChange={this.handleChange}
        state={this.state}
      />
    }

    if (inputType === 'url') {
      return <URLInput
        name={config.name}
        key={config.name}
        required={config.required}
        options={config.options}
        handleChange={this.handleChange}
        state={this.state}
      />
    }
  }

  render () {
    return Object.entries(this.props.data.config).map(([type, config]) => {
      return this.buildInputType(config);

      // return some error message?
    });
  }

}

export default FormInputs;