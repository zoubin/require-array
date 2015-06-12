# require-array
extend native require to handle array inputs based on node-resolve

## Example

```
⌘ tree example/
example/
├── files
│   ├── a.js
│   ├── b.js
│   └── exclude.js
└── require.js
```

require.js:

```javascript

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

```

a.js:

```javascript
module.exports = 'a';
```

b.js:

```javascript
module.exports = 'b';
```

exclude.js:

```javascript
module.exports = 'exclude';
```


output:

```
⌘ node example/require.js
a a
[ 'a', 'b' ]
```

## Usage

### arequire(mods, opts)

* **mods**: *String* *Array* module names or paths to resolve by [node-resolve](https://www.npmjs.com/package/resolve)
* **opts**: *Object* *Optional* passed directly to [node-resolve](https://www.npmjs.com/package/resolve)

### arequire.resolve(mods, opts)

Resolve the path to be required.

### arequire.glob(patterns, opts, resolveOpts)

* **patterns**: *String* *Array* patterns to locate files by [xglob](https://www.npmjs.com/package/xglob)
* **opts**: *Object* *Optional* passed directly to [xglob](https://www.npmjs.com/package/xglob)
* **resolveOpts**: *Object* *Optional* passed directly to [node-resolve](https://www.npmjs.com/package/resolve)

### arequire.glob.resolve(mods, opts, resolveOpts)

Resolve the path to be required.

