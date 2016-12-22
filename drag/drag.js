/**
 * Created by chi on 2016/12/22.
 */

//Example
function dialogDrag(){
    var oDrag=new Drag();
    oDrag.init({
        id:'div1',
        className:'dialog'
    });
    bindEvent(oDrag,'Down',function(){
        document.title="可拖拽"
    });
}

///拖拽
function Drag(){
    this.oDiv='';
    this.disX=0;
    this.disY=0;
    this.settings={
        id:null,
        className:null
    }
}

Drag.prototype.init=function(option){

    var This=this;

    extend(this.settings,option);

    if(this.settings.id){

        this.oDiv=document.getElementById(this.settings.id);

    }else if(this.settings.className){

        this.oDiv=document.getElementsByClassName(option.className)[0];
    }

    this.oDiv.onmousedown=function(ev){

        var ev=ev || window.event;
        This.fnDown(ev);

        document.onmousemove=function(ev){

            var ev=ev||window.event;
            This.fnMove(ev);
            // This.settings.Down()
           // clickEvent(This,'Down')
        };

        document.onmouseup=function(){

            document.onmousemove=null;
            document.onmouseup=null;
           // This.settings.Up();
           // clickEvent(This,'Up')
        };
        return false
    };
};
Drag.prototype.fnDown=function(ev){
    this.disX=ev.clientX-this.oDiv.offsetLeft;
    this.disY=ev.clientY-this.oDiv.offsetTop
};
Drag.prototype.fnMove=function(ev){
    var L = ev.clientX - this.disX;
    var T = ev.clientY - this.disY;
    if(L<0){
        L = 0;
    }
    else if(L>document.documentElement.clientWidth - this.oDiv.offsetWidth){
        L = document.documentElement.clientWidth - this.oDiv.offsetWidth;
    }
    if(T<0){
        T=0
    }else if(T>document.documentElement.clientHeight - this.oDiv.offsetHeight){
        T=document.documentElement.clientHeight - this.oDiv.offsetHeight
    }
    this.oDiv.style.left=L+'px';
    this.oDiv.style.top=T+'px';
};

function extend(obj1,obj2){
    for(var attr in obj2){
        obj1[attr]=obj2[attr]
    }
}

function bindEvent(obj,events,fn){

    obj.listeners=obj.listeners||{};
    obj.listeners[events]=obj.listeners[events]||[];
    obj.listeners[events].push(fn)

    if (obj.addEventListener) {                     //所有主流浏览器，除了 IE 8 及更早 IE版本
        obj.addEventListener(events, fn,false);
    } else if (obj.attachEvent) {                  // IE 8 及更早 IE 版本
        obj.attachEvent('on'+events, fn);
    }
}

function clickEvent(obj,events){
    if(obj.listeners[events]){
        for(var i=0;i<obj.listeners[events].length;i++){
            obj.listeners[events][i]();
        }
    }

}