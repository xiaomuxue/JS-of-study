// JavaScript Document

  /*  myReady(function(){
	      xxxx;
	})*/

function myReady(fn){
  //1、对于现代浏览器，我们就用addEventListenter
  if(document.addEventListener){
        document.addEventListener("DOMContentLoaded",fn,false);
   }else{
        //自己模拟一个
		IEContentLoaded(fn);
   }
}


    function IEContentLoaded(fn){
		var done=false;
		
		function init(){
		   if(!done){
			   done=true;
			   fn();
			}
		}                       //写一个function函数的作用：为了兼容IE低版的浏览器
		
		//保证fn只执行一次
	   /*  var init=function(){
			 if(!done){
				 done=true;
		         fn();
			 }
		}*/         //这种写法不兼容IE6，因为IE6会直接执行它，而不是通过下面的自调用去调用它
		
		//函数自调用
		(function(){
		    try{
			    //如果DOM没有加载完毕，调用doScroll会报错
				document.documentElement.doScroll("left");
		    }catch(e){         //e(excaption)异常，可以使用alert(e);看到它的错误
		       // alert(e);
			   //说明出错了，意味着dom树没有加载完毕
			   //延迟再试一次      调用延迟，延迟之后直接跳过
			   setTimeout(arguments.callee,10);         //延迟10毫秒后，去调用arguments.callee      arguments.callee函数（call（））指上面的document.documentElement.doScroll("left");
			   return;        //return:要是去掉，那么在IE6就会不执行init
			}
			//代表doScroll没有报错了，DOM树加载完毕了
			init();         //调用init();使其fn执行一次
		})();
		
		//监听document的加载状态
		document.onreadystatechange=function(){
		    if(document.readyState=="complete"){
		        //说明DOM加载完毕
				init();
			}
		}
	}
    
	
	//整个JS内容的作用：加快浏览器的加载