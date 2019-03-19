import React from "react";
import Sidebar from './sidebar';
import DemoArea from './demo-area';

import './main.scss';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      ...props.config.demo.data, 
      sidebarVisible: false
    }
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

  render() {
    const demo = this.props.config.demo.data;
    const variant = this.props.config.shared.variants.find(variant => variant.type === demo.type);
    return <>
      <Sidebar state={this.state} data={variant} brand={this.props.config.brand} handleChange={this.handleChange}></Sidebar>
      <DemoArea state={this.state} demo={demo} toggleHTML={this.toggleHTML} component={this.props.component} toggleSidebar={this.toggleSidebar}></DemoArea>
    </>
  }
}

export default App;
