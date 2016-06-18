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
     
    /* Get Train Stops to datalist
    get('../gtfs/stops.txt').then(function(response) {
      //console.log("Success!", response.split(/(\r\n|\n)/));
      var stop_list = response.split(/(\r\n|\n)/);
      var re = /,/;
      var headers = stop_list.shift().split(re);
      var index = headers.indexOf("stop_name"); 
      var indexID = headers.indexOf("stop_id");
      //Removing [index] at return val.split(re)[index]; should return an array of arrays of each split value
      
      var res = stop_list.map(function(val, key) {
          return val.split(re)[index];
          //return val.split(re)[index] ? val.split(re)[index] + ',' + val.split(re)[indexID] : '';
        })
        .filter(function(value, index, self) { 
          return self.indexOf(value) === index;
        });

       var str = '';
        var i;
        for (i = 1; i < res.length; i++) {
           str += '<option value="'+res[i].replace('Caltrain','')+'" />';
        }
        var s_list=document.getElementById("slist");
        s_list.innerHTML = str;
    }, function(error) {
      console.error("Failed!", error);
    });*/

var fromStation =document.getElementById("fromStation");
var toStation =document.getElementById("toStation");
var result = document.getElementById("results");
var xmlhttp = new XMLHttpRequest();
var url = "api.json";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var transapp = JSON.parse(xmlhttp.responseText);
        transappstops(transapp);
        runsearch(transapp);
    fromStation.addEventListener('change', function()
    {
      
        runsearch(transapp);
    });
    toStation.addEventListener('change', function()
    {
      runsearch(transapp);
        
    });
    }
    
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function transappstops(arr) {
    var str,
    strArr ;
    var i;

    for(i = 0; i < arr.length; i++) {
       str += '<option value="'+arr[i].stop_name.replace('Caltrain','')+'" />';
       strArr += '<option value="'+arr[i].arrival_name.replace('Caltrain','')+'" />';
    }

    var s_list=document.getElementById("slist");
    var a_list=document.getElementById("alist");
    s_list.innerHTML = str;
    a_list.innerHTML = strArr;
}

function timeToSeconds(hms){
       var a = hms.split(':'); // split it at the colons

       // minutes are worth 60 seconds. Hours are worth 60 minutes.
       var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
       return seconds;
     }
function secondstotime(secs)
{
    var t = new Date(1970,0,1);
    t.setSeconds(secs);
    var s = t.toTimeString().substr(0,8);
    if(secs > 86399)
      s = Math.floor((t - Date.parse("1/1/70")) / 3600000) + s.substr(2);
    return s;
}

function runsearch(array){
   var fromStationVal = document.getElementById("fromStation").value;
      var toStationVal = document.getElementById("toStation").value;
     var apijson = array;
      var filtered =  apijson.filter(function(item) {
        return item.stop_name === fromStationVal && item.arrival_name === toStationVal;
      });

  
   
     
   try {
      var d = new Date(); // for now
      var timeNow = d.getHours()+ ':'  +d.getMinutes()+ ':' +d.getSeconds();
      var timenext = timeToSeconds(timeNow);
      timenext = timenext + 900;

    
      var arrtime = timeToSeconds(filtered[0].arrival_time);
      var deptime = timeToSeconds(filtered[0].departure_time);
      var timeDiff = arrtime - deptime;
     
      var nexttraintime = secondstotime(timenext),
          arrnexttraintime = secondstotime(timenext + timeDiff);


      
      var timeDiffmin = Math.floor(timeDiff / 60) + "mins";
      
       var i;
    var res = "";
    for (i = 0; i < 5; i++) {
        if(i === 1){
           timenext = timenext + filtered[0].next_train;

        } else if(i === 2){
           timenext = timenext + filtered[0].next_train * i;
        } else if( i === 3) {
           timenext = timenext + filtered[0].next_train * i;
        }  else if( i === 4) {
           timenext = timenext + filtered[0].next_train * i;
        } else {
          //console.log(timenext);
        }
      res += ' <paper-material elevation="1" class="train"><div><div class="train-pic"></div><div class="train-info"><div class="timetrasin"><span><iron-icon icon="schedule"></iron-icon> '+secondstotime(timenext).replace(/:\d\d([ ap]|$)/,'$1')+'</span> ~ '+secondstotime(timenext + timeDiff).replace(/:\d\d([ ap]|$)/,'$1')+'</span></div><p>Duration: '+timeDiffmin+'</p><h1> '+filtered[0].train_name[i]+'</h1></div> </div><div class="clearfix"></div> </div>  </paper-material>';  

    }
     result.innerHTML = res;
    
    } catch(e) {
       result.innerHTML ='<paper-material elevation="1" class="no-train">No Trains Running this route</paper-material>';
       console.log('error finding trains');
    }

 
    }

   //IndexedDB
 /*  var dbPromise = idb.open('tester', 1, function(upgradeDb) {
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
 */
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
