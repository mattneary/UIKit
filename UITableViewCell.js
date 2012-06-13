define(["./Foundation", "./UIView"], function($, UIView) {	
	var UITableViewCell = function(text) {
		//constructor
		$.extend(this, {
			view: $.Element("li", {
				class: "UITableViewCell"
			}).sub(function() {
				this.innerText = text;
			})
		});
	};
	UITableViewCell.prototype = UIView.prototype;
	return UITableViewCell;
});