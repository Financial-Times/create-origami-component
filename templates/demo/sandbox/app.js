import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Sidebar from './sidebar';
import './main.scss';

class App extends React.Component {
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
      <Sidebar state={this.state} data={variant} brand={this.props.config.brand} handleChange={this.handleChange}></Sidebar>
      <this.DemoArea>
        <button className="o-buttons o-buttons--mono" onClick={this.toggleSidebar}>Customise this demo</button>
        <button className="o-buttons o-buttons--mono" onClick={() => this.toggleHTML(component)}>HTML</button>
        {component}
      </this.DemoArea>
    </>
  }
}

export default App;
