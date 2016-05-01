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
  // Get firebase data 
  var fireStopTimes = new Firebase("https://transappx.firebaseio.com/stoptimes");
  var fireTrips = new Firebase("https://transappx.firebaseio.com/trips");
          /*fireBaseRef.once("value", function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key();
            var childData = childSnapshot.val();
            var eTripID = childSnapshot.val().trip_id;
              console.log(eTripID);
          });
        });*/
fireStopTimes.on('value', function (snapshot) {
    var tripId = snapshot.val().trip_id; // line 1 (results like 1,2,3,4,5,6)
    fireTrips.child('trips').child(tripId).once('value', function(mediaSnap) {
        console.log(tripId + ":" + mediaSnap.val().trip_headsign);
    });
});

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
