## React Demo

This command operates on the assumption that the component it will be rendering demos for has a single React template.

### Template example
The following is an oversimplified example of what that template might look like, and we will step through it to clarify what is important to making the template compatible with the demo app. 

```
import React from 'react';

const oComponent = React.forwardRef((props, ref) => {
  const demo = props.state || props.demo;
  const hasButton = demo.button; // true

  return <div ref={ref} className="o-component {demo.layout === 'wide' ? 'o-component--wide': ''}>
    { demo.type === 'button' ?
      <button className="o-component__button o-component__button--{demo.buttonColor}">{demo.buttonText}<button/>
      :
      There is no button
    }
  </div>
});

export default oComponent;
```
### `ref`
React is required in every template—not only do we use it to call `React.forwardRef`, but the `{}` around the variables are part of the React syntax.
`React.forwardRef` is responsible for passing on the reference (`ref={ref}`) that the demo app has created for this particular component. This is important because it is how we can identify the component node in the DOM, get its HTML (including any customised changes that a user might have made) and render that into a `<pre>` tag when the user wants to see the markup for the component.

### `props`
The `props` are a combination of two parts of config.
The demo app will hold the state of the component when it is initialised, meaning that the component will reflect the data it receives from the demo-specific `data` object in `origami.json`.
It is also aware of the [variant rules](./variants-manifest.md) that have been set for that particular component. So depending on the demo you are looking at, what you will be able to cusomtise about it relies on those two data sets. These are initialised with de demos data, but update according to changes made in the customisation sidebar, meaning that the state of the app will be passed down to the component on every re-render. 

Because the datasets mirror each other's properties, it is important that the template mirror those properties, too. The demo app knows what part of the component demo to change based on these properties and they should determine how the template is constructed.

As an example, consider this component's variant config:
```
"variants": [
  {
    "type": "button",
    "config": [
      {
        "name": "buttonColor",
        "inputType": "select",
        "required": true, 
        "options": {
          {"name": "lemonchiffon"},
          {"name": "cadetblue"},
          {"name": "firebrick"}
        },
      },
      {
        "name": "buttonText",
        "inputType": "text",
        "require": true
      }  
    }]
  }
]
```
And now the demo specific data: 
```
"demos": [
  {
    title": "Button: Firebrick",
    "name": "button-firebrick",
    "description": "A firbrick coloured button",
    "data": {
      "type": "button",
      "buttonColor": "firebrick",
      "buttonText": "I am a redish button"
    }
  }
]
```

Looking back up at the [template example](#template-example), we should see that the properties are constant throughout. If the `type` is `button`, we will have a button rendered with the `buttonColor` and `buttonText` properties. If the demos doesn't outline these, the demo won't be constructed with a button, or will be constructed incorrectly.

### `export default`

Finally, the component needs to be exported as described in order to be picked up by the demo app. It relies on that specific title casing, as that is the variable the demo will be looking for when it is being built. 


### styling

Note that the React template no longer imports `demos.scss`. While specific demo styling is still supported, the demo app is now responsible for the styling, because it will also determine the brand that the demo is going to be rendered in. 

Happy templating!