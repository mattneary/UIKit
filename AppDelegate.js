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
requirejs(["./UIKit.js", "./jquery", "./MasterViewController", "./UISplitViewController"], function(UIKit, jQuery, MVC, UISplitViewController) {
	UIKit.implements(main, 
		{jQuery: $}, 
		{MasterViewConroller:MVC}, 
		{UISplitViewController:UISplitViewController});
});