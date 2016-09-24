
/*
type:localSt|sessionSt
* */
var st={
    //修改，添加到localStorage
    setLocalStorage:function(name,value){
        this.storageData("localSt",name,value);
    },
    //修改，添加到 sessionStorage
    setSessionStorage:function(name,value){
      this.storageData("sessionSt",name,value);
    },
    //获取从 localStorage
    getLocalStorage:function(name){
        return this.storageData("localSt",name);
    },
    //获取 从sessionStorage
    getSessionStorage:function(name){
      return this.storageData("sessionSt",name)  ;
    },
    //修改，添加，获取,用户不传默认为localStorage
    storageData:function(type,name,value){
        if(arguments.length==2){
            if(arguments[0]=="localSt"||arguments[0]=="sessionSt"){

            }else{
                console.log("未输入存储方式，默认为本地存储");
                var str=arguments[0];
                var va=arguments[1];
                name=str;
                value=va;
                type="localSt";
            }
        }
        if(!value){
            return getStorage(type,name);
        }else{
            setStorage(type,name,value);
        }
    },
    //同时传递多个
    setMoreLocalStorageData:function(){
        var arr=arguments;
        for(var i=0;i<arr.length;i++){
            this.setLocalStorage(arr[i][0],arr[i][1]);
        }
    },
    //同时传递多个
    setMoreSessionStorageData:function(){
        var arr=arguments;
        for(var i=0;i<arr.length;i++){
            this.setSessionStorage(arr[i][0],arr[i][1]);
        }
    },
    //查找所有的数据 从localstorage 返回[{"key":"keyName","value":"keyValue"]
    findAllFromLocalStorage:function(){
      return this.findAll("localSt") ;
    },
    //查找所有的数据 从sessionStorage 返回[{"key":"keyName","value":"keyValue"]
    findAllFromSessionStorage:function(){
        return this.findAll("sessionSt") ;
    },
    //遍历，返回格式[{"key":"keyName","value":"keyValue",{"key":"keyName","value":"keyValue"}];用户不传默认为localStorage
    findAll:function(type){
        var arr=[];
        if(!type){
            type="localSt";
        }
        if(type=="localSt"){
            for(var i=0;i<localStorage.length;i++){
                var key=localStorage.key(i);
                var value=getStorage(type,key);
                var objData={
                    "key":key,
                    "value":value
                }
                arr.push(objData);
            }
        }else{
            for(var i=0;i<sessionStorage.length;i++){
                var key=sessionStorage.key(i);
                var value=getStorage(type,key);
                var objData={
                    "key":key,
                    "value":value
                }
                arr.push(objData);
            }
        }
       return arr;
    },
    //查找某一个key是否存在从localStorage,存在则返回对应值，不存在返回-1，
    findLocalStorageById:function(name){
        return this.findById(name,"localSt");
    },
    //查找某一个key是否存在从sessionStorage,存在则返回对应值，不存在返回-1，
    findSessionStorageById:function(name){
        return this.findById(name,"sessionSt");
    },
    //查找某一个key是否存在,存在则返回对应值，不存在返回-1，用户不传默认为localStorage
    findById:function(key,type){
        type=type||"localSt";
        var arr=this.findAll(type);
        for(var i=0;i<arr.length;i++){
            if(arr[i].key==key){
                return arr[i].value;
            }
        }
        return -1;
    },
    //删除从localStorage 删除失败返回-1 不传name 则全部删除
    delLocalStorage:function(name){
        if(!name){
           return this.delStorage("localSt");
        }else{
           return this.delStorage("localSt",name);
        }
    },
    //删除从session 删除失败返回-1 不传name 则全部删除
    delSessionStorage:function(name){
        if(!name){
           return this.delStorage("sessionSt");
        }else{
          return  this.delStorage("sessionSt",name);
        }
    },
    //删除 删除失败返回-1 不传name 则全部删除
    delStorage:function(type,name){
        if(arguments.length==1){
            if(arguments[0]=="localSt"||arguments[0]=="sessionSt") {}
            else{
                console.log("未输入存储方式，默认查找本地存储");
                var str=arguments[0];
                name=str;
                type="localSt";
            }
        }
        if(!name){
            if(type=="localSt"){
                localStorage.clear();
                return 1;
            }else{
                sessionStorage.clear();
                return 1;
            }
            return -1;
        }else{
            if(type=="localSt"){
                if(this.findById(name,type)){
                    localStorage.removeItem(name);
                    return 1;
                }
               return -1;
            }else{
                if(this.findById(name,type)){
                    sessionStorage.removeItem(name);
                    return 1;
                }
                return -1;
            }
        }
    }
}
//存
function setStorage(type,name,value){
    var arrType=typeof(value);
    if(arrType=="object"){
       value=JSON.stringify(value);
    }
    if(type=="localSt"){
        localStorage.setItem(name,value+"&"+arrType);
    }else{
        sessionStorage.setItem(name,value+"&"+arrType);
    }
}
//取
function getStorage(type,name){
   /* var flag=true;*/
    if(type=="localSt") {
        if(localStorage.getItem(name)){
            var strValue = localStorage.getItem(name).split("&");
        }
        else{
            return -1;
        }

    }else{
        if(sessionStorage.getItem(name)){
            var strValue = sessionStorage.getItem(name).split("&");
        }
        else{
            return -1;
        }
    }
    var value=strValue[0];
    var type=strValue[1];
    switch(type){
        case "object":return JSON.parse(value); break;
        case "number":return parseInt(value);break;
        default :return value;break;
    }
 /*else{
        console.log("不存在");
        return -1;
    }*/

}