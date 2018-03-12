# Contributing to Spark

## Reporting bugs

The [Spark JIRA](http://ptjira.sabre.com/browse/EDL) should be used for reporting bugs. **Do not** use this mechanism for personal support requests.


## Contributing Code

All suggested code enhancements should be made in the form of [Pull Requests](https://confluence.atlassian.com/display/STASH0311/Using+pull+requests+in+Stash). Please make your pull requests into the currently open version branches. [Read about our branching strategy below.](#branching)

**All new Javascript functionality must have corresponding unit tests.**


## Code guidelines

Use the provided `.editorconfig` and `.jshintrc` files. This will ensure your code meshes well with the styles of Spark. Any code submitted should also [adhere to the Code Guide](http://codeguide.co/#html) with the following exceptions and extensions:

### HTML

- Use [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) attributes in documentation examples to promote accessibility.

### CSS

- Color palettes must comply with [WCAG color contrast guidelines](http://www.w3.org/TR/WCAG20/#visual-audio-contrast).
- Single quotes
- No vendor prefixes
- [BEM](http://getbem.com) naming convention
- Silent comments
- Avoid ID selectors
- No leading numeric zeros
- Alphabetized properties

### JS

- Single quotes
- strict mode

### Checking coding style

Run `grunt lint` before committing to ensure your changes follow our coding standards.


<a name="branching"></a>
## Branching Strategy

The `master` branch should always contain a working release copy of Spark. Each release should have an accompanying [tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging). Tags should be pushed whenever updates are made to master. The tag name should be the same as the version in the current `package.json`, but with the letter `v` prepended. For example, when releasing version 1.5.1 of Spark, the tag name would be `v1.5.1`. When using `npm version` to increment the code version, tags are created automatically.

Use feature branches when working on new features or bug fixes. The branches can be off of `master` or a currently open version branch. Version branches should follow [Semantic Versioning](http://semver.org). This means that bugfixes which will be merged into `master` and released should be a patch-level increment of the current version, like 1.5.0 to 1.5.1. New components should increment the minor version number, like 1.5.1 to 1.6.0. Breaking changes should increment the major version  number, like 1.6.0 to 2.0.0.

An example workflow, assuming version 1.5.0 was just released:
    - Create the branch `v1.5.1` from `master` for addressing bugs have appeared after the latest release.
    - Create the branch `header-resize-bug` from `v1.5.1` to address a bug in the header
    - Once work is complete on this bugfix, merge `header-resize-bug` into `v1.5.1`
    - Other bugfixes should also branch from `v1.5.1` and merge back in
    - When ready to deploy, merge `v1.5.1` into `master` and run `npm verson patch`


## License

@todo
