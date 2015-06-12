var test = require('tape');
var resolve = require('..').resolve;
var path = require('path');
var fs = require('fs');
var xbind = require('xbind');

test('require.resolve(m)', function(t) {
    t.same(
        resolve('resolve', { cwd: path.resolve(__dirname, '../node_modules') })
        , [require.resolve('resolve')]
    );
    t.end();
});

test('require.resolve([])', function(t) {
    t.same(
        resolve(['resolve', 'xglob'], { cwd: path.resolve(__dirname, '../node_modules') })
        , [require.resolve('resolve'), require.resolve('xglob')]
    );
    t.end();
});

