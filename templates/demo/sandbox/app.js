import React from "react";
import Sidebar from './sidebar';
import DemoArea from './demo-area';

import './main.scss';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...props.config.demo.data,
      sidebarEnabled: Boolean(this.props.config.shared.variants),
      sidebarVisible: false,
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name || target.id;
    this.setState({ [name]: value });
  }

  toggleSidebar = () => {
    let toggle = false;
    if (this.state.sidebarEnabled) {
      toggle = this.state.sidebarVisible ? false : true;
    }
    this.setState({ sidebarVisible: toggle })
  }

  render() {
    const demo = this.props.config.demo.data;
    const variant = this.state.sidebarEnabled ? this.props.config.shared.variants.find(variant => variant.type === demo.type) : null;

    return <>
      {this.state.sidebarEnabled ?
        <Sidebar
          data={variant}
          brand={this.props.config.brand}
          state={this.state}
          handleChange={this.handleChange} />
        :
        ''
      }
      <DemoArea
        demo={demo}
        component={this.props.component}
        state={this.state}
        sidebarEnabled={this.state.sidebarEnabled}
        toggleHTML={this.toggleHTML}
        toggleSidebar={this.toggleSidebar} />
    </>
  }
}

export default App;
