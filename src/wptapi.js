// Rest API
var WebTheatricsRest = function(baseUrl) {
    var _this = this;
    var _baseUrl = baseUrl;

    this.country = {
		all: function(params,callback) {
			_this._MakeRestCall("/all",callback);
		},
		name: function(params,callback) {
			console.log("Name: "+params);
			_this._MakeRestCall("/name/"+params,callback);
		},
		fullname: function(params,callback) {
			_this._MakeRestCall("/name/"+params+"?fullText=true",callback);
		}
	}

    this._MakeRestCall = function(uri,callback) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			 if (this.readyState == 4 && this.status == 200) {
				 var response=JSON.parse(this.responseText);
				 callback.success(response);
			 } else if (this.readyState == 4 && this.status != 200){
				 callback.error(this.status);
			 }
		};
		
		xhttp.open("GET", _baseUrl+uri, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send();
	}
}

exports.WebTheatricsRest = WebTheatricsRest;