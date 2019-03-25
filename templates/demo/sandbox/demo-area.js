import React from 'react';
import OSyntaxHighlight from '@financial-times/o-syntax-highlight';
import beautify from 'js-beautify';

const Component = React.forwardRef((props, ref) => {
  let component;
  if (props.markup.showHTML) {
    component = <pre><code className="o-syntax-highlight--html" dangerouslySetInnerHTML={{ __html: props.markup.HTML }}></code></pre>
  } else {
    component = <props.component ref={ref} state={props.state} demo={props.demo} />
  }

  return component;
});

class DemoArea extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state =  {
      sidebarEnabled: props.sidebarEnabled,
      showHTML: false,
      HTML: null,
      buttonText: 'HTML'
    };
  }

  toggleHTML = (element) => {
    let componentNode = element.current;

    if (componentNode) {
      let beaut = beautify.html(componentNode.outerHTML, { inline: [] })
      const highlighter = new OSyntaxHighlight(beaut, { language: 'html' })
      componentNode = highlighter.tokenise();
    }
  
    this.setState({
      showHTML: !this.state.showHTML,
      HTML: componentNode,
      buttonText: this.state.showHTML ? 'HTML' : 'Component'
    })
  }

  render() {

    console.log(this.state.sidebarEnabled);

    const sidebarToggleButton = (
      <button
        className="o-buttons o-buttons--mono"
        onClick={() => this.props.toggleSidebar()}>
          Customise this demo
      </button>
    );

    const selectFullCodeSnippetButton = (
      <button
        className="o-buttons o-buttons--mono"
        onClick={() => alert('technically this would select this beautiful markup')}>
        Select Full Code Snippet
      </button>
    );

    const componentHtmlToggleButton = (
      <button
        className="o-buttons o-buttons--mono"
        onClick={() => {
          this.props.state.sidebarVisible ? this.props.toggleSidebar() : null;
          this.toggleHTML(this.ref);
        }}>
          {this.state.buttonText}
      </button>
    );

    return <div className="demo-area" data-o-component="o-syntax-highlight">
      {
        this.state.showHTML ?
        selectFullCodeSnippetButton : (
          this.state.sidebarEnabled ?
          sidebarToggleButton :
          ''
        )
      }
      {componentHtmlToggleButton}
      <Component
        component={this.props.component}
        ref={this.ref}
        state={this.props.state}
        markup={this.state}
        demo={this.props.demo} />
    </div>
  }
}

export default DemoArea;