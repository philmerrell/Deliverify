/**
 * TODO: Limit file type and size.
 * TODO: Remove old image when a new image is uploaded
 **/

(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('UploadService', UploadService);

    function UploadService($q) {
      var storage = null;
      var storageRef = null;

      return {
        deleteImage         : deleteImage,
        setStorageRef       : setStorageRef,
        uploadImage         : uploadImage
      }

      function setStorageRef(uid) {
        storage = firebase.storage();
        storageRef = storage.ref('stores/' + uid + '/');
      }

      function deleteImage(url) {          
          var oldImageRef = storage.refFromURL(url);
          return oldImageRef.delete();
      }

      function uploadImage(file, path) {
        var deferred = $q.defer();
        var uploadTask = storageRef.child(path + file.name).put(file, { contentType: file.type });

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        // console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        // console.log('Upload is running');
                        break;
                }
            }, function(error) {
                switch (error.code) {
                    case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                    case 'storage/canceled':
                    // User canceled the upload
                    break;

                    case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                }
            }, function() {
                // Upload completed successfully, now we can get the download URL
                var imageUrl = uploadTask.snapshot.downloadURL;
                deferred.resolve(imageUrl);
        });
        return deferred.promise;
      }
    }

})();