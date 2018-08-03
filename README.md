# babel 转码器

## .babelrc 

Babel的配置文件是.babelrc,存放在项目的根目录下，首先配置这个文件

>.babelrc用于配置除回调函数以为的所有babel api选项,plugins用于配置我们转义所需要的插件，
presets用于配置我们所需要的转译器

>babel-cli仅仅是为了我们在命令行中使用babel,但是要转码还得安装转译器

>我们在.babelrc中配置的选项都可以通过命令行来添加(二者冲突的时候，以文件为准)如：

>babel src -dlib --presets=env 等价于 "presets":["env"]

>如果不使用转译器,则在命令行中使用babel的时候，转译后的文件和源文件并无差别

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

表示将src下的相关js文件打包到当前文件夹下的lib文件夹下（如果没有则新建）

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

## Babel和其他工具

>静态分析工具

新的标准为语言带来了许多新的语法，语法检查就不可避免了，ESLint是最流行的语法检查工具之一

## 最好不要全局安装babel,最好使用.babelrc文件


##还有一点需要主要：如果你想要在你的项目中，用命令行直接babel,或者.babelrc文件中，直接写"babel xxxx"
你需要全局安装babel,否则使用完整路径,类似这样：

```js
"scripts": {
    "build": "node_modules\\.bin\\babel src -d lib"
}
npm run build
```

```js
cmd: \test\node_modules\\.bin\\babel src -d lib

##还有一点要注意：

```js
class MyDate extends Date {
  test() {
    return this.getTime()
  }
}
let myDate = new MyDate()
myDate.test()
```
当你用es6的语法写了这样一段代码，编译后引用在index.html,控制台报错

```js
Uncaught TypeError: this is not a Date object.
    at MyDate.getTime (<anonymous>)
    at MyDate.test (latest.js:23)
    at latest.js:31
```

因为在 JS 底层有限制，如果不是由 Date 构造出来的实例的话，是不能调用 Date 里的函数的。所以这也侧面的说明了：ES6 中的 class 继承与 ES5 中的一般继承写法是不同的
所以我们这样来设计：


```js
function MyDate{}
MyDate.prototype.test = function(){
  return this.getTime()
}
let d = new Date()
Object.setPrototypeOf(d,MyDate.prototype)
Object.setPrototypeOf(MyDate.prototype,Date.prototype)
```

Object.setPrototypeOf(obj,proto),用来将obj.__proto__ 设置为proto
Object.getPrototypeOf(obj),返回obj.__proto__


这样就完美的解决了JS底层的这个限制




























