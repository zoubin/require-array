var test = require('tape');
var requireArr = require('..');
var path = require('path');
var fs = require('fs');
var xbind = require('xbind');

test('requireArr()', function(t) {
    t.same(
        requireArr.resolve('resolve', { cwd: path.resolve(__dirname, '../node_modules') }),
        [require.resolve('resolve')],
        "should resolve node_modules"
    );
    t.same(
        requireArr.resolve("./files/relative.js"),
        [require.resolve("./files/relative.js")],
        "should resolve relative module"
    );
    t.same(
        requireArr.resolve(['resolve', 'xglob', "./files/relative.js"], { cwd: path.resolve(__dirname, '../node_modules') }),
        [require.resolve('resolve'), require.resolve('xglob'), require.resolve("./files/relative.js")],
        "should resolve multiple modules"
    );
    t.same(
        requireArr('resolve', function () {
            return require.resolve('xglob');
        }),
        [require('xglob')],
        "should support custom resolve"
    );
    t.end();
});

test('requireArr.glob()', function(t) {
    var dir = path.resolve(__dirname, '../node_modules');
    t.same(
        requireArr.glob.resolve('*', { cwd: dir }),
        fs.readdirSync(dir)
            .filter(function (m) {
                return m[0] !== '.';
            })
            .map(xbind(1, require.resolve)),
        "should handle *"
    );
    t.same(
        requireArr.glob.resolve(['*', '!resolve'], { cwd: dir }),
        fs.readdirSync(dir)
            .filter(function (m) {
                return m[0] !== '.' && m !== 'resolve';
            })
            .map(xbind(1, require.resolve)),
        "should handle negation"
    );
    t.same(
        requireArr.glob.resolve("resolve", { cwd: dir }, function () {
            return require.resolve("xglob");
        }),
        [require.resolve('xglob')],
        "should handle custom resolve"
    );
    t.end();
});

