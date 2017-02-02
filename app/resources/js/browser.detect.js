/**
 * 
 */

window.BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
		this.support = this.searchSupport();
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		var tempStr = dataString.substring(index+this.versionSearchString.length+1);
		var tempIndex = tempStr.indexOf(' ');
		if (tempIndex != -1) tempStr = tempStr.substring(0, tempIndex);
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
		//return tempStr;
	},
	searchSupport: function () {
		var check = false;
		var item;
		for(var i=0; i<= this.supportedBrowser.length-1; i++) {
			item = this.supportedBrowser[i];
			if (!check && this.browser == item.browser) {
				if (item.minVersion != undefined && item.maxVersion != undefined) {
					check = (this.version >= item.minVersion && this.version <= item.maxVersion);
				} else if (item.minVersion != undefined) {
					check = (this.version >= item.minVersion);
				} else if (item.maxVersion != undefined) {
					check = (this.version <= item.maxVersion);
				} else {
					check = true;
				}
			}
		}
		return check;
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Internet Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Trident",
			identity: "Internet Explorer",
			versionSearch: "rv"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	],
	supportedBrowser: [
    	{ browser: "Internet Explorer", minVersion: 7 },
    	{ browser: "Firefox", minVersion: 3.5 },
    	{ browser: "Chrome", minVersion: 10 },
    	{ browser: "Safari" },
    	{ browser: "Opera" }
    ]
};
BrowserDetect.init();

