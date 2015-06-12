var test = require('tape');
var resolve = require('..').glob.resolve;
var path = require('path');
var fs = require('fs');
var xbind = require('xbind');

test('require.glob.resolve(pattern)', function(t) {
    var dir = path.resolve(__dirname, '../node_modules');
    t.same(
        resolve('*', { cwd: dir })
        , fs.readdirSync(dir)
            .filter(function (m) {
                return m[0] !== '.';
            })
            .map(xbind(1, require.resolve))
    );
    t.same(
        resolve(['*', '!resolve'], { cwd: dir })
        , fs.readdirSync(dir)
            .filter(function (m) {
                return m[0] !== '.' && m !== 'resolve';
            })
            .map(xbind(1, require.resolve))
    );
    t.end();
});


