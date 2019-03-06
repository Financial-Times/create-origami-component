First draft for init prompts
```
> Init will create the folder structure for a new Origami component ...
? Name: (required)
? path: (./)
? Description: (required)
? Keywords: ([])
? Support email: (origami.support@ft.com)
? Support slack: (#ft-origami)
? component status: (experimental, active)
	//'dead', 'deprecated' and 'maintained' don't really apply to creating a new component, should this be an option that oat can provide when we decide to deprecate a component?
? brands: (master, internal, whitelabel)

? Will your component use JS (Y/N)
? Will your component use SCSS (Y/N)
? Will you need demos (Y/N)


	//Show tree
? Is this ok? (Y/N)

	// create origami.json
	// create bower.json
	// create .gitignore
	// create README
	// create circleci/config.yml

	if JS
		// create component js
		// create js tests

	if SCSS
		// create component scss
		// create scss tests

	if demos
		// create demos/
:emoji: Your new component has been created at/this/path!
```
