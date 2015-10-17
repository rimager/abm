/**
 * Created by io on 3/22/15.
 */

(function(){

  'use strict';

  angular.module(window.appName).factory('imgLoaderSvc',['fbutil', imgLoaderSvc]);


  function imgLoaderSvc(fbutil){

    var service = {
      loadToFirebase: loadToFirebase
    };
    return service;


    function loadToFirebase(id, type, file, callback ) {



        var f = file;
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                var filePayload = e.target.result;
                // Generate a location that can't be guessed using the file's contents and a random number
                //var hash = CryptoJS.SHA256(Math.random() + CryptoJS.SHA256(filePayload));
                var accountRef = fbutil.ref(type).child(id).child('logo');
                //var f = new Firebase(firebaseRef + 'pano/' + hash + '/filePayload');
                //spinner.spin(document.getElementById('spin'));
                // Set the file payload to Firebase and register an onComplete handler to stop the spinner and show the preview
                accountRef.set(filePayload, function() {
                    callback(e.target.result);

                });
            };
        })(f);
        reader.readAsDataURL(f);

    }



  }

})();
