# zepto
> Since webpack ProvicePlugin can only be used when $ is directly derived from a module,
current modules can't be used conviently in webpack since their exports.$ is what we got.

Current version of Zepto: ```1.2.0```

Version of this repo: ```1.2.0```

Official releases: [github.com/madrobby/zepto/releases](https://github.com/madrobby/zepto/releases)

# Install

```npm install zepto-webpack```

# Usage

```javascript
plugins: [
    new webpack.ProvidePlugin({
        $: 'zepto-webpack'
    })
]
```

# Changes from Zepto

at line 887 I add:

```javascript
module.exports = window.Zepto;
```

solve ajax issue in [issue921](https://github.com/madrobby/zepto/issues/921)