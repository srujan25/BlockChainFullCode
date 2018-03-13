# Release Checklist

## Visual regression testing
When preparing to publish a new version, use the `master` branch as a baseline for tests against the newest version of the repository. [Read more about visual regression testing in Spark.](./README.md#visual-regression-testing)

## Releasing a new version
These are the commands needed bump and release a version of the Spark library.

- `npm update`

      Make sure all dependencies pull in and compile correctly.

- Create a pull request from the `versioned branch (ie: v1.3.3)` into the `master` branch.

      _This step doesn't have an actual command, since it is handled by the version control repository, Stash_

- `git pull master`

      Pull in the latest from the master branch

- `npm version major|minor|patch`

      On the master branch, this command will automatically bump to the correct version and create a tag in git. **NOTE: We will need to re-tag however once we compile the files again.**

- `gulp build && npm run docs`

      The compiled files contain the version number, so we need to re-compile with the latest version.

- `git commit -am "..."`

      Commit the compiled files

- `git tag -d $VERSION_NUMBER && git tag $VERSION_NUMBER`

      Delete the local git tag and then re-tag the new files

- `git push -u origin master`

      Push the production ready files back to the remote repository

- `git push --tags`

      Push the newly created tags to the remote repository

- `npm publish`

      Push the updated repository to the npm repository (see [NPM Login](#npm_login) for more information)


### NPM Login

The npm repository is an internal only resource, controlled by Sinopia. In-order to publish to this repository, you must be authenticated to login.

To check if you are logged-in and can connect to the internal repository, run: `npm whoami --registry=http://npm.sgdcelab.sabre.com:4873/`. This should return `spark` upon success.

If not, run:

- `npm login --registry=http://npm.sgdcelab.sabre.com:4873/`
- For username/email enter `spark@sabre.com`
- Enter password
