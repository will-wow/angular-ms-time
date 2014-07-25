angular-ms-time
===============

An Angular.js directive that binds to a milliseconds model
and shows time formatted as hr:min:sec

Add the directive to an element, and pass in your millisecond model. 

**If the element is an ```input``` or ``textarea``, you get two-way binding:**  
The element will display the milliseconds converted
to human-readable time. When a user updates the time, the directive will check
if they entered a valid time on element blur. If it is invalid, the element will
get the ng-invalid class, and not update the model. Otherwise, the model will be
updated with the correct number of milliseconds. Changing the model from somewhere
else will also update the time displayed.

**If you add the directive to a non-input element (like a ```p```), you get one-way binding:**  
The element will simply display the time
in the element's text area, and will update whenever the model is changed.

Get started
-----------

Download the repo directly, or use bower:  
```
bower install angular-ms-time --save
```

Add ```angular-ms-time.js``` to your index.html.

Add ```angularMSTime``` as a module dependency for your module.

```JavaScript
angular.module('myApp', [  
    ...,  
    angularMSTime  
  ])
```

Add the directive to an element
-------------------------------
On any element - ```input```, ```textarea```, or other (like ```p```),
add the ```ms-time``` element, and pass in the millisecond model you want to
bind to. 

Examples:
```html
<p ms-time="myCtrl.milliseconds"></p>
```

```html
<input type="text" ms-time="myCtrl.milliseconds"></p>
```

Add text before and/or after the time
-------------------------------------
Since angular-ms-time replaces all the text in an element, you may want
to add some text before or after (like "time left: 1:02").  

Add the attributes ```ms-time-pre``` or ```ms-time-post```
with your text and that text will be added to the element. Note that this only
works with non-input elements.

Examples:
```html
<p ms-time="myCtrl.milliseconds" ms-time-pre="Time: "></p>
```

```html
<p ms-time="myCtrl.milliseconds" ms-time-pre="There is " ms-time-post=" remaining"></p>
```

Example
-------
To see it in action, check out
[prompt](http://prompt.whentheresawill.net "prompt.whentheresawill.net"),
live or on 
[github](http://github.com/whenther/prompt "whenther/prompt"),
an online teleprompter that scrolls a text document over a given amount of time.
