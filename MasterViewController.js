var prop = function(name) {
	return function(el) {
		return el[name];
	};
};
define(["./UIKit", "jquery"], function(UIKit, jQuery) {
	return UIKit.implements(function() {
		var cellObjects, myTable;
		//define constructor with uikit closure
		var MasterViewController = function() {
			//a delegate is a class
			cellObjects = ["lorum", "ipsum", "dolor", "sit", "amet"];
			jQuery.getJSON("https://api.twitter.com/1/statuses/public_timeline.json?include_entities=true", function(tweets) {
				cellObjects = tweets.map(prop("text"));
				myTable.reloadData();
			});
			$.extend(this, {			
				numberOfSections: function(tableview) {					
					return 1;
				}, numberOfCellsForSection: function(sectionIndex, tableview) {
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
					//handle detail view
					this.mySplitViewController.detailView.innerText = cellObjects[cellIndex];
				}, mySplitViewController: null
			});
		};
		//return uikit based function
		return MasterViewController;
	});		
});