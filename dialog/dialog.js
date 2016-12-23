/**
 * Created by chi on 2016/12/22.
 */

/*
 opt:content  title  undo  submit
 method : close
 event :

*/
function Dialog(){
    this.dialog=null;
    this.dialog_header=null;
    this.dialog_body=null;
    this.dialog_footer=null;
    this.mask=null
    //默认参数
    this.settings={
        title:'提示',
        content:'这是一段信息',
        undo:'取消',
        submit:'确定',
        mask:true

    }
}
Dialog.prototype.json={};
Dialog.prototype.init= function(opt){
    extend(this.settings,opt);
    if(!this.json.sign){
        this.create();
        this.json.sign=true  ; //开关，只允许同时存在一个弹窗
        this.close(true);
    }
};
Dialog.prototype.create=function(){

    this.sign=true;
    this.dialog=document.createElement('div');
    this.dialog.className='dialog';
    this.dialog.style.zIndex='1000';

    this.dialog_header=document.createElement('div');
    this.dialog_header.className='dialog_header';
    this.dialog_header.innerHTML='<span class="dialog_header_title">'+this.settings.title+'</span><span class="close">X</span>';

    this.dialog_body=document.createElement('div');
    this.dialog_body.className='dialog_body';
    this.dialog_body.innerHTML='<span>'+this.settings.content+'</span>';

    this.dialog_footer=document.createElement('div');
    this.dialog_footer.className='dialog_footer';
    this.dialog_footer.innerHTML='<button class="dialog_footer_undo"><span>'+this.settings.undo+'</span></button>'+
        '<button class="dialog_footer_submit"><span>'+this.settings.submit+'</span></button>';
    document.body.appendChild(this.dialog);
    this.dialog.appendChild( this.dialog_header);
    this.dialog.appendChild( this.dialog_body);
    this.dialog.appendChild( this.dialog_footer);
    if(this.settings.mask){
        this.mask=document.createElement('div');
        this.mask.id='mask';
        document.body.appendChild(this.mask);
    }

    //加入拖拽
    dialogDrag()
};

Dialog.prototype.close=function(type){
    var This=this;
    var oClose=document.getElementsByClassName('close');
    oClose[0].onclick=function(){
        document.body.removeChild(This.dialog);
        This.json.sign=false;
        This.mask.style.display='none'
    };
    var oUndo=this.dialog_footer.getElementsByTagName('span');
    oUndo[0].onclick=function(){
        document.body.removeChild(This.dialog);
        This.json.sign=false;
        This.mask.style.display='none'
    };
    if(!type){
        document.body.removeChild(This.dialog);
        This.json.sign=false;
        This.mask.style.display='none'
    }
};

function dialogDrag(){
    var oDrag=new Drag();
    oDrag.init({
        className:'dialog'
    });
    bindEvent(oDrag,'Down',function(){
        document.title="可拖拽"
    });
    //当拖拽的时候加入 边框变色
    bindEvent(oDrag,'broad',function(element,type){
        if(type && (element.style.border=='')){
                element.style.border='2px solid #20a0ff';
        }else if(!type && (element.style.border!='')){
                element.style.border=''

        }

    });
}

function extend(obj1,obj2){
    for(var attr in obj2){
        obj1[attr]=obj2[attr]
    }
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
        this.oDiv.style.position='absolute'
    }else if(this.settings.className){
        this.oDiv=document.getElementsByClassName(this.settings.className)[0];
        this.oDiv.style.position='absolute'
    }

    this.oDiv.onmousedown=function(ev){

        var ev=ev || window.event;
        This.fnDown(ev);

        document.onmousemove=function(ev){
            var ev=ev||window.event;
            This.fnMove(ev)
            // This.settings.Down()
            clickEvent(This,'Down');
            clickEvent(This,'broad',This.oDiv,true)
        };

        document.onmouseup=function(){

            document.onmousemove=null;
            document.onmouseup=null;
           // This.settings.Up();
            clickEvent(This,'Up')
            clickEvent(This,'broad',This.oDiv,false)
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
function clickEvent(obj,events,element,type){
    if(obj.listeners[events]){
        for(var i=0;i<obj.listeners[events].length;i++){
            obj.listeners[events][i](element,type);
        }
    }

}