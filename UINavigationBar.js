define(["./Foundation", "./UIView"], function($, UIView) {
	var UINavigationBar = function(title) {
		//constructor
		$.extend(this, {
			view: $.Element("li", {
				class: "UINavigationBar"
			}).sub(function() {
				this.appendChild($.Element("h2").sub(function() {
					this.innerText = title;
					this.stylize({
						padding: 0, 
						"line-height": "0px",
						"font-size": "18px",
						"font-family": "Helvetica, Sans-serif",
						"font-weight": "normal",
						color: "white"
					})
				}));
				this.stylize({
					background: "#343434"
				})
			}).stylize({
				"list-style": "none",
				padding: "10px",
				border: "1px solid #333",
				"text-align": "center"
			})
		});
	};
	UINavigationBar.prototype = UIView.prototype;
	return UINavigationBar;		
});	