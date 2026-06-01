
const airports=[
 {iata:'BKK',icao:'VTBS',name:'Suvarnabhumi Airport',city:'Bangkok',country:'Thailand'},
 {iata:'SYD',icao:'YSSY',name:'Sydney Airport',city:'Sydney',country:'Australia'},
 {iata:'FRA',icao:'EDDF',name:'Frankfurt Airport',city:'Frankfurt',country:'Germany'}
];
document.getElementById('search').addEventListener('input',e=>{
 const v=e.target.value.toUpperCase();
 const a=airports.find(x=>x.iata===v);
 document.getElementById('result').innerHTML=a?
 `${a.name}<br>IATA: ${a.iata}<br>ICAO: ${a.icao}<br>${a.city}, ${a.country}`
 :'No match';
});
