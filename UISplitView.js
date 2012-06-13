define(["./Foundation", "./UIView"], function($, UIView) {
	side_length = 270;
	var section = function(width, id) {
		return $.Element("div", {id: id}).stylize({
			width: width,
			height: "100%",
			position: "absolute",
			top: 0
		});
	};
	var UISplitView = function() {
		$.extend(this, {
			view: $.Element("div").stylize({
				width: "100%",
				position: "absolute",			
				height: "100%", left: 0
			}).stylize({
				left: "-"+side_length+"px"
			}/* iPad */).stylize({
				left: 0
			}/* iPhone */), init: function() {
				var self = this,
					delegate = self.delegate;
				
				console.log("self",self);
												
				this.view.sub(function() {
					var wrap = this;											
					[delegate.willInsertMiddleView(self.middleView)||self.middleView,
					 delegate.willInsertLeftView(self.leftView)||self.leftView,
					 delegate.willInsertRightView(self.rightView)||self.rightView].
					 map(function(el) {
						wrap.appendChild(el);
					});								
				});
			}, rightView: section(side_length+"px", "right").stylize({
				right: 0, background: "green"				
			}).stylize({
				left: "100%"
			}, $.responsive.iPad).stylize({
				left: "100%"
			}, $.responsive.iPhone), 
			leftView: section(side_length+"px", "left").stylize({
				left: 0, 
				background: "blue"
			}).stylize({
				left: "auto",
				right: "100%"
			}, $.responsive.iPhone),	 
			middleView: section("100%", "middle").stylize({
				"box-sizing": "border-box",
				"padding-left": side_length+"px",
				"padding-right": side_length+"px",
				background: "red"
			}).stylize({
				"padding-right": 0
			}, $.responsive.iPad).stylize({
				"box-sizing": "content-box",
				background: "red",
				"padding-left": 0
			}, $.responsive.iPhone), 
			delegate: null
		});
	}
	$.extend(UISplitView.prototype, UIView.prototype);
	return UISplitView;
});