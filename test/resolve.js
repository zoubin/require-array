var test = require('tape');
var resolve = require('..').resolve;
var path = require('path');
var fs = require('fs');
var xbind = require('xbind');

test('require.resolve()', function(t) {
    t.same(
        resolve('resolve'),
        [require.resolve('resolve')],
        "should handle string input"
    );
    t.same(
        resolve(['resolve', 'xglob']),
        [require.resolve('resolve'), require.resolve('xglob')],
        "should handle array input"
    );
    t.same(
        resolve('resolve', function () {
            return require.resolve('xglob');
        }),
        [require.resolve('xglob')],
        "should handle custom resolve"
    );
    t.end();
});

