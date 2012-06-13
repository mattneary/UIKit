define(["./Foundation"], function($ ) {
	//setup work
	var UIView = function() {
		//constructor
		$.extend(this, {
			view: $.Element("div", {
				class: "UIView"						
			}), initialized: false
		});
	};			
	UIView.prototype = {				
		appendToView: function(targetView) {
			var view = this.view;
			this.init();
			targetView.appendChild(view);			
			return this;
		}, sub: function(cb) {
			cb.call(this);
			return this;
		}, _init: function() {
			if( !this.initialized == true ) {
				console.log("init!");
				if( this.delegate && this.delegate.viewWillLoad)
					this.view = this.delegate.viewWillLoad(this.view) || this.view;
				initialized = true;
			}
		}, init: function() {
			this._init();
		}, delegate: null
	};	
	//define self
	return UIView;
});