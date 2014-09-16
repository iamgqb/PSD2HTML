# PSD2HTML #

基于psd.js

因为对psd.js有修改，所以先进入 /node_modules/psd 文件夹执行 npm install

## Usage ##

#### psd.js 的基础使用 ####

参看psd.js的[README](http://gitlab.alibaba-inc.com/xianjia.wanxj/psd-parser/tree/master/node_modules/psd)

#### 结合psd2html 的lib ####
```javascript

	var PSD = require('psd');
	var parseLayers = require('./lib/parseLayers');
	var psd = PSD.fromFile("path/to/file.psd");

	var tree = psd.parse().tree();
	//tree 中包含了该psd文件的解析信息；具体参看psd.js

	var result = parseLayers(tree);
	//对psd.js输出的tree对象进行进一步处理

	console.log(result);
	//最终输出为一个对象数组，会出现五种type
	//text, img, groupStart, groupEnd, link;
 
```
###### 以下是五种type的结构解释 ######
```javascript
	
	//每种类型都有基本的属性
	//group类型没有 coords 属性

	{
		type: 'text',
		name: 'file test',
		visible: true,
		coords: { top: 0, bottom: 2293, left: 0, right: 1800 } 
	}


	//text类型为文本图层
	//wordsSnippets 为文本片段，当一个文本图层中出现不同样式的文本，则会产生两个或以上的文本片段
	//注:ps的文字间距在默认情况下就会产生两个片段
	
	{
		txt: '这里是文字，图层的纯文本信息',
		wordsSnippets: [ [Object], [Object] ]
	}	


	//img类型为图像图层
	//image属性是psd.js中image属性的复制
	//可以通过 image.saveAsPng(filename) 方法生成png图片
	//注：使用了混合模式的图层生产的png会丢失混合的效果

	image:{
		obj: [Object],
		file: [Object],
		startPos: 1950912,
		loaded: false,
		loadMethod: 'parse',
		loadArgs: [],
		passthru: []
	}

	//link类型表示该图层有超链接行为
	//url表示链接地址
	//当img, text有超链接时, type会变为link

	{
		url:'http://1688.com'
	}

```

### 如何为相应的图层添加链接 ###
TODO