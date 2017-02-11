// "use strict";
// var  info=`用户名：嘿嘿
//  密码：123`;
// console.log(info);
// var price=9.9,count=3;
// var info2=`
//   单价:${price},
//   数量:${count},
//   小计:${price*count};
//   超过预算:${price*count>20?'是':'否'}
// `;
// console.log(info2);
// const PI=3.14;
// // PI=2;
// console.log(PI)

// function f1(){
//   // 'use strict';
//   var name='tedu.cn';
//   loc='深圳';
//   console.log(name);
//   console.log(loc)
// }
// f1();

// (function(){
//   'use strict';
//   console.log(this)
// })();
// 'use strict'
// var count=20;
// if(count>10){
//   let cur=count;
// }
// console.log(cur);
// for(var i=0;i<5;i++){}
//   console.log(i);
// var obj={
//   name:'tom',
//   age:20
// }
// for(var i in obj){
//   console.log(i+':'+obj[i])
// }
// var arr=[10,20,30,40];
// for(var j in arr){
//   console.log(j)
// }
// for(var v of arr){
//   console.log(v)
// }
//
// (function(i){
//   console.log(i)
// })(111);
//
// +function(){
//   console.log(222)
// }()

// (function(num){
//   if(num>0){
//     arguments.callee(num-1)
//     console.log(num)
//   }
// })(5)

// ((n1,n2)=>{
//   console.log(n1+n2)
// })(10,20)

// var i=1;
// for(var i=0;i<3;i++){
// setTimeout(()=>{
//   console.log(i)
// },1000);
// }
// for(var i=0;i<3;i++){
//   setTimeout(outer(i),1000)
// }
// function outer(num){
//   return function inner(){
//     console.log(num)
//   }
// }
// for(var i=0;i<3;i++){
//   setTimeout((num=>{
//     return ()=>{
//       console.log(num)
//     }
//   })(i),1000)
// }
// 'use strict'
// class Emp{
//   constructor(ename,salary){
//     this.ename=ename;
//     this.salary=salary;
//   }
//   work(){
//     return `${this.ename} is working`;
//   }
//   sal(){
//     return `${this.ename}'s salary is ${this.salary}`
//   }
// }
// var e1=new Emp('tom',8000)
// console.log(e1.ename)
// console.log(e1.work())
// console.log(e1.sal())
//
// class Programmer extends Emp{
//   constructor(ename,salary,skills){
//     super(ename,salary)
//     this.skills=skills;
//   }
//   work(){
//     return super.work()+` skills are ${this.skills}`
//   }
// }
// var p1=new Programmer('jack',8000,'PHP&MYSQL')
// console.log(p1.ename)
// console.log(p1.work())
// console.log(p1.sal())
// console.log(process.arch)
// console.log(process.platform)
// console.log(process.env)
// console.log(process.cwd)
// console.log(process.execPath)
// console.log(process.versions)
// console.log(process.pid)
// console.log(process.memoryUsage())
// process.kill(1712)
var count=0;
var timer=setTimeout(function(){
  count++;
  if(count<=5){
  console.log(count);
    // process.nextTick(timer)
    setTimeout(arguments.callee,1000)
  }else{
    clearTimeout(timer)
  }
},1000);