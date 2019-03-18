# Manifest

This currently lives in origami.json, under `demosDefaults`. The debate is up for whether it should stay there (the argument being that it is shared configuration and not demo dependant) or whether it should live in a separate file? TBD.

## `variants`
type | required |
-----|----------|
Array | true | 

This must be an array of objects. Each object will set the type and configuration for a variant rule. These are the rules that define variations for a component — they will reflect the editable content in the customisation sidebar for each demo application. 

- `type`: type `String`. Is the name of the variant rule.
- `config`: type `Array`. Holds all of the config for a rule. 

e.g.: `o-message` variants include 'alert', 'notice' and 'action' which all have individual conditions (layout or brand support, for example)
```json
"variants": [
  {
    "type": "action", 
    "config": [
      {
        ... // detailed config properties below
      }
    ]
  }
]
```

### `config`
type | required |
-----|----------|
Array | true |

This must be an array of objects. All properties that dictate configurable aspects of a variant exist each object. Every object within `config` accepts the following properties:
- `name`: type `String`. This is the label for the customisable field.
- `inputType`: type `String`. This determines what kind of form element this configuration will be made available in. Can be one of: `select`, `text`, `textarea`, `radio`, `checkbox`. Different input types may require additional configuration (more below)
- `required`: type `Boolean`. Whether or not this field must be filled out.
- `options`: type `Array`. This is required for `select`, `checkbox` and `radio` input types only.

```json
{
  "name": "status",
  "inputType": "select",
  "required": true,
  "options": [
      {
        ... // detailed options properties below
      }
  ]
}
```

### `options`
type | required |
-----|----------|
Array | true |

This must be an array of objects. It will determine what options are visible in the customisation sidebar. Each object must accepts two properties:
- `name`: type `String`. This is required and denotes the name of the option.
- `brands`: type `Array`. The brand that this option is available for. This property is optional, and defaults to 'master'

```json
"options": [
  {
    "name": "inform",
    "brands": [
      "master",
      "internal"
    ]
  },
  {
    "name": "warning",
    "brands": [
      "internal" // will *not* be available to master brand
    ]
  },
  ...
]
```
## Example

Altogether with the examples above, and an additional variant, this config looks like (this is a trimmed example):
```json
"variants": [
  {
    "type": "action", 
    "config": [
      {   
        "name": "status",
        "inputType": "select",
        "required": true,
        "options": [
          { "name": "success" },
          { "name": "neutral" },
          { "name": "error" }
        ]
      },
      {   
        "name": "content",
        "inputType": "textarea",
        "required": true
      }
    ]
  },
  {
    "type": "notice", 
    "config": [
      {   
        "name": "status",
        "inputType": "select",
        "required": true,
        "options": [
          {
            "name": "inform",
            "brands": [
              "master",
              "internal"
            ]
          },
          {
            "name": "warning",
            "brands": [
              "internal"
            ]
          }
        ]
      },
      {   
        "name": "button",
        "inputType": "text",
        "required": false
      }
    ]
  }
]
```
