//如果我们希望输入字的时候超过5个字就弹出警告
//最直接的就是改bind函数,高级点的用法就是发布订阅模式,js中的事件系统用的就是该模式

//首先写一个发布订阅的工厂函数
const observer = (function () {
    let listners = {};
    function addListner(name, fn) {
        if (!listners[name]) {
            listners[name] = [];
        }
        listners[name].push(fn);
    }
    function trigger() {
        //触发时第一个参数为订阅者名称，后面为传入的回调参数
        let arg = arguments;
        let name = Array.prototype.shift.call(arg);
        let listnerArr = listners[name];
        if (listnerArr) {
            for (let fn of listnerArr) {
                fn.apply(null, arg);
            }
        }
    }
    return {
        addListner: addListner,
        trigger: trigger
    }
})()
//基础父类 按照组件的生命周期定义了默认的函数
class Base {
    constructor(config) {
        this.config = config;
        this.bind();
        this.render();
    }
    get(key) {
        return this.config[key];
    }
    set(key, value) {
        this.config[key] = value;
    }
    bind() { };
    render() { };
    destroy() { };
}
//子类继承
class TextCount extends Base {
    constructor(config) {
        super(config);
    }
    bind() {
        let id = super.get("id");
        let oInput = this._getInpuElementById(id);
        let inputLen = oInput.value.length;
        oInput.addEventListener("keyup", (e) => {
            observer.trigger("keyup_msg", inputLen, e)
            this.render()
        });
    }
    render() {
        let count = super.get("input").value.length;
        let oSpan = document.getElementById("J_input_span")
        if (!oSpan) {
            oSpan = this._creatSpan({ id: "J_input_span" })
        }
        oSpan.innerHTML = `文字长度为${count}`
    }
    _getInpuElementById(id) {
        let oInput = document.getElementById(id);
        super.set("input", oInput);
        return oInput
    }
    _creatSpan(obj) {
        var oSpan = document.createElement("span");
        oSpan.id = obj.id;
        document.body.appendChild(oSpan);
        return oSpan
    }
}