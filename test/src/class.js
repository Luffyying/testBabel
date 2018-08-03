function MyData() {

}
let d = new Date()
MyData.prototype.test = function () {
  return d.getTime.call(this)
}

// Object.setPrototypeOf(d, MyData.prototype)
// Object.setPrototypeOf(MyData.prototype, Date.prototype)

var a = new MyData()
a.test()