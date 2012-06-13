define(["./Foundation", "./UIView"], function($, UIView) {		
	var UITableView = function() {			
		//constructor
		$.extend(this, {
			view: $.Element("ul", {
				class: "UITableView"
			}), delegate: null
		});
	};
	UITableView.prototype = {
		init: function() {
			var delegate = this.delegate,
				table = this;
			table.view.innerHTML = "";
			[].map.call(Array(delegate.numberOfSections(table)+1).join(0), function(v,section) {
				[].map.call(Array(delegate.numberOfCellsForSection(section, table)+1).join(0), function(v,index) {
					delegate.cellAtIndex(section, index).appendToView(table.view).view.sub(function() {
						this.addEventListener("click", function() {
							delegate.didSelectCell(index)
						});
					});
				});
			});		
			return table;
		}, reloadData: function() {
			this.init();
		}
	};
	$.extend(UITableView.prototype, UIView.prototype /* inheritance */);				
	return UITableView;
});