// @todo: Need to move this grunt task to the project's main Gulp file
// @todo: Remove package.json as a dependency.

// JavaScript Document
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-webfont');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        webfont: {
            spark: {
                src: 'src/icons/*.svg',
                dest: 'build/fonts',
                destCss: 'build/css',
                options: {
                    font: 'spark-icon-line',
                    types: 'eot,woff2,woff,ttf,svg',
                    order:'eot,woff,woff2,svg,ttf',
                    codepointsFile:'src/codepoints.json',
                    template: 'templates/spark-bem-css.css',
                    templateOptions: {
                        htmlDemoTemplate: 'templates/demo.html',
                        htmlDemoFilename: 'spark-icon-line-demo',
                        destHtml: 'build',
                        baseClass: 'spark-icon',
                        classPrefix: 'spark-icon-',
                        mixinPrefix: 'spark-icon-'
                    }
                }
            },
            sparkFill: {
                src: 'src/icons-fill/*.svg',
                dest: 'build/fonts',
                destCss: 'build/css',
                options: {
                    types: 'eot,woff2,woff,ttf,svg',
                    order:'eot,woff,woff2,svg,ttf',
                    font: 'spark-icon-fill',
                    type: 'eot,woff,ttf,woff2,svg',
                    codepointsFile:'src/codepoints.json',
                    template: 'templates/spark-bem-css.css',
                    templateOptions: {
                        htmlDemoTemplate: 'templates/demo.html',
                        htmlDemoFilename: 'spark-icon-fill-demo',
                        destHtml: 'build',
                        baseClass: 'spark-icon--fill',
                        classPrefix: 'spark-icon-',
                        mixinPrefix: 'spark-icon-'
                    }
                }
            },
            sparkSass: {
                src: 'src/icons/*.svg',
                dest: 'build/fonts',
                destCss: 'build/scss',
                options: {
                    font: 'icon-definitions',
                    types: '',
                    order:'',
                    codepointsFile:'src/codepoints.json',
                    template: 'templates/spark-bem-sass.css',
                    stylesheet: 'scss',
                    htmlDemo: false,
                    templateOptions: {
                        htmlDemoTemplate: 'templates/demo.html',
                        htmlDemoFilename: 'spark-icon-line-demo',
                        destHtml: 'build',
                        baseClass: 'spark-icon',
                        classPrefix: 'spark-icon-',
                        mixinPrefix: 'spark-icon-'
                    }
                }
            }
        },
        watch: {
            files: ['src/**/*.svg'],
            tasks: ['webfont:spark','webfont:sparkFill']
        }
    });

    grunt.registerTask('sparkIcons', ['webfont:spark']);
    grunt.registerTask('sparkIconsFill', ['webfont:sparkFill']);
    grunt.registerTask('sparkIconsSass', ['webfont:sparkSass']);

    grunt.registerTask('icons', ['sparkIcons','sparkIconsFill','sparkIconsSass']);

};
