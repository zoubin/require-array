var resolve = require('resolve');
var xbind = require('xbind');
var xglob = require('xglob');
var path = require('path');
var caller = require("caller");
var merge = require("util-mix").merge;

module.exports = $require;
module.exports.resolve = $resolve;
module.exports.glob = grequire;
module.exports.glob.resolve = gresolve;

function $require(mods, opts) {
    var resolver = $resolve;
    if (typeof opts === "function") {
        resolver = opts;
        opts = {};
    }
    return [].concat(
        resolver(mods, merge({ filename: caller() }, opts))
    ).map(xbind(1, require));
}

function $resolve(mods, opts) {
    opts = opts || {};
    // consider opts.basedir, opts.filename, caller, in order
    opts = merge(opts, { basedir: opts.basedir || path.dirname(opts.filename || caller()) });
    return [].concat(mods).map(xbind(1, resolve.sync, opts));
}

function grequire(mods, opts, resolveOpts) {
    if (typeof resolveOpts !== "function") {
        resolveOpts = merge({ filename: caller() }, resolveOpts);
    }
    return gresolve(mods, opts, resolveOpts).map(xbind(1, require));
}

function gresolve(mods, opts, resolveOpts) {
    var files = xglob.sync(mods, opts)
        .map(xbind.l(1, path.resolve, opts && opts.cwd || process.cwd()));
    if (typeof resolveOpts === 'function') {
        return files.map(xbind(1, resolveOpts, { basedir: path.dirname(caller()) }));
    }
    resolveOpts = resolveOpts || {};
    resolveOpts = merge(resolveOpts, { basedir: resolveOpts.basedir || path.dirname(resolveOpts.filename || caller()) });
    return files.map(xbind(1, resolve.sync, resolveOpts));
}
