Introduction
============
- UIKit.js is a JavaScript only web development library that focuses on Object Oriented, cross platform solutions to common structural paradigms.
- Views and Controllers are allocated and referenced to each other then the views are initiated and appended to the document body.
- Views check their delegate for subviews and upon interaction.

MVC
===
- Following an MVC architecture in UIKit.js is very natural. 
- Views are subclasses of UIView, UITableView etc.
- Controllers are classes that implement protocols in their instances.
- Models are classes with instance variables and methods that allow for intuitive manipulation of data point(s).


App Workflow
============
- Fire app main with UIKit closure i.e., call UIKit.implements(function() {...})
- create main app view e.g., UISplitView, UITableView
- give main view a delegate e.g., UISplitViewController, MasterViewController
- return or modify subviews through protocol firings to View Controller(s)
- optionally give subview(s) delegate(s)
- respond to interaction through protocol firings to View Controller(s) and any subview controller(s)

Getting Started
===============
- Your custom classes can be included as require.js modules
	
```javascript
requirejs(["./UIKit.js", "./UISplitViewController"], function(UIKit, UISplitViewController) {...});
```

  and included in calls to UIKit.implements

```javascript
UIKit.implements(main, {UISplitViewControlelr: UISplitViewControlelr}); 
```

- Usually, a view and controller will be allocated and referenced to each other then the view will be initialized and appended to the document body.

```javascript
var main = function() {		
	var wrapper = new UISplitView();
	var uisvc = new UISplitViewController();	
	
	uisvc.mySplitView = wrapper;		
	wrapper.delegate = uisvc;
	
	wrapper.init();	
	
	wrapper.appendToView($.Element(document.body).stylize({
		padding: 0, margin: 0
	}));
};
```	

- Elements can be modified in the main function, protocol firings to delegates and by simply accessing the subview properties of a view prior to initialization. The stylize and sub prototype functions are most helpful.
- The stylize function applies CSS to a view with media query conditions as the optional second parameter.

```javascript
{
	willInsertRightView: function(right) {
		right.stylize({
			"overflow-y": "scroll"
		}, {"max-height": "480px"});
		return right;
	}
}
```		

- The sub function applies a callback to an HTML element or view

```javascript
(new UINavigationBar("Tweets")).sub(function() {
	this.appendChild($.Element("h3").sub(function() {
		this.innerText = "subtitle";
	}));
	this.stylize({
		background: "#e3e3e3"
	})
});
```

- Classes should be made as delegates for your views that respond to documented protocols to modify or create views and respond to interaction.

```javascript
define(["./UIKit", "jquery"], function(UIKit, jQuery) {
	return UIKit.implements(function() {
		var cellObjects, table;
		var MasterViewController = function() {	//constructor of class
			cellObjects = "lorum ipsum dolor sit amet".split(" ");
			//API fetch starts upon allocation
			jQuery.getJSON("https://api.twitter.com/1/statuses/public_timeline.json?include_entities=true", function(tweets) {
				cellObjects = tweets.map(prop("text"));
				table.reloadData();
			});
			$.extend(this, {	//built-in utility function			
				numberOfSections: function(tableview) {					
					return 1;
				}, numberOfCellsForSection: function(sectionIndex, tableview) {
					table = tableview;
					return cellObjects.length;
				}, cellAtIndex: function(sectionIndex, cellIndex, tableview) {	
					return (new UITableViewCell(cellObjects[cellIndex]));
				}, didSelectCell: function(cellIndex) {
					//interaction is handled
					this.mySplitViewController.detailView.innerText = cellObjects[cellIndex];
				}, mySplitViewController: null	//a property assigned after allocation
			});
		};
		//return uikit based class
		return MasterViewController;
	});		
});
```
	
Documentation - Controllers
===========================
- Note that Controllers are not explicitly declared but should implement stated protocols.

UIViewController
----------------
- (UIView) viewWillLoad: function(view) {}

