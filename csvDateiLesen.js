const fs = require('fs');
const {parse} = require('csv-parser');
const readline = require('readline');


// Pfad zur CSV-Datei
const csvFilePath = './pvwatts_hourly.csv';


// Erstellen Sie eine Datei-Stream
fs.createReadStream('./pvwatts_hourly.csv','utf-8')
  .pipe(parse({ headers: true }))
  .on('data', (row) => {
    console.log(row); // Do something with each row
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
// Erstellen Sie ein readline-Interface
const rline = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity // das Trennzeichen auf den Systemstandard setzen
  });

 //let [monat,tag,stunde]= getCurrentTime();
// getErzeugtenStrom(rline,monat,tag,stunde);

  function getErzeugtenStrom(readline,monat,tag,stunde){


      // Einlesen der CSV-Datei
      let lineNumber = 0; // Nummer der aktuellen Zeile
      // Event-Listener, der bei jeder Zeile der CSV-Datei aufgerufen wird
      readline.on('line', (line) => {
      lineNumber++;
      console.log(lineNumber);



      if(lineNumber == 2977){

        console.log(line[1]+'/'+line[5]+'/'+line[9]);

       // console.log(line[1] == monat && line[5] == tag && line[9] == stunde);
        if(line[1] == monat && line[5] == tag && line[9] == stunde){
          console.log(line[1]+'/'+line[5]+'/'+line[9]);
  
        }
     }

   
        csv.parse(line, (err, output) => {
        if (err) throw err;



       
          //console.log(output[0][0]+'/'+ output[0][1] +'/'+ output[0][2] == 21)


       

        if(output[0][0] == 5 && output[0][1] == 4 && output[0][2] == 21){

            console.log(output);
            console.log(`Monat --> ${monat}\nTag --> ${tag}\nStunde --> ${stunde}\n`)


        }
      });

    rline.close();
 // }
});
}

function getCurrentTime(){


  let jetzt = new Date();
  let monat = jetzt.getMonth() + 1; // Januar ist 0, daher muss 1 hinzugefügt werden
  let tag = jetzt.getDate();
  let stunde = jetzt.getHours();


  return [monat,tag,stunde];

}
/*



fs.readFile('./pvwatts_hourly.csv', 'utf8', (err, data) => {
    if (err) throw err;
  
    csv.parse(data, (err, output) => {
      if (err) throw err;
  
      console.log(output);
    });
  });


*/

