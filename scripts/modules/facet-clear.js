define(['modules/jquery-mozu', 'modules/api'], function($, api) {

 return function makeClearUrl(url, facetField) {
            // var facetField = e.target.id;
            // console.log("URL INS : "+ url + "Facet field : "+facetField);
            var uri_enc = decodeURIComponent(url);
            // console.log("Decoded URL : "+uri_enc);
            var finalURL = uri_enc;
            if(uri_enc.indexOf("=") >= 0) { 
                var params = uri_enc.split("=");
                var deprecateVals = params[1].split(",");
                var baseURl = params[0];
                // console.log("baseURL : "+baseURl);

                var newParams="";
                var count = 0;
                for(var i = 0; i < deprecateVals.length; i++)
                {
                    // console.log("deprecateVals : "+deprecateVals[i]);
                   if(deprecateVals[i].indexOf(facetField) == -1 ) {
                        if(i>0 && i < deprecateVals.length)
                            newParams = newParams+",";
                        // console.log(deprecateVals[i]);
                        newParams = newParams+deprecateVals[i];
                   }
                }
                newParams = newParams.replace(/^,|,$/g,'');
                finalURL = baseURl+"="+newParams;
                // Set directory URI as the redirection URL if no filters is present
                if(finalURL.split("=")[1] === '')
                   finalURL = finalURL.split("?")[0];
                
            }
            finalURL = encodeURI(finalURL);
            return finalURL;            
        };
    });