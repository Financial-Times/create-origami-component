# origami-authoring-tools
OAT: A command line tool for authoring Origami components

**:warning: OAT is WIP and is under documentation driven development. This README outlines the API interface as we hope it will be.**

In an effort to decouple the Origami Build Service from `origami-build-tools`, we're looking at extracting the responsibilites of `obt` into `oat` to improve  our workflow, allow for faster compilation and finally (!) introduce React demos.

The following list of commands for this tool is under constant progress :construction:, but is meant to lead the way in terms of the decisions we will be making about the construction of the OAT API.

**All `--flags` and `commands` are up for renaming**

#### Tasks
- [`build`](./task-docs/BUILD.md)
- [`init/boilerplate`](./task-docs/INIT-BOILERPLATE.md)
- [`install` ?](/task-docs/INSTALL.md)
- [`lint`](#lint)
- [`test`](#test)

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
