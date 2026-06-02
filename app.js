
let airports=[];
const statusDiv=document.getElementById('status');
const result=document.getElementById('result');
const search=document.getElementById('search');

function getLocalTime(offsetHours){
 try{
   const d=new Date(Date.now()+offsetHours*3600000);
   return d.toISOString().substring(11,16);
 }catch(e){return '-';}
}

fetch('./airports.json')
.then(r=>r.json())
.then(data=>{
 airports=data;
 statusDiv.innerHTML='Loaded '+airports.length.toLocaleString()+' airports';
});

search.addEventListener('input',()=>{
 const q=search.value.trim().toLowerCase();

 if(q.length<2){
   result.innerHTML='';
   return;
 }

 const matches=airports.filter(a=>
   (a.iata||'').toLowerCase().includes(q) ||
   (a.icao||'').toLowerCase().includes(q) ||
   (a.name||'').toLowerCase().includes(q) ||
   (a.city||'').toLowerCase().includes(q)
 ).slice(0,20);

 result.innerHTML=matches.map(a=>{
   const maps='https://maps.apple.com/?ll='+a.lat+','+a.lon;

   return `<div class="card">
   <div><strong>${a.iata}</strong> | ${(a.city||'-').toUpperCase()} | ${a.country}</div><br>
   ${a.name}<br><br>
   ICAO : ${a.icao||'-'}<br>
   LAT/LON : ${a.lat}, ${a.lon}<br>
   <span class="time">LOCAL TIME : Based on airport timezone support in next data release</span><br><br>
   <a href="${maps}" target="_blank">OPEN IN APPLE MAPS</a>
   </div>`;
 }).join('');
});

if('serviceWorker' in navigator){
 window.addEventListener('load',()=>{
   navigator.serviceWorker.register('./sw.js');
 });
}
