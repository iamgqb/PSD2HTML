# PSD2HTML #

基于psd.js

因为对psd.js有修改，所以先进入 psd 文件夹执行 npm install

## Usage ##

#### psd.js 的基础使用 ####


	var PSD = require('psd');
	var psd = PSD.fromFile("path/to/file.psd");
	psd.parse();
	
	console.log(psd.tree().export());
	//export方法可以取到基本的图层信息；
	console.log(psd.tree().childrenAtPath('A/B/C')[0].export());
	
	// You can also use promises syntax for opening and parsing
	PSD.open("path/to/file.psd").then(function (psd) {
	  return psd.image.saveAsPng('./output.png');
	}).then(function () {
	  console.log("Finished!");
	});

#### 结合psd2html 的lib ####

	var PSD = require('psd');
	var parseLayers = require('./lib/parseLayers');
	var psd = PSD.fromFile("path/to/file.psd");

	var tree = psd.parse().tree();
	var result = parseLayers(tree);

	console.log(result);
	//最终输出为一个对象数组，会出现四种type
	//text, img, groupStart, groupEnd; 