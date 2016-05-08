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
/*function doRoutes(data) {
      var tripstr = '';
      var routes = '{ "routes": '+JSON.stringify(data, null, 4)+' }';
      var obj = JSON.parse(routes);
    //console.log(obj);
     

     var i;
    var out = "";
    var fireBaseRefInfo = new Firebase("https://transappx.firebaseio.com");
    var routesRef = fireBaseRefInfo.child("routes");
        routesRef.set(null);
    for(i = 0;i<obj.routes.length;i++) {
        out +=  obj.routes[i].route_long_name;

        if(obj.routes[i].route_id != ''){

        routesRef.child(obj.routes[i].route_id).set({
              route_id: obj.routes[i].route_id,
              route_short_name: obj.routes[i].route_short_name,
              route_long_name: obj.routes[i].route_long_name,
              route_type: obj.routes[i].route_type,
              route_color: obj.routes[i].route_color
            }, function(error) {
            if (error) {
              alert("Data could not be saved." + error);
              //estatus.innerHTML ='<div class="error">Data could not be saved '+error+'</div>';
            } else {
              app.$.toast.text = 'Routes Created Successfully!';
              app.$.toast.show();
      }
    });


      }


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
  

    
    var fireBaseRefInfo = new Firebase("https://transappx.firebaseio.com");
    var tripsRef = fireBaseRefInfo.child("trips");
        tripsRef.set(null);
    var i;
    var out = "";
    for(i = 0;i<obj.trips.length;i++) {
        out +=  obj.trips[i].trip_id;


        if(obj.trips[i].route_id != ''){
        tripsRef.child(obj.trips[i].trip_id).set({
              trip_id: obj.trips[i].trip_id,
              route_id: obj.trips[i].route_id,
              service_id: obj.trips[i].service_id,
              trip_headsign: obj.trips[i].trip_headsign,
              trip_short_name: obj.trips[i].trip_short_name,
              direction_id: obj.trips[i].direction_id,
              shape_id: obj.trips[i].shape_id,
              wheelchair_accessible: obj.trips[i].wheelchair_accessible,
              bikes_allowed: obj.trips[i].bikes_allowed
            }, function(error) {
            if (error) {
              alert("Data could not be saved." + error);
              //estatus.innerHTML ='<div class="error">Data could not be saved '+error+'</div>';
            } else {
              app.$.toast.text = 'trips Created Successfully!';
              app.$.toast.show();
          }
        });


      }

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

   

function doStops(data) {
      var stops = '{ "stops": '+JSON.stringify(data, null, 4)+' }';
      var obj = JSON.parse(stops);

       var fireBaseRefInfo = new Firebase("https://transappx.firebaseio.com");
        var stopsRef = fireBaseRefInfo.child("stops");
            stopsRef.set(null);
        var i;
        var out = "";
        for(i = 0;i<obj.stops.length;i++) {
            out +=  obj.stops[i].trip_id;
        if(obj.stops[i].stop_id != ''){
    
        stopsRef.child(obj.stops[i].stop_id).set({
              stop_id: obj.stops[i].stop_id,
              stop_code: obj.stops[i].stop_code,
              stop_name: obj.stops[i].stop_name,
              stop_lat: obj.stops[i].stop_lat,
              stop_lon: obj.stops[i].stop_lon,
              location_type: obj.stops[i].zone_id,
              stop_url: obj.stops[i].stop_url,
              location_type: obj.stops[i].location_type,
              parent_station: obj.stops[i].parent_station,
              platform_code: obj.stops[i].platform_code,
              wheelchair_boarding: obj.stops[i].wheelchair_boarding
            }, function(error) {
            if (error) {
              alert("Data could not be saved." + error);
              //estatus.innerHTML ='<div class="error">Data could not be saved '+error+'</div>';
            } else {
              app.$.toast.text = 'Stops Created Successfully!';
              app.$.toast.show();
          }
        });


        }

      }
    }
     function parseStops(url, callBack) {
        Papa.parse(url, {
            download: true,
            dynamicTyping: true,
            header: true,
            complete: function(results) {

                callBack(results.data);

            }
        });
    }
    parseStops("../data/stops.txt", doStops);


 function doStopTimes(data) {
      var stoptimes = '{ "stoptimes": '+JSON.stringify(data, null, 4)+' }';
      var obj = JSON.parse(stoptimes);

       var fireBaseRefInfo = new Firebase("https://transappx.firebaseio.com");
        var stoptimesRef = fireBaseRefInfo.child("stoptimes");
            stoptimesRef.set(null);
        var i;
        var out = "";
        for(i = 0;i<obj.stoptimes.length;i++) {
            out +=  obj.stoptimes[i].trip_id;
        if(obj.stoptimes[i].trip_id != ''){
        stoptimesRef.child(obj.stoptimes[i].stop_id).set({
              trip_id: obj.stoptimes[i].trip_id,
              arrival_time: obj.stoptimes[i].arrival_time,
              departure_time: obj.stoptimes[i].departure_time,
              stop_id: obj.stoptimes[i].stop_id,
              stop_sequence: obj.stoptimes[i].stop_sequence,
              pickup_type: obj.stoptimes[i].pickup_type,
              drop_off_type: obj.stoptimes[i].drop_off_type
            }, function(error) {
            if (error) {
              alert("Data could not be saved." + error);
              //estatus.innerHTML ='<div class="error">Data could not be saved '+error+'</div>';
            } else {
              app.$.toast.text = 'Stoptimes Created Successfully!';
              app.$.toast.show();
          }
        });


        }

      }
    }
     function parseStopTimes(url, callBack) {
        Papa.parse(url, {
            download: true,
            dynamicTyping: true,
            header: true,
            complete: function(results) {

                callBack(results.data);

            }
        });
    }
    parseStopTimes("../data/stop_times.txt", doStopTimes);
    */
    // get data
    var someStation = '70012';
    var anostation = '70262';
    var fb = new Firebase("https://transappx.firebaseio.com/");
    fb.child('stoptimes/'+someStation+'').once('value', function(stoptimesSnap) {
      fb.child('stoptimes/'+anostation+'').once('value', function(stoptimesSnap1) {
      fb.child('trips/'+stoptimesSnap.val().trip_id+'').once('value', function(tripSnap) {
      if(stoptimesSnap.val().trip_id != stoptimesSnap1.val().trip_id){
        tripResults.innerHTML = 'No routes found';
      } else {
        console.log(stoptimesSnap.val().trip_id);
       
        var ref = new Firebase("https://transappx.firebaseio.com/trips");
        ref.orderByChild("route_id").equalTo(tripSnap.val().route_id).on("child_added", function(snapshot) {
         console.log(snapshot.key());
         //snapshot.key().forEach(function(childSnapshot) {
          
              tripResults.innerHTML +=  '<paper-material elevation="1" class="train"><div><div class="train-pic"><iron-image alt="The train logo." src="./images/1.jpg"></iron-image></div><div class="train-info"><h1>'+snapshot.val().trip_id+'<br>'+someStation+' ~ '+anostation+'</h1><p>Redistributions of source code must retain the above copyrightnotice, this list of conditions and the following disclaimer.</p> <span><iron-icon icon="schedule"></iron-icon> '+stoptimesSnap.val().departure_time+'</span> ~ <span><iron-icon icon="schedule"></iron-icon> '+snapshot.val().arrival_time+'</span></div> <div class="train-price"><div> Price $ 20</div> <paper-button raised class="custom green">Book</paper-button></div><div class="clearfix"></div></div></paper-material>';
         // });
           
        });
      }
        console.log(stoptimesSnap.val().trip_id);
        //console.log(tripSnap.val().trip_id);
        console.log(stoptimesSnap1.val().trip_id);
     });
    });
    });
   /* var fireStopTimes = new Firebase("https://transappx.firebaseio.com/stoptimes");
    fireStopTimes.orderByChild("departure_time").limitToFirst(6).on("child_added", function(snapshot) 
       {
         
  var fb = new Firebase("https://transappx.firebaseio.com/");
  fb.child('stoptimes/'+snapshot.val().trip_id+'').once('value', function(stoptimesSnap) {
     fb.child('trips/'+snapshot.val().trip_id+'').once('value', function(tripSnap) {
      fb.child('routes/'+tripSnap.val().route_id+'').once('value', function(routesSnap) {
        fb.child('stops/'+stoptimesSnap.val().stop_id+'').once('value', function(stopSnap) {
         // extend function: https://gist.github.com/katowulf/6598238
         console.log( stoptimesSnap.val(), tripSnap.val() );
         tripResults.innerHTML += ' <paper-material elevation="1" class="train"><div><div class="train-pic"><iron-image alt="The train logo." src="./images/1.jpg"></iron-image></div><div class="train-info"><h1>'+routesSnap.val().route_long_name+'<br>'+tripSnap.val().trip_id+''+stopSnap.val().stop_name+' ~ '+tripSnap.val().trip_headsign+'</h1><p>Redistributions of source code must retain the above copyrightnotice, this list of conditions and the following disclaimer.</p> <span><iron-icon icon="schedule"></iron-icon> '+stoptimesSnap.val().departure_time+'</span> ~ <span><iron-icon icon="schedule"></iron-icon> '+stoptimesSnap.val().arrival_time+'</span></div> <div class="train-price"><div> Price $ 20</div> <paper-button raised class="custom green">Book</paper-button></div><div class="clearfix"></div></div></paper-material>';
     });
  });
   });
   });

});*/

  /*var refStopTimes = new Firebase("https://transappx.firebaseio.com/stoptimes");
  refStopTimes.orderByChild("departure_time").limitToFirst(2).on("child_added", function(snapshot) {

    console.log(snapshot.key() + " was " + snapshot.val().departure_time + " meters tall");
    var fireTrips = new Firebase("https://transappx.firebaseio.com/trips");
    fireTrips.orderByChild("trip_id").equalTo(snapshot.val().trip_id).on("child_added", function(snapshot) {
      console.log(snapshot.val().trip_id);
    });
    tripResults.innerHTML = ' <paper-material elevation="1" class="train"><div><div class="train-pic"><iron-image alt="The train logo." src="./images/1.jpg"></iron-image></div><div class="train-info"><h1>This is another train. ~ '+snapshot.val().trip_headsign+'</h1><p>Redistributions of source code must retain the above copyrightnotice, this list of conditions and the following disclaimer.</p> <span><iron-icon icon="schedule"></iron-icon> '+snapshot.val().departure_time+'</span> ~ <span><iron-icon icon="schedule"></iron-icon> '+snapshot.val().arrival_time+'</span></div> <div class="train-price"><div> Price $ 20</div> <paper-button raised class="custom green">Book</paper-button></div><div class="clearfix"></div></div></paper-material>';
  });*/


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
