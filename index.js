var resolve = require('resolve');
var xbind = require('xbind');
var xglob = require('xglob');
var path = require('path');

module.exports = $require;
module.exports.resolve = $resolve;
module.exports.glob = grequire;
module.exports.glob.resolve = gresolve;

function $require(mods, opts) {
    return $resolve(mods, opts)
        .map(xbind(1, require));
}

function $resolve(mods, opts) {
    if (typeof opts === 'function') {
        return [].concat(mods)
            .map(xbind(1, opts));
    }
    return [].concat(mods)
        .map(xbind(1, resolve.sync, opts));
}

function grequire(mods, opts, resolveOpts) {
    return gresolve(mods, opts, resolveOpts)
        .map(xbind(1, require));
}

function gresolve(mods, opts, resolveOpts) {
    var files = xglob.sync(mods, opts)
        .map(xbind.l(1, path.resolve, opts && opts.cwd || process.cwd()));
    if (typeof resolveOpts === 'function') {
        return files.map(xbind(1, resolveOpts));
    }
    return files.map(xbind(1, resolve.sync, resolveOpts));
}

