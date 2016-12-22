/**
 * Created by chi on 2016/12/22.
 */
function Dialog(){
    this.dialog=null;
    this.dialog_header=null;
    this.dialog_body=null;
    this.dialog_footer=null;
    //默认参数
    this.settings={
        title:'提示',
        content:'这是一段信息',
        undo:'取消',
        submit:'确定'

    }
}
Dialog.prototype.json={};
Dialog.prototype.init= function(opt){
    extend(this.settings,opt);
    if(!this.json.sign){
        this.create();
        this.json.sign=true  ; //开关，只允许同时存在一个弹窗
        this.close();
    }
};
Dialog.prototype.create=function(){
    this.sign=true
    this.dialog=document.createElement('div');
    this.dialog.className='dialog';

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
    this.dialog.appendChild( this.dialog_footer)
};

Dialog.prototype.close=function(){
    var This=this;
    var oClose=document.getElementsByClassName('close');
    oClose[0].onclick=function(){
        document.body.removeChild(This.dialog);
        This.json.sign=false
    };
    var oUndo=this.dialog_footer.getElementsByTagName('span');
    oUndo[0].onclick=function(){
        document.body.removeChild(This.dialog);
        This.json.sign=false
    };
} ;

function extend(obj1,obj2){
    for(var attr in obj2){
        obj1[attr]=obj2[attr]
    }
}