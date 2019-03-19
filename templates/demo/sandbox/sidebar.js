import React from "react";
import ReactDOM from "react-dom";
import FormInputs from './form-inputs/form-inputs.js';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.shadowRef = React.createRef();
  }

  componentDidMount() {
    this.shadowRoot = this.shadowRef.current.attachShadow({ mode: 'open' });
    ReactDOM.render(<FormInputs {...this.props} />, this.shadowRoot);
  }

  render() {
    return <div className={`sidebar${this.props.state.sidebarVisible ? ' sidebar--open' : ''}`} state={this.state}>
      <link rel="stylesheet" href="https://www.ft.com/__origami/service/build/v2/bundles/css?modules=o-fonts@^3.3.0&brand=internal" />
      <div ref={this.shadowRef} />
    </div>
  }
}

export default Sidebar;