UISplitViewController
---------------------
- (UIView) viewWillLoad: function(view) {}
- (UIView) willInsertLeftView: function(left) {}
- (UIView) willInsertRightView: function(right) {}
- (UIView) willInsertMiddleView: function(middle) {}
- (UISplitView) mySplitView

UITableViewController
---------------------
- (UIView) viewWillLoad: function(view) {}
- (Integer) numberOfSections: function(tableview) {}
- (Integer) numberOfCellsForSection: function(sectionIndex, tableview) {}
- (UITableViewCell) cellAtIndex: function(sectionIndex, cellIndex, tableview) {}
- (void) didSelectCell: function(cellIndex) {}

UINavigationViewController
--------------------------
- TODO

UITabBarController
------------------
- TODO

Documentation - Views
=====================
UIView
------
- __(UIView) constructor: function() {}__
- (UIView) appendToView: function(targetView) {}
- (void) init
- (UIView) sub: function(cb) {}
- (Element) view

UIImageView
-----------
- __(UIImageView) constructor: function(src) {}__
- (String) src
- (void) init

UISplitView
-----------
- __(UISplitView) constructor: function() {}__
- (Element) view
- (void) init
- (UIView) rightView
- (UIView) leftView 
- (UIView) middleView
- (UISplitViewController) delegate

UITableView
-----------
- __(UITableView) constructor: function() {}__
- (Element) view
- (void) init
- (UITableViewController) delegate
- (void) reloadData
- (UITableView) init

UITableViewCell
---------------
- __(UITableViewCell) constructor: function(textContent) {}__
- (Element) view
- (void) init

UINavigationView
----------------
- TODO

UINavigationBarView
-------------------
- __(UINavigationBarView) constructor: function(barTitle) {}__
- (Element) view
- (void) init

UITabBarView
------------
- TODO

Subclassing Views
=================
- include dependencies in a requirejs module

```javascript
define(["./Foundation", "./UIView"], function($, UIView) {		
```

- declare a  constructor for your class

```javascript
	var UISplitView = function() {
```

- extend the instance with and method or property instance variables.

```javascript
		$.extend(this, {
			view: $.Element("div"),
			rightView: section(side_length+"px", "right"), 
			leftView: section(side_length+"px", "left"),	 
			middleView: section("100%", "middle"), 
			delegate: null
		});
	}
```

- create a prototype with any class methods you would like to add or modify. Note that when modifying the init method, a backup of the default should be fired.

```javascript
	UISplitView.prototype = {
		init: function() {
			this._init();	//init super: fires viewWillLoad on delegate
			//do other shit
		}
	};
```

- extend the prototype with that of a parent class for inheritance, values will not be overwritten.

```javascript
	$.extend(UISplitView.prototype, UIView.prototype);
```

- return the constructor (i.e., class) as the requirejs module

```javascript
	return UISplitView;
});
```

Following View Controller Protocols
===================================
- the view controller constructor should add instance methods that can be called by the view which it controls.

```javascript
var MasterViewController = function() {
	var cellObjects = ["lorum", "ipsum", "dolor", "sit", "amet"]; //private
	$.extend(this, {			
		numberOfSections: function(tableview) {					
			return 1;
		}, numberOfCellsForSection: function(sectionIndex, tableview) {
```

- private instance variables may be used to cache the view or its properties.

```javascript
			myTable = tableview;
			return cellObjects.length;
		}, cellAtIndex: function(sectionIndex, cellIndex, tableview) {	
			return (new UITableViewCell(cellObjects[cellIndex])).sub(function() {
				this.view.stylize({
					"list-style": "none",
					padding: "10px",
					border: "1px solid #333"
				});
			});
		}, didSelectCell: function(cellIndex) {
```

- additional views may be linked to a view controller for data output etc.

```javascript
			this.mySplitViewController.detailView.innerText = cellObjects[cellIndex];
		}, 
```

- arbitrary instance variables may be added for dealing with other views.

```javascript
		mySplitViewController: null
	});
};
```