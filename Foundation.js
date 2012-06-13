define(function() {
	var _=function(a){return a.call(this,function(a){o={};a.map(function(a){for(var b in a)o[b]=o[b]||a[b]});return o}([].splice.call(arguments,1)))};
	
	var foundation = (function() {
		var extend = function(a,b){for(k in b)a[k]=b[k];return a;};		
		var iPhone = {
			"max-width": "600px"
		}, iPad = {
			"max-width": "1024px"
		}, Mac = {
			"min-width": "1025px"
		};
		return {
			extend:extend,
			responsive: {
				iPhone:iPhone,
				iPad:iPad,
				Mac:Mac
			}
		};
	})();
	var UI = (function() {
		var style = function(query, attrs, media) {
			var stringify_attrs = function(attrs) {
				var str = "{";
				for( var k in attrs )
					str+=k+": "+attrs[k]+";";
				return str+"}"
			};
			var condition = function(str) {
				var t;
				var query = [].splice.call((t=stringify_attrs(media)),1,t.length-3);
				return "@media all and ("+query.join("").split(";").join(" and ")+") {"+str+"}";
			};
			
			var css = media?condition(query+stringify_attrs(attrs)):query+stringify_attrs(attrs);
			var link = document.createElement("link");
			link.rel = "stylesheet";
			link.href = "data:text/css;base64,"+btoa(css);
			document.body.appendChild(link);//.getElementById("client-side-styles")
		};
		return {
			style:style
		};
	})();


	Element = _.call(Element, (function(imports /* style, extend */) {
		//modular prototype and constructor creation, class has to leak to global
		//REASON: closure, dependencies can be shared! makes sense...
		var id_counter = 1234;
		this.prototype.sub = function(cb, wrapper) {
			cb.call(wrapper?wrapper(this):this);
			return this;
		};
		this.prototype.stylize = function(attrs, media) {
			var query;
			if( !this.id )
				this.id = "mn"+id_counter++;
			imports.style("#"+this.id, attrs, media); 
			return this;
		};
		return function(tag, attrs) {
			if(typeof tag == typeof document.body){ return tag; }
			var el = document.createElement(tag);	
			return imports.extend(el, attrs);
		};
	}), UI, foundation);
	
	return _(function(imports) {
		//make all private modules available by closure to a function which will 
		//pass them on, along with classes and other dependencies, to a callback
		return imports;
	}, UI, foundation, {Element:Element}, {_:_});
});