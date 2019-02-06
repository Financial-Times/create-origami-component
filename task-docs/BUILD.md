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

Both of these features require a base webpack config which will be external to `oat`. This will be responsible for the JS and SCSS compilation, and the `build` command will add config on top of that. This extraneous webpack config is meant to work for the Origami Build Service as well, and will be the main reason for decoupling `obs` and `obt`.

In addition to HMR for in-editor changes, we want to build our component demos in React, and will need `oat` to support JSX (because of its widespread use) so we can do that.

Finally, we'll want to add flags to this task, `--watch` to enable the HMR, and `--demo-name` with a tabbing functionality to let us build specific demos from the command line, instead of sifting through the Origami manifest in search of the demo names.

**Questions**:
- Should `--watch` automatically enable the HMR, and by proxy become redundant?
- Does a tabbing functionality (to tab through demo names) mean the command is interactive?
- Does building demos in React change the implementation details in the Origami manifest?

**References**:

- Dan Abramov's experimental [Hot Reloading in React](https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf)
- James Long's [Live Editing JavaScript with Webpack](https://jlongster.com/Backend-Apps-with-Webpack--Part-III)
- Webpack's [HMR Documentation](https://webpack.js.org/concepts/hot-module-replacement/#src/components/Sidebar/Sidebar.jsx)

## DOCS
	- [`README`](../../README.md)
	- [`init/boilerplate`](./INIT-BOILERPLATE.md)
	- [`install`](./INSTALL.md)
	- [`lint`](./LINT.md)
	- [`test`](./TEST.md)
