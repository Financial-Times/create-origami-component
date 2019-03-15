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
    config.handleChange = this.handleChange;
    config.state = this.state;
    config.brand = this.props.brand;

    if (inputType === 'select') {
      return <SelectInput key={config.name} {...config}/>
    }

    if (inputType === 'checkbox') {
      return <CheckboxInput key={config.name} {...config}/>
    }

    if (inputType === 'radio') {
      return <RadioInput key={config.name} {...config}/>
    }

    if (inputType === 'text') {
      return <TextInput key={config.name} {...config}/>
    }

    if (inputType === 'textarea') {
      return <TextAreaInput key={config.name} {...config}/>
    }

    if (inputType === 'url') {
      return <URLInput key={config.name} {...config}/>
    }
  }

  render () {
    return <>
      <link rel="stylesheet" href="https://www.ft.com/__origami/service/build/v2/bundles/css?modules=o-forms@styles&brand=internal" />
      {
        Object.entries(this.props.data.config).map(([type, config]) => this.buildInputType(config))
        // TODO: handle error
      }
    </>
  }

}

export default FormInputs;