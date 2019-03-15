import React from "react";
import ReactDOM from "react-dom";
import FormInputs from './form-inputs/form-inputs.js';
import { renderToStaticMarkup } from "react-dom/server";
import './main.scss';

//TODO: move into own file
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
      <div ref={this.shadowRef}></div>
    </div>
  }
}

class DemoSandbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    Object.assign(this.state, props.config.demo.data, { sidebarVisible: false })
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name || target.id;
    this.setState({ [name]: value });
  }

  toggleSidebar = () => {
    let toggle = this.state.sidebarVisible ? false : true;
    this.setState({ sidebarVisible: toggle })
  }

  toggleHTML = (element) => {
    //TODO: swap demo-area content for component HTML
    console.log(renderToStaticMarkup(element));
  }

  DemoArea(props) {
    return <div className="demo-area">
      {props.children}
    </div>
  }

  render() {
    const demo = this.props.config.demo.data;
    const variant = this.props.config.shared.variants.find(variant => variant.type === demo.type);

    const component = <this.props.component state={this.state} demo={demo} />

    return <>
      <Sidebar state={this.state} data={variant} handleChange={this.handleChange}></Sidebar>
      <this.DemoArea>
        <button className="o-buttons o-buttons--mono" onClick={this.toggleSidebar}>Customise this demo</button>
        <button className="o-buttons o-buttons--mono" onClick={() => this.toggleHTML(component)}>HTML</button>
        {component}
      </this.DemoArea>
    </>
  }
}

export default DemoSandbox;
