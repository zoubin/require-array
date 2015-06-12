var arequire = require('..');

var mods = arequire(['path', './a.js'], { basedir: __dirname + '/files' })

console.log(
    mods[0].basename('/path/to/a.js', '.js'),
    mods[1]
);

mods = arequire.glob(['*.js', '!exclude.js'], { cwd: __dirname + '/files' })

console.log(
    mods
);
