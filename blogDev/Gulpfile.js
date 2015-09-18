var gulp           = require('gulp');
var mainBowerFiles = require('main-bower-files');
var less           = require('gulp-less');
var jshint         = require('gulp-jshint');
var swig           = require('gulp-swig');
var livereload     = require('gulp-livereload');
var minifyCSS      = require('gulp-minify-css');
var sourcemaps     = require('gulp-sourcemaps');
var uglify         = require('gulp-uglify');
var connect        = require('connect');
var del            = require('del');

// Edit this values to best suit your app
var APP_DIR  = '../blog/static/blog/';
var TEM_DIR  = '../blog/templates/blog';

var paths = {
    scripts: 'app/js/*.js',
    images: 'app/img/*',
    styles: 'app/less/*.less',
    templates: 'app/templates/*.html'
};

var opts = {
  defaults: { cache: false, locals: { site_name: "HUIXING" } },
  data: {
    headline: "Welcome"
  }
};

// bower
// gulp.task('bower', function() {
//     gulp.src(mainBowerFiles())
//         .pipe(gulp.dest(APP_DIR + '/vendor'))
// });

// jshint files
gulp.task('jshint', function() {
    gulp.src([APP_DIR+'/**/*.js'])
    // gulp.src(['test/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('uglify', function () {
    gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        // .pipe(gulp.dest(APP_DIR + '/static/js'));
        .pipe(gulp.dest(APP_DIR));
});

// Copy all static images
gulp.task('images', function() {
  gulp.src(paths.images)
    // Pass in options to the task
    // .pipe(imagemin({optimizationLevel: 5}))
    // .pipe(gulp.dest(APP_DIR + '/static/img'));
    .pipe(gulp.dest(APP_DIR));
});

gulp.task('templates', function() {
  gulp.src(paths.templates)
    // .pipe(swig(opts))
    .pipe(gulp.dest(TEM_DIR));
});

gulp.task('less', function () {
    gulp.src('app/less/style.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest(APP_DIR));
});

// start local http server for development
// gulp.task('http-server', function() {
//     serveStatic = require('serve-static');
//     connect()
//     .use(require('connect-livereload')({port: 35729}))
//     .use(serveStatic(APP_DIR))
//     .listen(WEB_PORT);

//     console.log('Server listening on http://localhost:' + WEB_PORT);
// });

// start local http server with watch and livereload set up
// gulp.task('server', function() {
//     //gulp.run('lr-server');

//     var watchFiles = [
//         APP_DIR + '/*.html',
//         APP_DIR + '/js/*.js',
//         APP_DIR + '/img/*',
//         APP_DIR + '/css/styles.css'
//     ];

//     var server = livereload();
//     gulp.watch(watchFiles).on('change',function(file){
//         server.changed(file.path);
//     });

//     gulp.run('http-server');
// });

gulp.task('watch', function () {
    gulp.watch(paths.styles, ['less']);
    gulp.watch(paths.scripts, ['uglify']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.templates, ['templates']);
});

gulp.task('default', function() {
    gulp.run('less', 'templates', 'images', 'uglify', 'watch');
        // , 'uglify', 'images', 'templates', 'watch');
});

gulp.task('dist', function () {
    gulp.run('bower', 'less', 'uglify', 'images', 'templates');
});

gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build'], cb);
});

