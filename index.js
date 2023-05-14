// read.js
const fs = require('fs');
const readline = require('readline')

const express = require('express')

const app = express();

app.get("/daten",(request, response) =>  {


  console.log(request.protocol)

  response.send(heutevor +''+ morgenvor+'');



});
app.listen(5000);



let heutevor=0,morgenvor=0,ubermorgenvor=0

function getProducedElecInCurrentHour() {
   //let data = '';
   let counter = 0;

   const readStream = fs.createReadStream('pvwatts_hourly.csv', 'utf-8');
            let rl = readline.createInterface({input: readStream});
            rl.on('line', (line) => {



            let monat = line.split(',')[0];
            let tag = line.split(',')[1];
            let stunde = line.split(',')[2];
            let [currMonat,currTag,currStunde] = getCurrentTime();


             if (line.split(',')[0] == currMonat && line.split(',')[1] == currTag ) {  //&& line.split(',')[2] == currStunde
                console.log(monat + '/' + tag+ '/' + stunde);
                console.log(line.split(',')[10]);
                 heutevor = line.split(',')[10];
                }
                if (line.split(',')[0] == currMonat && line.split(',')[1] == currTag +1 ) { //&& line.split(',')[2] == currStunde
                  console.log(monat + '/' + tag+ '/' + stunde);
                  console.log(line.split(',')[10]);
                   morgenvor = line.split(',')[10];
                  }
                  if (line.split(',')[0] == currMonat && line.split(',')[1] == currTag+2 ) {//&& line.split(',')[2] == currStunde
                    console.log(monat + '/' + tag+ '/' + stunde);
                    console.log(line.split(',')[10]);
                     ubermorgenvor = line.split(',')[10];
                    }
                                    });


                                    return [heutevor,morgenvor,ubermorgenvor];


            rl.on('close', () => {
                console.log(`About ${counter} areas have geographic units of over 200 units in 2020`)
                console.log('Data parsing completed');
            });
  
            readStream.on('error', (error) => console.log(error.message));
  readStream.on('data', (chunk) =>{
    
  // console.log(chunk)
});
  readStream.on('end', () => console.log('Reading complete'));
};



function getProducedElecInvorhersage(monatparam,tagparam,stundeparam) {
  //let data = '';
  let counter = 0;

  const readStream = fs.createReadStream('pvwatts_hourly.csv', 'utf-8');
           let rl = readline.createInterface({input: readStream});
           rl.on('line', (line) => {



           let monat = line.split(',')[0];
           let tag = line.split(',')[1];
           let stunde = line.split(',')[2];
          // let [currMonat,currTag,currStunde] = getCurrentTime();
            if (line.split(',')[0] == monatparam && line.split(',')[1] == tagparam && line.split(',')[2] == stundeparam) {
               console.log(monat + '/' + tag+ '/' + stunde);
               console.log(line.split(',')[10]);
               return line.split(',')[10];
               }
                                   });
           rl.on('close', () => {
               console.log(`About ${counter} areas have geographic units of over 200 units in 2020`)
               console.log('Data parsing completed');
           });
 
           readStream.on('error', (error) => console.log(error.message));
 readStream.on('data', (chunk) =>{
   
 // console.log(chunk)
});
 readStream.on('end', () => console.log('Reading complete'));
};


function getCurrentTime(){


    let jetzt = new Date();
    let monat = jetzt.getMonth() + 1; // Januar ist 0, daher muss 1 hinzugefügt werden
    let tag = jetzt.getDate();
    let stunde = jetzt.getHours();
  
  
    return [monat,tag,stunde];
  
  }

  //let dc = setInterval(getProducedElecInCurrentHour, 3600000/60/30);
  let [heute,morgen,ubermorgen] =  getProducedElecInCurrentHour();
 // let vorhessage = getProducedElecInvorhersage(6,7,10);

  
  //getProducedElecInCurrentHour();