var depends = ["./Foundation.js", "./UIView.js", "./UITableViewCell.js", "./UITableView.js", "./UINavigationBar.js", "./UISplitView.js"];

define(depends, function($, UIView, UITableViewCell, UITableView, UINavigationBar) {
	var modules = arguments;
	var ends = function(str,a,b) {
		return [].splice.call(str, a, str.length+b-a).join("");
	};
	var keys = function(obj) {
		var resp = [];
		for( var key in obj ) resp.push(key);
		return resp;
	};
	var prop = function(name) {
		return function(el) {
			return el[name];
		};
	};
	var toArray = function(arg) {
		var resp = [];
		for( var i = 0; i < arg.length; i++ ) {
			resp.push(arg[i]);
		};
		return resp;
	};
	var implements = function(cb /* other modules */) {	
		var args = depends.map(function(str) {
			return ends(str, 2, -3);
		});	
		var additional = toArray(arguments).splice(1).map(function(el) {
			return {
				key: keys(el)[0], 
				value: el[keys(el)[0]]
			};
		});
		var additionalModuleNames = additional.map(prop("key"));
		var additionalModules = additional.map(prop("value"));
		
		var modified = Function.apply(0, args.concat(additionalModuleNames).concat("var $ = Foundation;return "+cb+"()"));
		return modified.apply(0,toArray(modules).concat(additionalModules));
	};
	return {
		implements:implements
	}
});