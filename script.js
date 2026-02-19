/* MY DATES SECTION */

function saveResult(){
let subject=document.getElementById("resultSubject").value;
let type=document.getElementById("resultType").value;
let marks=document.getElementById("resultMarks").value;

if(!subject||!type||!marks){
alert("Fill all fields");
return;
}

let results=JSON.parse(localStorage.getItem("results"))||[];
results.push({subject,type,marks});
localStorage.setItem("results",JSON.stringify(results));

document.getElementById("resultSubject").value="";
document.getElementById("resultType").value="";
document.getElementById("resultMarks").value="";

loadResults();
showResultMotivation(marks);
}

function loadResults(){
let results=JSON.parse(localStorage.getItem("results"))||[];
let list=document.getElementById("resultList");
list.innerHTML="";

results.forEach(r=>{
let li=document.createElement("li");
li.innerText=r.subject+" - "+r.type+" : "+r.marks+" marks";
list.appendChild(li);
});
}

function showResultMotivation(marks){
marks=parseInt(marks);

if(marks>=80){
alert("Excellent work! Keep pushing forward 🚀");
}else if(marks>=50){
alert("Good job! You can improve even more 💪");
}else{
alert("Don’t give up! Every setback is a setup for a comeback 🔥");
}
}

function saveExam(){
let subject=document.getElementById("examSubject").value;
let date=document.getElementById("examDate").value;

if(!subject||!date){
alert("Fill all fields");
return;
}

let exams=JSON.parse(localStorage.getItem("exams"))||[];
exams.push({subject,date});
localStorage.setItem("exams",JSON.stringify(exams));

document.getElementById("examSubject").value="";
document.getElementById("examDate").value="";

loadExams();
}

function loadExams(){
let exams=JSON.parse(localStorage.getItem("exams"))||[];
let list=document.getElementById("examList");
list.innerHTML="";

exams.forEach(e=>{
let li=document.createElement("li");
li.innerText=e.subject+" - "+e.date;
list.appendChild(li);
});
}

/* Load when opening My Dates */
document.getElementById("myDates").addEventListener("click",function(){
loadResults();
loadExams();
});
