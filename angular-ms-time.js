'use strict';

/**
 * @ngdoc directive
 * @name promptApp.directive:angularMilliseconds
 * @description
 * # angularMilliseconds
 */
angular.module('promptApp')
  .directive('angularMsTime', function () {
    return {
      restrict: 'A',
      scope: {
        msModel : "=angularMsTime",
        preMs   : "@angularMsTimePre",
        postMs  : "@angularMsTimePost",
      },
      link: function postLink(scope, element, attrs) {
        /**
         * Convert ms to a time string
         */
        function msToTime(ms) {
          var time = '',
              date,
              dt = {
                day: 0,
                hrs: 0,
                min: 0,
                sec: 0
              };
          
          if (ms && !isNaN(ms)) {
            //==================================================================
            // Pull the time info
            //==================================================================
            // Create date object from MS
            date = new Date(Math.abs(ms));
            
            // Extract time
            dt.hrs = date.getUTCHours();
            dt.min = date.getUTCMinutes();
            dt.sec = date.getUTCSeconds();
          
            //==================================================================
            // Format the time
            //==================================================================
            // Hours
            if (dt.hrs) {
              time = dt.hrs + ':';
            }
            // Minutes
            if (dt.min) {
              if (dt.hrs && dt.min < 10) {
                time = time + '0' + dt.min + ':';
              } else {
                time = time + dt.min + ':';
              }
            } else {
              time = time + '00:';
            }
            // Seconds
            if (dt.sec) {
              if (dt.sec < 10) {
                time = time + '0' + dt.sec;
              } else {
                time = time + dt.sec;
              }
            } else {
              time = time + '00';
            }
            
            // Return formatted time
            return time;
          }
        }
        
        /**
         * Convert a time string to ms
         */
        function timeToMs (time) {
          var splitTime, splitTimeLength;
          
          //====================================================================
          // Format the time
          //====================================================================
          // Make sure time is a string
          time = time.toString().trim();
          
          splitTime = time.split(':');
          splitTimeLength = splitTime.length;
          
          if (splitTimeLength === 1) {
            // sec
            time =  '00:00:' + time;
          } else if (splitTimeLength === 2) {
            // min:sec
            time =  '00:' + time;
          } else if (splitTimeLength === 3) {
            // hrs:min:sec
            // DO NOTHING (time is properly formatted)
          } else if (splitTimeLength >= 4) {
            // More than hrs:min:sec
            time =  splitTime[splitTimeLength-3] + ':' + 
                    splitTime[splitTimeLength-2] + ':' + 
                    splitTime[splitTimeLength-1] + ':';
          } else {
            // Anything weird
            time =  '00:00';
          }
          
          //====================================================================
          // Return time in ms
          //====================================================================
          return Date.parse("01 Jan 1970 " + time + " UTC");
        }
        
        /**
         * Check if a time string is a valid time
         */
        function isValidTime (time) {
          if (time) {
            // return true if time is only digits and colons
            return /^(\d+:)?([012345]?\d:)?([012345]?\d)$/i.test(time);
          } else {
            return false;
          }
        }
        
         /**
          * Bind the time value/text to the msModel
          */
        function bindTime () {
          // Get the element type
          var type = element[0].tagName.toLowerCase();
          
          //====================================================================
          // Input: two-way bind
          //====================================================================
          if (type === 'input' || type === 'textarea') {
            // Update the value on model change
            scope.$watch('msModel', function (newValue) {
              element.val(msToTime(newValue));
            });
            
            // Update the model on value change
            // only if the value is a valid time
            element.on('change', function (e) {
                // Check if the new value is valid
                var newValue = element.val();
                
                // mark as dirty
                 element.addClass('ng-dirty');
                 
                if (isValidTime(newValue)) {
                  // Update the model
                  scope.msModel = timeToMs(newValue);
                  scope.$apply();
                  
                  // Set element as valid
                  element.addClass('ng-valid').removeClass('ng-invalid');
                } else {
                  // set element as invalid
                  element.addClass('ng-invalid').removeClass('ng-valid');
                }
            });
            
          //====================================================================
          // Non-input: inject text
          //====================================================================
          } else {
            // Update the text on model change
            scope.$watch('msModel', function (value) {
              // Get time, add pre and post to it
              var text = (scope.preMs || '') + msToTime(value) + (scope.postMs || '');
              // Add time to element as text
              element.text(text);
            });
          }
        }
        
        // Bind the time to the model
        bindTime();
      }
    };
  });
