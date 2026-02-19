function switchScreen(id){
document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
document.getElementById(id).classList.add('active');
}

function toggleMenu(){
document.getElementById("sideMenu").classList.toggle("active");
}

function register(){
let username=document.getElementById("username").value;
let password=document.getElementById("password").value;
let age=document.getElementById("age").value;
let gender=document.getElementById("gender").value;
let study=document.getElementById("study").value;

if(username===""||password===""||age===""){
alert("Fill all details");
return;
}

localStorage.setItem("profile",JSON.stringify({
username,password,age,gender,study
}));

localStorage.setItem("streak",0);
localStorage.setItem("lastStreak","");
alert("Registered successfully!");
switchScreen("login");
}

function login(){
let username=document.getElementById("loginUser").value;
let password=document.getElementById("loginPass").value;
let profile=JSON.parse(localStorage.getItem("profile"));

if(profile && username===profile.username && password===profile.password){
localStorage.setItem("logged","true");
openDashboard();
}else{
alert("Invalid username or password");
}
}

function openDashboard(){
switchScreen("dashboard");
let profile=JSON.parse(localStorage.getItem("profile"));
document.getElementById("welcomeText").innerText="Welcome "+profile.username;
showQuote();
loadTasks();
loadStreak();
}

function logout(){
localStorage.setItem("logged","false");
location.reload();
}

function showQuote(){
let quotes=[
"Stay consistent.",
"Focus beats motivation.",
"Discipline creates success.",
"Small steps daily.",
"Your future self is watching."
];
let random=quotes[Math.floor(Math.random()*quotes.length)];
document.getElementById("quote").innerText=random;
}

function addTask(){
let task=document.getElementById("taskInput").value;
if(task==="") return;

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
tasks.push({task,done:false});
localStorage.setItem("tasks",JSON.stringify(tasks));
document.getElementById("taskInput").value="";
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
span.innerText=t.task;

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

function loadStreak(){
let streak=parseInt(localStorage.getItem("streak"))||0;
document.getElementById("streakText").innerText=streak+" days";
}

function markStudied(){
let today=new Date().toDateString();
let last=localStorage.getItem("lastStreak");
let streak=parseInt(localStorage.getItem("streak"))||0;

if(last===today){
alert("Already updated today!");
return;
}

streak++;
localStorage.setItem("streak",streak);
localStorage.setItem("lastStreak",today);
loadStreak();
}

if(localStorage.getItem("logged")==="true"){
openDashboard();
}
