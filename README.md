# origami-authoring-tools
OAT: A command line tool for authoring Origami components

**:warning: OAT is WIP and is under documentation driven development. This README outlines the API interface as we hope it will be.**

In an effort to decouple the Origami Build Service from `origami-build-tools`, we're looking at extracting the responsibilites of `obt` into `oat` to improve  our workflow, allow for faster compilation and finally (!) introduce React demos.

The following list of commands for this tool is under constant progress :construction:, but is meant to lead the way in terms of the decisions we will be making about the construction of the OAT API.

**All `--flags` and `commands` are up for renaming**

#### Tasks
- [`build`](./task-docs/BUILD.md)
- [`init/boilerplate`](./task-docs/init/task.md)
- [`install` ?](/task-docs/INSTALL.md)
- [`lint`](/task-docs/LINT.md)
- [`test`](/task-docs/TEST.md)
