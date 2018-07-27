# babel 转码器

## .babelrc 

Babel的配置文件是.babelrc,存放在项目的根目录下，首先配置这个文件

1.该文件用来设置转码规则和插件,基本格式如下

```js
{
	"presets":["es2015","react","stage-2"],
	"plugins":[]
}
```

## 命令行转码

Babel提供babel-cli工具，用于命令行转码，基本用法如下

1.转码结果输出到标准

```js
$ babel example.js
```

2.转码结果写入一个文件

```js
$ babel example.js --out-file compiled.js或者
$ babel example.js -o compiled.js
```

3.整个目录转码

```js
$ babel src --out-dir lib或者
$ babel src -d lib
```

## 如上所有的一些命令是在全局环境下，如果单独在一个项目中，则需要使用babel-cli,然后改写package.json

```js
{
  // ...
  "devDependencies": {
    "babel-cli": "^6.0.0"
  },
  "scripts": {
    "build": "babel src -d lib"
  },
}
$ npm run build
```

## babel-node

babel-cli自带一个babel-node命令,可以直接运行ES6的代码

```js
$ babel-node es6.js
```

也可以直接用在项目中，可以直接替换node命令，这样script.js本身就不用做任何转码处理

```js
$ npm install babel-cli --save-dev
{
	"scripts":{
		"test":"babel-node script.js"
	}
}
```


## babel-register

```js
require("babel-register");
require("./index.js");
```

需要注意的是，babel-register只会对require命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。


## babel-polyfill

babel默认只转换新的语法，但是不转换新的API，所以必须使用babel-polyfill,为当前环境提供一个垫片

```js
import 'babel-polyfill';
// 或者
require('babel-polyfill');
```
























