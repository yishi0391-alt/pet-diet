const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
const source=html.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/init\(\);\s*$/,'');
const els=new Map();const el=id=>{if(!els.has(id))els.set(id,{textContent:'',innerHTML:'',style:{},classList:{add(){},remove(){},contains(){return false}}});return els.get(id)};
const ctx=vm.createContext({console,Date,Math,JSON,setTimeout(){},clearTimeout(){},setInterval(){},clearInterval(){},document:{getElementById:el,querySelector(){return null},querySelectorAll(){return []}},window:{removeEventListener(){}},navigator:{},localStorage:{getItem(){return null},setItem(){}},prompt(){return null}});
vm.runInContext(source,ctx);
vm.runInContext("data=defData();petCheer=()=>{};toast=()=>{};saveData=()=>{};renderHome=()=>{};checkDaily=()=>{};checkAchievements=()=>{};",ctx);
let count=0;function run(label,code){vm.runInContext(code,ctx);console.log('PASS '+label);count++}
ctx.assert=assert;
run('Haversine metres', "assert.equal(hv(0,0,0,0),0);assert.ok(Math.abs(hv(0,0,0,0.001)-111.195)<0.01)");
run('1000 steps summary and log agree at 0.70 km', "es.mode='pedometer';es.status='running';es.steps=1000;es.startTime=Date.now()-10000;exStop();assert.equal(es.summary.distance,700);assert.ok(document.getElementById('summGrid').innerHTML.includes('0.70'));confirmEx();assert.ok(data.logs[0].desc.includes('0.70km'))");
run('1000 GPS metres summary and log agree at 1.00 km', "es.mode='run';es.status='running';es.distance=1000;es.startTime=Date.now()-10000;exStop();assert.equal(es.summary.distance,1000);assert.equal(es.summary.calories,60);assert.ok(document.getElementById('summGrid').innerHTML.includes('1.00'));confirmEx();assert.ok(data.logs[0].desc.includes('1.00km'))");
run('zero distance summary', "es.summary={distance:0,duration:5000,steps:0,calories:0,coins:5};showExSumm();assert.ok(document.getElementById('summGrid').innerHTML.includes('0.00'))");
assert.ok(!source.includes('function photoFood'));console.log('PASS no legacy random-photo calorie function');console.log((count+1)+' tests passed');
