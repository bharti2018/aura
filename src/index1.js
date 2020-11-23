// lambda-like handler function
module.exports.handler = async event => {
  // do stuff...
};

const express = require('express')
const jsonData = require('./data.json')
const app = express()

// var zipCodeResp = {}

app.get('/zipsearch/:zipcode', function(req,res){
  let zipcode = req.params.zipcode
  var zipCodeResp1 = []
  console.log(zipcode)
    jsonData.find(function (jsonData) {
    if (jsonData['zip'] == zipcode) {
      zipCodeResp1 = jsonData
      return zipCodeResp1      
    }
  })  
    if(zipCodeResp1.length == 0){    
    for(i=0;i<jsonData.length;i++){
      if((jsonData[i].zip).startsWith(req.params.zipcode)){
        console.log("second if", req.params.zipcode)        
        zipCodeResp1.push(jsonData[i])
      }
    }
  }
  res.status(200).send(zipCodeResp1)

})

app.get('/city/:cityname', function(req,res){
  var findCity = []
  let cityname = req.params.cityname
  console.log(cityname)
  jsonData.find(function (jsonData) {
    if (jsonData['primary_city'].toLowerCase() == cityname.toLowerCase()) {
      findCity = jsonData
      return jsonData      
    }
  })

  if(findCity.length == 0){    
    for(i=0;i<jsonData.length;i++){
      if((jsonData[i].primary_city).toLowerCase().startsWith(req.params.cityname.toLowerCase())){
        console.log("second city", req.params.cityname)        
        findCity.push(jsonData[i])
      }
    }
  }
  res.status(200).send(findCity)

})

app.get('/position/:latitude/:longitude', function(req,res){
  let latitude = req.params.latitude
  let longitude =req.params.longitude
  console.log(latitude, longitude)
  var findPostion = jsonData.find(function (jsonData) {
    if (jsonData['latitude'] == latitude && jsonData['longitude'] == longitude) {
      return jsonData      
    }
  })
  res.status(200).send(findPostion)

})

app.listen(3000)