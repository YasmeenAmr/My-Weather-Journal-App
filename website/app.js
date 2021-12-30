 /*const { get } = require("http");*/

/* Global Variables */
const myPersonalKey='221fa2415e8c9a12e3e1b9059e2655ea';
const generating=document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


/* Adding click event  to the button generate to generate weather degree of zip code area  
and date of current date and feelings in UI */
generating.addEventListener('click',async()=>
{ console.log("hi");
  const zipC = document.getElementById('zip').value;
  const apiUrl=`https://api.openweathermap.org/data/2.5/weather?zip=${zipC}&appid=${myPersonalKey}&units=metric`;
  try{
     getweatherandpost(apiUrl)//pathing full api url which is contan (api + zip code + key) 
     }
  catch (error){
    console.log("error", error);
     }   
})


/* Getting weather degree by fetching  full api url and save it in to server 
then get it from server to update UI */ 
const getweatherandpost= async(myurl='')=>{
  const feel = document.getElementById('feelings').value;
  //fetching full api url (api + zip code + key) to get weather degree in json format
  const weather = await fetch(myurl)
      console.log(weather);
        const degree = await weather.json();
        console.log(degree)
        const tempdegree=Math.round(degree.main.temp)+' C';
        console.log(tempdegree);
  //adding all data in object       
         const postob = {
           date:newDate,
           temp:tempdegree,
           content:feel,
         }
  //posting this object in server        
    await fetch('/postall',{
          method: 'POST', 
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
          }, 
          body: JSON.stringify(postob),
       });
  //getting this object from server     
    const resGet = await fetch('/getall');
    const dataFromserver=await resGet.json();
    console.log(dataFromserver);
  //using it to update UI elements by equalling them 
    document.getElementById('date').innerHTML = dataFromserver.date ;
    document.getElementById('temp').innerHTML = dataFromserver.temp ;
    document.getElementById('content').innerHTML = dataFromserver.content ;
}

