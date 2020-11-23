import * as router from 'aws-lambda-router'

export const handler = router.handler({
  proxyIntegration: {
    routes: [
      {
        // request-path-pattern with a path variable:
        path: '/zipsearch/:zipcode',
        method: 'GET',
        // we can use the path param 'id' in the action call:
        action: (request, context) => {
          let zipcode = request.params.zipcode
          var zipCodeResp1 = []
          console.log(zipcode)
          jsonData.find(function (jsonData) {
            if (jsonData['zip'] == zipcode) {
              zipCodeResp1 = jsonData
            }
          })
          if (zipCodeResp1.length == 0) {
            for (i = 0; i < jsonData.length; i++) {
              if (jsonData[i].zip.startsWith(request.params.zipcode)) {
                console.log('second if', req.params.zipcode)
                zipCodeResp1.push(jsonData[i])
              }
            }
          }
          return zipCodeResp1
        }
      },
      {
        // request-path-pattern with a path variable in Open API style:
        path: '/city/:cityname',
        method: 'GET',
        // we can use the path param 'id' in the action call:
        action: (request, context) => {
          var findCity = []
          let cityname = request.params.cityname
          console.log(cityname)
          jsonData.find(function (jsonData) {
            if (
              jsonData['primary_city'].toLowerCase() == cityname.toLowerCase()
            ) {
              findCity = jsonData
            //   return jsonData
            }
          })

          if (findCity.length == 0) {
            for (i = 0; i < jsonData.length; i++) {
              if (
                jsonData[i].primary_city
                  .toLowerCase()
                  .startsWith(req.params.cityname.toLowerCase())
              ) {
                console.log('second city', request.params.cityname)
                findCity.push(jsonData[i])
              }
            }
          }
          return findCity
        }
      },
      {
          // request-path-pattern with a path variable in Open API style:
          path: '/position/:latitude/:longitude',
          method: 'GET',
          // we can use the path param 'id' in the action call:
          action: (request, context) => {
            let latitude = req.params.latitude
            let longitude =req.params.longitude
            console.log(latitude, longitude)
            var findPostion = jsonData.find(function (jsonData) {
              if (jsonData['latitude'] == latitude && jsonData['longitude'] == longitude) {
                return jsonData      
              }
            })
              
          }
      }
    ]
  }
})
