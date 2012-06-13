define(["./Foundation"], function($ ) {
	//setup work
	var UIView = function() {
		//constructor
		$.extend(this, {
			view: $.Element("div", {
				class: "UIView"						
			})
		});
	};			
	UIView.prototype = {				
		appendToView: function(targetView) {
			var view = this.view;
			targetView.appendChild(view);
			return this;
		}, sub: function(cb) {
			cb.call(this);
			return this;
		}
	};	
	//define self
	return UIView;
});