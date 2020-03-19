const automator=require("miniprogram-automator");
const appjs=require("../cal/wxapp-sCalc/app.json")
let readPages=appjs.pages;

automator.launch({
    cliPath:'D:/Program Files (x86)/Tencent/微信web开发者工具/cli.bat',
    projectPath:'../cal/wxapp-sCalc'
}).then(async miniProgram=>{
    console.log('begin')
    let t=0;
    let stop=setInterval(function(){
        t++;
    },1);
    let firstl=await miniProgram.redirectTo(`/${readPages[0]}`)
    clearInterval(stop);
    console.log(`启动首页用时:${t}ms`);
    
    let totalTime=0;
    for(let i=1;i<readPages.length;i++){
        let t1=0;
        let stop1=setInterval(function(){
            t1++;
        },1);
        const pageNav=await miniProgram.navigateTo(`/${readPages[i]}`);
        clearInterval(stop1);
        totalTime+=t1;
        console.log(`跳转到页面${readPages[i]}用时:${t1}ms`);
    }
    let avgTime=parseInt(totalTime/(readPages.length-1))
    console.log(`平均页面切换耗时:${avgTime}ms`)

})