var test = require('tape');
var requireArr = require('..');
var path = require('path');
var fs = require('fs');
var xbind = require('xbind');

test('require(m)', function(t) {
    t.same(
        requireArr('resolve', { cwd: path.resolve(__dirname, '../node_modules') })
        , [require('resolve')]
    );
    t.end();
});

test('require([])', function(t) {
    t.same(
        requireArr(['resolve', 'xglob'], { cwd: path.resolve(__dirname, '../node_modules') })
        , [require('resolve'), require('xglob')]
    );
    t.end();
});

