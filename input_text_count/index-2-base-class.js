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
        oInput.addEventListener("keyup", (e) => this.render());
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