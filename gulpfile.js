const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

process.on('uncaughtException', err => {
    console.error(err.message, err.stack, err.errors);
    process.exit(255);
});

gulp.task('nodemon', callback => {
    nodemon({
        nodeArgs: ['--debug'],
        script: './src/server/index.js',
        watch: ['*'],
        ext: 'js css sss html jsx json'
    });
});

