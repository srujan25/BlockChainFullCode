# Sabre Spark Icons


### Spark Icon Font

Streamlined icons have been selected as the Spark icon set based on its extensive range of imagery, modern aesthetic and availability in both outline and fill formats.

Icons in our library have been incorporated into the Spark icon font, located in the 'build/fonts' folder

### Complete Streamline Icon Font Set.

The complete set of icons are available in vector format in the 'Complete Streamline Icon Set' folder.

### Requesting new icons

In the event that a new icon needs to be added to the Spark icon font, select an appropriate icon from the Streamline set and submit a request to [spark@sabre.com](mailto:spark@sabre.com). Include both the icon and an image representing the context in which the icon will be used.

### Updating the icons and fonts yourself.
This project uses [grunt-webfont](https://github.com/sapegin/grunt-webfont) to generate the webfonts along with css and scss automatically. You will need to install fontforge, refer to the grunt-webfont documentation.

1.    Create a new branch.
2.    Create 48x48px .svg files for both line and fill versions and place them in the appropriate folders in the 'src' folder. The line and fill versions of each icon should be named the same with dash separated words. The filename will be used as the class name.
3.    Run `grunt` to generate the updated fonts. Run `grunt sparkIconsSass` to generate the new .scss file
4.    Create a pull request with Ryan and Jim as reviewers.

**Note, the `templates/demo.html` files that are created are actually partials used by the Spark-EDL-Docs jekyll site. Please take care in updating this file.**