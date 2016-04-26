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

    /*get('../data/trips.txt').then(function(response) {
      //console.log("Success!", response.split(/(\r\n|\n)/));
      var trips_list = response.split(/(\r\n|\n)/);
      if(Array.isArray(trips_list)) {
        console.log('true');
      } else {
        console.log('Not An Array')
      }
      var re = /,/;
      var headers = trips_list.shift().split(re);
      var route_id = headers.indexOf("route_id");
      var service_id = headers.indexOf("service_id");
      var trip_id = headers.indexOf("trip_id");
      var trip_headsign = headers.indexOf("trip_headsign");
      var mainArray = trips_list.map(function(val, key) {
        return val.split(re);
      }).filter(Boolean);
    
      var trip_id = headers.indexOf("trip_id");
      var tripid = trips_list.map(function(val, key) {
        return val.split(re)[trip_id];
      }).filter(Boolean);

       var service_id = headers.indexOf("service_id");
      var serviceid = trips_list.map(function(val, key) {
        return val.split(re)[service_id];
      }).filter(Boolean);

      var route_id = headers.indexOf("route_id");
      var routeid = trips_list.map(function(val, key) {
        return val.split(re)[route_id];
      }).filter(Boolean);


       var tripstr = '';
        var i;
        for (i = 0; i < mainArray.length; i++) {
           tripstr += '<div class="tripper"><b>RID:</b> <em>'+routeid[i]+'</div>';
        }

        tripResults.innerHTML = tripstr;
        //console.log(tripstr);
    }, function(error) {
      console.error("Failed!", error);
    });
 */


   function doStuff(data) {
      var tripstr = '';
        //Data is usable her
       // console.log(data);
       for (var prop in data) {
        if(data.hasOwnProperty( prop ) ) {
          console.log("obj." + prop + " = " + data[prop]);
          console.log(data.route_id);
        } 
      }

      

      
            tripResults.innerHTML = tripstr;
    }

    function parseData(url, callBack) {
        Papa.parse(url, {
            download: true,
            dynamicTyping: true,
            header: true,
            complete: function(results) {
                callBack(results.data);
            }
        });
    }

    parseData("../data/routes.txt", doStuff);
 
    


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
