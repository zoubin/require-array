var test = require('tape');
var requireArr = require('..').glob;
var path = require('path');
var fs = require('fs');
var xbind = require('xbind');

test('require.glob(pattern)', function(t) {
    var dir = path.resolve(__dirname, '../node_modules');
    t.same(
        requireArr('*', { cwd: dir })
        , fs.readdirSync(dir)
            .filter(function (m) {
                return m[0] !== '.';
            })
            .map(xbind(1, require))
    );
    t.same(
        requireArr(['*', '!resolve'], { cwd: dir })
        , fs.readdirSync(dir)
            .filter(function (m) {
                return m[0] !== '.' && m !== 'resolve';
            })
            .map(xbind(1, require))
    );
    t.end();
});


