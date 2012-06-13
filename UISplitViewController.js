define(["./Foundation", "./UIView", "./UINavigationBar", "./UITableView", "./MasterViewController"], function($, UIView, UINavigationBar, UITableView, MasterViewController) {
	side_length = 270;
	var UISplitViewController = function() {				
		$.extend(this, {
			willInsertLeftView: function(left) {
				left.stylize({
					"overflow-y": "scroll"
				});
			
				var table = new UITableView();
				table.delegate = new MasterViewController();
				table.delegate.mySplitViewController = this;
				
				(new UINavigationBar("Title")).appendToView(left);
				table.init();
				table.appendToView(left);
				table.view.stylize({
					margin: 0,
					padding: 0,
					background: "white"
				});
				return left;
			}, willInsertRightView: function(right) {
				right.stylize({
					"overflow-y": "scroll"
				});
				return right;
			}, willInsertMiddleView: function(middle) {
				middle.stylize({
					"overflow-y": "scroll"
				});
			
				var link = function(text, cb) {
					var el = $.Element("a", {href: "#"}).sub(function() {
						this.innerText = text;
					});
					el.addEventListener("click", cb);
					return el;
				}, speed = 40;
				middle.addEventListener("click", function(event) {
					jQuery(middle.parentNode).animate({
						"margin-left": "0px"
					}, speed);
				}, true);
				(new UINavigationBar("Main")).sub(function() {
					var header = this.view;
					header.appendChild(link(">>", function(event) {
						jQuery(middle.parentNode).animate({
							"margin-left": side_length+"px",
							position: "absolute"
						}, speed);
					}).stylize({
						display: "none"
					}, {"min-width": $.responsive.iPhone["max-width"]})).stylize({
						float: "left",
						"margin-top": "-20px"
					});								
					
					header.appendChild(link("<<", function(event) {
						jQuery(middle.parentNode).animate({
							"margin-left": "-"+side_length+"px"
						}, speed);
					}).stylize({
						display: "none"
					}, $.responsive.Mac)).stylize({
						float: "right",
						"margin-top": "-20px"
					});
				}).appendToView(middle);
				this.detailView = $.Element("textarea", {id: "detail"}).sub(function() {
					middle.appendChild(this);
				})
				return middle;
			}, mySplitView: null,
			detailView: null
		});
	};	
	return UISplitViewController;
});