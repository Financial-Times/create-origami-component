import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Sidebar from './sidebar';
import './main.scss';
import OSyntaxHighlight from '@financial-times/o-syntax-highlight';

const Component = React.forwardRef((props, ref) => {
  let component;
  if (props.state.showHTML) {
    component = <pre><code className="o-syntax-highlight--html" dangerouslySetInnerHTML={{__html: props.state.HTML}}></code></pre>
  } else {
    component = <props.component ref={ref} state={props.state} demo={props.demo} />
  }

  return component;
});

class DemoArea extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    return <div className="demo-area" data-o-component="o-syntax-highlight">
      <button className="o-buttons o-buttons--mono" onClick={() => this.props.toggleSidebar()}>Customise this demo</button>
      <button className="o-buttons o-buttons--mono" onClick={() => this.props.toggleHTML(this.ref)}>HTML</button>
      <Component component={this.props.component} ref={this.ref} state={this.props.state} demo={this.props.demo}/>
    </div>
  }
}


class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      ...props.config.demo.data, 
      sidebarVisible: false, 
      showHTML: false,
      HTML: null
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

  toggleHTML = (element) => {
    let highlightedHTML = null;
    if (element.current) {
      const highlighter = new OSyntaxHighlight(element.current.outerHTML, { language: 'html' })
      highlightedHTML = highlighter.tokenise();
    }
    this.setState({
      showHTML: !this.state.showHTML,
      HTML: highlightedHTML
    })
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
