const { scss } = require('./helpers/list.js');
const { camelCase } = require('./helpers/name-formats.js');


module.exports = answers => {
	const name = answers.name;

	return `# @financial-times/${name}

_A short description of what the component does._

- [Usage](#usage)
- [Markup](#markup) ${answers.scss ? `
- [Sass](#sass)`: ``} ${answers.javascript ? `
- [JavaScript](#javascript)`: ``}
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Migration](#migration)
- [Contact](#contact)
- [Licence](#licence)

_Instructions for the component. We've broken this down by Markup, JavaScript, Sass, etc. You may add more sections as needed._

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-components-in-your-project) to get started with \`${name}\`.

## Markup

_Markup documentation for the component. Including css classes, data attributes, and tags for variations of the component._
_Demo markup is also shown in the registry. For complex markup it can be useful to describe the markup and link to the registry demos for a full example._
_Remember to start your codeblocks with three backticks and "html" so your markup is syntax highlighted correctly._
\`\`\`html
<div data-o-component="${name}" class='${name}'>
</div>
\`\`\`

${answers.scss ? `
## Sass

_Sass documentation. With instructions to include styles with a primary mixin, what options are available, brand support where applicable._
_For complex components it may be helpful to document apis with SassDoc and link to the components SassDoc in the Origami Registry._
_Remember to start your codeblocks with three backticks and "scss" so your markup is syntax highlighted correctly._

Use \`@include ${camelCase(name)}()\` to include styles for all \`${name}\` features.

\`\`\`scss
@import "@financial-times/${name}";

@include ${camelCase(name)}();
\`\`\`

`: ``}
${answers.javascript ? `
## JavaScript

_JavaScript documentation. Including how to initialise the component, available options, and common usecases._
_For complex components it may be helpful to document apis with JSDoc and link to the components JSDocs in the Origami Registry._
_Remember to start your codeblocks with three backticks and "js" so your js is syntax highlighted correctly._

JavaScript is initialised automatically for [Origami Build Service](https://www.ft.com/__origami/service/build/v2/) users. If your project is using a manual build process, [initialise  \`${name}\` manually](https://origami.ft.com/docs/tutorials/manual-build/).

For example call the \`init\` method to initialise all \`${name}\` instances in the document:

\`\`\`js
import ${camelCase(name)} from '${name}';
${camelCase(name)}.init();
\`\`\`

Or pass an element to initialise a specific \`${name}\` instance:

\`\`\`js
import ${camelCase(name)} from '${name}';
const ${camelCase(name)}Element = document.getElementById('#my-${name}-element');
${camelCase(name)}.init(${camelCase(name)}Element);
\`\`\`
`: ``}

## Troubleshooting

_Answers to questions or problems that come up repeatedly._
_It's likely you can delete this section for now. Remember to remove it from the table of contents._

## Contributing

_Contributing documentation for non typical components._
_It's likely you can delete this section if your component conforms with other components._
_Remember to update the table of contents is you remove this section._

## Migration

_Guides to upgrade from one major version of a component to another._
_This section includes a table of major versions with links to \`MIGRATION.md\`._
_\`MIGRATION.md\` would provide upgrade instructions, but since this is a new component there is no \`MIGRATION.md\`._
_Delete this section, including from the table of contents, until there is a second major version of this component._

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 3 | N/A | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
⚠ maintained | 2 | 2.0 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.0 | N/A |

## Contact
If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/${name}/issues), visit [#${answers.slack}](https://financialtimes.slack.com/messages/${answers.slack}/) or email [${answers.email}](mailto:${answers.email}).

## Licence
This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
`;
};
