const express = require("express");
const cheerio = require("cheerio");
const PORT = 4000 ;
const app = express() ;

const url = 'https://www.moneycontrol.com/personal-finance/investing/';

   const myFUN = async () =>{
    try{
        const response = await fetch(url);
        const data = await response.text();
        console.log(typeof data);
        const $ = cheerio.load(data);
        const dataimp = $('.news_heading',data);
        let scrappedData = [];
        dataimp.each((i,ele)=>{
            const heading = $(ele).text();
            const link = $(ele).find('a').attr('href');
            scrappedData.push({
                heading:heading,
                link:link
            })
        })
        console.log(scrappedData);
      
        
   }catch(err){
       console.log(err);
      
   }
   }
  
   myFUN();


app.get('/',async(req,res)=>{
    
        try{
            const response = await fetch(url);
            const data = await response.text();
            console.log(typeof data);
            const $ = cheerio.load(data);
            const dataimp = $('.news_heading',data);
            let scrappedData = [];
            dataimp.each((i,ele)=>{
                const heading = $(ele).text();
                const link = $(ele).find('a').attr('href');
                scrappedData.push({
                    heading:`${heading}`,
                    link:`${link}`
                })
            })
            const jsonString = JSON.stringify(scrappedData, null, 2); // The second argument adds indentation for readability
            res.end(jsonString);
          
            
       }catch(err){
           res.end(err);
          
       }
       
      
})


app.listen(PORT,'localhost',()=>{
    console.log(`server running in http://localhost:${PORT}`);

})