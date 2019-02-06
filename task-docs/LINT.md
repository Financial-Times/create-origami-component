# `lint`
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

This command is meant to update the linting for our compontents. We have considered using git-hooks to ensure linting gets  run on pre commit, but this is still up for debate.

Our argument for using [Prettier](https://prettier.io/) is in part consistency. We don't have documented reasoning for the linting rules that we have, and have agreed that, with appropriate Origami-specific configuration, we can abide by Prettier rules.

There are some exceptions, such as Sass `@include` and vendor prefixing rules, but we need to look into the full set that Prettier provides.

We'll also look at adding the `--fix` flag to update our syntax, and have entertained 'recommended editor plugins' to help with this during active development.

### DOCS

- [`README`](../../README.md)
- [`build`](./BUILD.md)
- [`init/boilerplate`](./INIT-BOILERPLATE.md)
- [`install`](./INSTALL.md)
- [`test`](./TEST.md)
