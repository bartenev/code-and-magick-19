const gulp = require("gulp");

const sync = require("browser-sync").create();

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: './'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

const watcher = () => {
  gulp.watch("js/*.js").on("change", sync.reload);
  gulp.watch("*.html").on("change", sync.reload);
}

// Default

exports.default = gulp.series(
  server, watcher
);


