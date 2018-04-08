//基础版
var TextCount = (function () {
    var doc = document;
    var _bind = function (_this, name) {
        _this.input.addEventListener(name, function (e) {
            _this.render()
        })
    }
    var _creatSpan = function (obj) {
        var ospan = doc.createElement("span");
        ospan.id = obj.id;
        doc.body.appendChild(ospan);
        return ospan
    }
    var _setHtmlCount = function (el, count) {
        el.innerHTML = `文字长度为${count}`
    }
    var _getValueLength = function (el) {
        return el.value.length;
    }
    function TextCountFun(config) {
        this.input = null;
        this.count = 0;
        this.init(config)
    }

    TextCountFun.prototype.init = function (config) {
        this.input = doc.getElementById(config.id);
        _bind(this, "keyup");
        //初始渲染一次
        this.render();
        return this;
    }

    TextCountFun.prototype.render = function () {
        this.count = _getValueLength(this.input);
        var ospan = doc.getElementById("J_input_span")
        if (!ospan) {
            ospan = _creatSpan({ id: "J_input_span" })
        }
        _setHtmlCount(ospan, this.count)
    }
    return TextCountFun
})()