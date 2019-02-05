# origami-authoring-tools
OAT: A command line tool for authoring Origami components

**:warning: OAT is WIP and is under documentation driven development. This README outlines the API interface as we hope it will be.**

In an effort to decouple the Origami Build Service from `origami-build-tools`, we're looking at extracting the responsibilites of `obt` into `oat` to improve  our workflow, allow for faster compilation and finally (!) introduce React demos.

The following list of commands for this tool is under constant progress :construction:, but is meant to lead the way in terms of the decisions we will be making about the construction of the OAT API.

**All `--flags` and `commands` are up for renaming**

#### Tasks
- [`build`](#build)
- [`init/boilerplate`](#initboilerplate)
- [`install` ?](#install-)
- [`lint`](#lint)
- [`test`](#test)

## `build`

```
{
	interactive: true,
	flags: [
		--watch
		--demo-name
	],
	functionality: [
		'hot module replacement',
		'error overlay',
		'JSX parsing'
	],
	requires: [
		'shared webpack config'
	]
}
```

The objective of the build task is to quickly compile the necessary CSS & JS for developing demos. We'll aim for this through hot module replacement (HMR), depending on how we choose to generate our demos.

Along with HMR, we want to implement an error overlay, which will crop up on the browser window to help us debug our code more effectively.

Both of these features require a base webpack config, which will be responsible for the JS and SCSS compilation, and will build on top of that. This extraneous webpack config is meant to work for the Origami Build Service as well, and will be the main reason for decoupling `obs` and `obt`.

In addition to HMR for in-editor changes, we want to build our component demos in React, and will need `oat` to support JSX (because of its widespread use) so we can do that.

Finally, we'll want to add flags to this task, `--watch` to enable the HMR, and `--demo-name` with a tabbing functionality to let us build specific demos from the command line, instead of sifting through the Origami manifest in search of the demo names.

**Questions**:
- Should `--watch` automatically enable the HMR, and by proxy become redundant?
- Does a tabbing functionality mean the CLI is interactive?
- Does building demos in React change the implementation details in the Origami manifest?

**References**:

- Dan Abramov's experimental [Hot Reloading in React](https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf)
- James Long's [Live Editing JavaScript with Webpack](https://jlongster.com/Backend-Apps-with-Webpack--Part-III)
- Webpack's [HMR Documentation](https://webpack.js.org/concepts/hot-module-replacement/#src/components/Sidebar/Sidebar.jsx)

## `init/boilerplate`

Task name up for debate

```
{
	interactive: true,
	flags: [],
	functionality: [
		'component boilerplate',
		'test file boilerplate',
		'fixture boilerplate'
	],
	requires: []
}
```

## `install` ?

Do we need this?

```
{
	interactive: false,
	flags: [
		--no-bower (?)
	],
	functionality: [
		'bower install',
		'npm install'
	],
	requires: []
}
```

## `lint`
Task name up for debate

```
{
	interactive: false,
	flags: [
		--fix
	],
	functionality: [
		'syntax consistency check',
		'correct syntax',
		'editor plugin ?'
	],
	requires: [
		'prettier',
		'origami lint config'
	]
}
```

## `test`

```
{
	interactive: false,
	flags: [
		--browserstack,
		--sass (?)
	],
	functionality: [
		'runs unit tests locally',
		'runs unit tests in browserstack',
		'runs sass tests (true) locally',
	],
	requires: []
}
```
