import React from "react";
import FormInputs from './form-inputs/form-inputs.js';
import { renderToStaticMarkup } from "react-dom/server";

class DemoSandbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    Object.assign(this.state, props.demo, { sidebarVisible: false })
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name || target.id;
    this.setState({ [name]: value });
  }

  Sidebar(props) {
    return <div className={`sidebar ${props.state.sidebarVisible ? 'sidebar--open' : ''}`}>
      {props.children}
    </div>
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
    const demo = this.props.demo;
    const variant = this.props.variants.find(variant => variant.type === demo.type);
    const component = <this.props.component state={this.state} demo={demo} />
    return <>
      <this.Sidebar state={this.state}>
        <FormInputs data={variant} state={this.state} handleChange={this.handleChange} />
      </this.Sidebar>
      <this.DemoArea>
        <button className="o-buttons o-buttons--mono" onClick={this.toggleSidebar}>Customise this demo</button>
        <button className="o-buttons o-buttons--mono" onClick={() => this.toggleHTML(component)}>HTML</button>
        {component}
      </this.DemoArea>
    </>
  }
}

export default DemoSandbox;
