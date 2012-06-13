Introduction
============
- UIKit.js is a JavaScript only web development library that focuses on Object Oriented, cross platform solutions to common structural paradigms.

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
	
		requirejs(["./UIKit.js", "./UISplitViewController"], function(UIKit, UISplitViewController) {...});

  and included in calls to UIKit.implements
  
		UIKit.implements(main, {UISplitViewControlelr: UISplitViewControlelr}); 

- Usually, a view and controller will be allocated and referenced to each other then the view will be initialized and appended to the document body.

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
		

- Elements can be modified in the main function, protocol firings to delegates and by simply accessing the subview properties of a view prior to initialization. The stylize and sub prototype functions are most helpful.
- The stylize function applies CSS to a view with media query conditions as the optional second parameter.

		{
			willInsertRightView: function(right) {
				right.stylize({
					"overflow-y": "scroll"
				}, {"max-height": "480px"});
				return right;
			}
		}		

- The sub function applies a callback to an HTML element or view

		(new UINavigationBar("Tweets")).sub(function() {
			this.appendChild($.Element("h3").sub(function() {
				this.innerText = "subtitle";
			}));
			this.stylize({
				background: "#e3e3e3"
			})
		});

- Classes should be made as delegates for your views that respond to documented protocols to modify or create views and respond to interaction.

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
	
Documentation
=============
UIViewController
----------------

UISplitViewController
---------------------
- (UIView) willInsertLeftView: function(left) {}
- (UIView) willInsertRightView: function(right) {}
- (UIView) willInsertMiddleView: function(middle) {}
- (UISplitView) mySplitView

UITableViewController
---------------------
- (Integer) numberOfSections: function(tableview) {}
- (Integer) numberOfCellsForSection: function(sectionIndex, tableview) {}
- (UITableViewCell) cellAtIndex: function(sectionIndex, cellIndex, tableview) {}
- (void) didSelectCell: function(cellIndex) {}

UINavigationViewController
--------------------------

UITabBarController
------------------