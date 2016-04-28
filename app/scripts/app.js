/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  
  // Sets app default base URL
  app.baseUrl = '/';
  if (window.location.port === '') {  // if production
    // Uncomment app.baseURL below and
    // set app.baseURL to '/your-pathname/' if running from folder in production
    // app.baseUrl = '/polymer-starter-kit/';
  }

  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
      Polymer.dom(document).querySelector('#caching-complete').show();
    }
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
  });

function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}

  // See https://github.com/Polymer/polymer/issues/1381
window.addEventListener('WebComponentsReady', function() {
     var tripResults = document.querySelector('#results');
    // Get Train Stops to datalist
    get('../data/stops.txt').then(function(response) {
      //console.log("Success!", response.split(/(\r\n|\n)/));
      var stop_list = response.split(/(\r\n|\n)/);
      var re = /,/;
      var headers = stop_list.shift().split(re);
      var index = headers.indexOf("stop_name");
      //Removing [index] at return val.split(re)[index]; should return an array of arrays of each split value
      var res = stop_list.map(function(val, key) {
        return val.split(re)[index];
      }).filter(Boolean);

       var str = '';
        var i;
        for (i = 0; i < res.length; i++) {
           str += '<option value="'+res[i]+'" />';
        }
        var s_list=document.getElementById("slist");
        s_list.innerHTML = str;
    }, function(error) {
      console.error("Failed!", error);
    });

    /*get('../data/routes.txt').then(function(response) {
      //console.log("Success!", response.split(/(\r\n|\n)/));
      var trips_list = response.split(/(\r\n|\n)/);
      if(Array.isArray(trips_list)) {
        console.log('true');
      } else {
        console.log('Not An Array')
      }
      
      var re = /,/;
      var headers = trips_list.shift().split(re);
      var mainArray = trips_list.map(function(val, key) {
        return val.split(re);
      }).filter(Boolean);
      console.log(JSON.stringify(trips_list, null, 4));
       var tripstr = '';
        var i;
        for (i = 0; i < mainArray.length; i++) {
          // tripstr += '<div class="tripper"><b>RID:</b> <em>'+ss+'</div>';
        }

        tripResults.innerHTML = tripstr;
        //console.log(tripstr);
    }, function(error) {
      console.error("Failed!", error);
    });*/
   var stoptimesArray = [];


   function doRoutes(data) {
      var tripstr = '';
      var routes = '{ "routes": '+JSON.stringify(data, null, 4)+' }';
      var obj = JSON.parse(routes);
    console.log(obj);
     var i;
    var out = "";

    for(i = 0;i<obj.routes.length;i++) {
        out +=  obj.routes[i].route_long_name;
    }
    //tripResults.innerHTML = out; 
            
    }

    function parseRoutes(url, callBack) {
        Papa.parse(url, {
            download: true,
            dynamicTyping: true,
            header: true,
            complete: function(results) {
                callBack(results.data);
            }
        });
    }

    parseRoutes("../data/routes.txt", doRoutes);

     function doTrips(data) {
      var tripstr = '';
      var trips = '{ "trips": '+JSON.stringify(data, null, 4)+' }';
      var obj = JSON.parse(trips);
  

     var i;
    var out = "";

    for(i = 0;i<obj.trips.length;i++) {
        out +=  obj.trips[i].trip_id;
    }
    //tripResults.innerHTML = out; 
      
    }

    function parseTrips(url, callBack) {
        Papa.parse(url, {
            download: true,
            dynamicTyping: true,
            header: true,
            complete: function(results) {

                callBack(results.data);

            }
        });
    }

    parseTrips("../data/trips.txt", doTrips);

    function doStopTimes(data) {
      var tripstr = '';
      var stoptimes = '{ "stoptimes": '+JSON.stringify(data, null, 4)+' }';
      //console.log(data);

      var obj = JSON.parse(stoptimes);


    
     var i;
    var out = "";
    /*<paper-material elevation="1" class="train"><div><div class="train-pic">
                   <iron-image alt="The train logo." src="./images/1.jpg"></iron-image>
                </div>
                <div class="train-info">
                   <h1>This is another train.</h1>
                   <p>Redistributions of source code must retain the above copyright
                notice, this list of conditions and the following disclaimer.</p>
                   <span><iron-icon icon="schedule"></iron-icon> 2015-01-02T11:42:13</span>
                    ~ 
                   <span><iron-icon icon="schedule"></iron-icon> 2015-01-02T11:42:13</span>
                </div>
                 <div class="train-price">
                    <div>
                       Price
                       $ 20
                    </div>
                    <paper-button raised class="custom green">Book</paper-button>
                 </div>
                 <div class="clearfix"></div>
                 </div>
              </paper-material>
    */
    for(i = 0;i<20;i++) {
      if(obj.stoptimes[i].arrival_time != '' && obj.stoptimes[i].departure_time != ''){
        var stopID = obj.stoptimes[i].stop_id;
        var DepTime = obj.stoptimes[i].departure_time;
        var ArrivTime = obj.stoptimes[i].arrival_time;
        var stopHeadsign = obj.stoptimes[i].stop_headsign;
        out +=  obj.stoptimes[i].stop_headsign;
        out +='<paper-material elevation="1" class="train"><div><div class="train-pic">';
        out +='<iron-image alt="The train logo." src="./images/1.jpg"></iron-image></div><div class="train-info">';
        out +='<h1>'+obj.stoptimes[i].stop_id+'</h1>';
        out +='<p>Trip Description</p>';
        out +='<span><iron-icon icon="schedule"></iron-icon> '+obj.stoptimes[i].departure_time+'</span>';
        out +=' ~ <span><iron-icon icon="schedule"></iron-icon> '+obj.stoptimes[i].arrival_time+'</span></div>';
        out +='<div class="train-price"><div> Fare $20</div>';
        out +='<paper-button raised class="custom green">Book</paper-button></div>';
        out +='<div class="clearfix"></div> </div> </paper-material>';
        
      }
    }
    tripResults.innerHTML = out; 
            
    }

    function parseStopTimes(url, callBack) {
        Papa.parse(url, {
            download: true,
            dynamicTyping: true,
            header: true,
            complete: function(results) {
              stoptimesArray.push(results);
              callBack(results.data);
              //console.log(stoptimesArray); 
              console.log(results.data.slice(0));
            }
        });
    }

    parseStopTimes("../data/stop_times.txt", doStopTimes);

    

   //IndexedDB
   var dbPromise = idb.open('tester', 1, function(upgradeDb) {
    var keyValStore = upgradeDb.createObjectStore('keyval');
    keyValStore.put(28, 'age');
   });
   
   //read IndexedDb
   dbPromise.then(function(db) {
    var tx = db.transaction('keyval');
    var keyValStore = tx.objectStore('keyval');
    return keyValStore.get('age');
   }).then( function(val) {
    console.log('The value of "age" is: ', val);

   });

   // Add another value
   dbPromise.then(function(db) {
    var tx = db.transaction('keyval', 'readwrite');
    var keyValStore = tx.objectStore('keyval');
    keyValStore.put('Obasi', 'Name');
    return tx.complete;
   }).then(function() {
    console.log('Added name:Obasi to keyval');
   });

   dbPromise.then(function(db) {
    var tx = db.transaction('keyval', 'readwrite');
    var keyValStore = tx.objectStore('keyval');
    keyValStore.put('dog', 'favoriteAnimal');
    return keyValStore.get('favoriteAnimal');
   }).then(function(val) {
     console.log('Favorite Animal is:', val);
   })
 
});



  // Main area's paper-scroll-header-panel custom condensing transformation of
  // the appName in the middle-container and the bottom title in the bottom-container.
  // The appName is moved to top and shrunk on condensing. The bottom sub title
  // is shrunk to nothing on condensing.
  window.addEventListener('paper-header-transform', function(e) {
    var appName = Polymer.dom(document).querySelector('#mainToolbar .app-name');
    var middleContainer = Polymer.dom(document).querySelector('#mainToolbar .middle-container');
    var bottomContainer = Polymer.dom(document).querySelector('#mainToolbar .bottom-container');
    var detail = e.detail;
    var heightDiff = detail.height - detail.condensedHeight;
    var yRatio = Math.min(1, detail.y / heightDiff);
    // appName max size when condensed. The smaller the number the smaller the condensed size.
    var maxMiddleScale = 0.50;
    var auxHeight = heightDiff - detail.y;
    var auxScale = heightDiff / (1 - maxMiddleScale);
    var scaleMiddle = Math.max(maxMiddleScale, auxHeight / auxScale + maxMiddleScale);
    var scaleBottom = 1 - yRatio;

    // Move/translate middleContainer
    Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);

    // Scale bottomContainer and bottom sub title to nothing and back
    Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);

    // Scale middleContainer appName
    Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
  });

  // Scroll page to top and expand header
  app.scrollPageToTop = function() {
    app.$.headerPanelMain.scrollToTop(true);
  };

  app.closeDrawer = function() {
    app.$.paperDrawerPanel.closeDrawer();
  };

})(document);
