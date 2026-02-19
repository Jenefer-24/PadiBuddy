function switchScreen(id){
document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
document.getElementById(id).classList.add('active');
}

function toggleMenu(){
document.getElementById("sideMenu").classList.toggle("active");
}

function register(){
let username=document.getElementById("username").value;
let age=document.getElementById("age").value;
let gender=document.getElementById("gender").value;
let study=document.getElementById("study").value;

if(username===""||age===""){
alert("Fill all details");
return;
}

localStorage.setItem("profile",JSON.stringify({
username,age,gender,study
}));

localStorage.setItem("streak",0);
localStorage.setItem("lastStreakDate","");
alert("Registered successfully!");
switchScreen("login");
}

function login(){
let username=document.getElementById("loginUser").value;
let profile=JSON.parse(localStorage.getItem("profile"));

if(profile && username===profile.username){
localStorage.setItem("logged","true");
openDashboard();
}else{
alert("Invalid username");
}
}

function openDashboard(){
switchScreen("dashboard");
let profile=JSON.parse(localStorage.getItem("profile"));
document.getElementById("welcomeText").innerText="Welcome "+profile.username;
loadTasks();
loadStreak();
}

function logout(){
localStorage.setItem("logged","false");
location.reload();
}

function addTask(){
let task=document.getElementById("taskInput").value;
let time=document.getElementById("timeLimit").value;

if(task==="") return;

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
tasks.push({
task,
time,
done:false,
date:new Date().toDateString()
});

localStorage.setItem("tasks",JSON.stringify(tasks));
document.getElementById("taskInput").value="";
showMotivation();
loadTasks();
}

function loadTasks(){
let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
let list=document.getElementById("taskList");
list.innerHTML="";
let completed=0;

tasks.forEach((t,index)=>{
let li=document.createElement("li");
let span=document.createElement("span");
span.innerText=t.task+" ("+t.time+" min)";
let checkbox=document.createElement("input");
checkbox.type="checkbox";
checkbox.checked=t.done;

checkbox.onchange=function(){
t.done=!t.done;
localStorage.setItem("tasks",JSON.stringify(tasks));
loadTasks();
};

li.appendChild(span);
li.appendChild(checkbox);
list.appendChild(li);

if(t.done) completed++;
});

let percent=tasks.length?Math.round((completed/tasks.length)*100):0;
document.getElementById("progressBar").style.width=percent+"%";
}

function showMotivation(){
let quotes=[
"You’ve got this!",
"Consistency beats motivation.",
"Small progress is still progress.",
"Take a short break after 45 mins.",
"Focus deeply. No distractions."
];
let random=quotes[Math.floor(Math.random()*quotes.length)];
document.getElementById("motivation").innerText=random;
}

function loadStreak(){
let today=new Date().toDateString();
let lastDate=localStorage.getItem("lastStreakDate");
let streak=parseInt(localStorage.getItem("streak"))||0;

document.getElementById("streakText").innerText=streak+" days";
}

function markStudied(){
let today=new Date().toDateString();
let lastDate=localStorage.getItem("lastStreakDate");
let streak=parseInt(localStorage.getItem("streak"))||0;

if(lastDate===today){
alert("You already updated streak today!");
return;
}

streak++;
localStorage.setItem("streak",streak);
localStorage.setItem("lastStreakDate",today);
loadStreak();
}

if(localStorage.getItem("logged")==="true"){
openDashboard();
}
