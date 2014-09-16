// 请不要使用仿黑体，只允许使用 Bold或者Regular
// 字体与css中名字不一样 是否建一个map
// 不需要的图层，请务必隐藏
// psd的宽度
// 链接的约定
// 奇怪的逻辑，第一个字符一定被分割
// 偶尔奇怪的bug，颜色没了，字体没了，无法重现!!!!!
// 不能敲很多空格，会合并为一个
// 接上，要将字与字之间分开，用字距
// 行高与css是一致的
// 删除线与下划线不用共用

var fs = require('fs')
var PSD = require('psd');
var iconv = require('iconv-lite')
var psd = PSD.fromFile('./test.psd');

var parseLayers = require('./lib/parseLayers');
psd.parse();
// psd.image.toPng()

var tree = psd.tree();
var root = {
    'width': tree.coords.right + 'px',
    'height': tree.coords.bottom + 'px'
};
var layers = tree.descendants();

var y =tree.psd.resources.get();
var t=parseLayers(tree)
// for (var i in t){
//     if (t[i].type==='img'){
//         t[i].image.saveAsPng('./image/'+t[i].name+'.png')
//     }
// }
console.log(t[1]);
console.log('-------------------')
// console.log(tree.psd.resources.resources['1026'].linkArray)

// console.log(tree.children())


//test start
// var PED = require('./lib/parseEngineData');
// var engineData = layers[0].get('textElements').textData.EngineData;
// var d = PED(engineData);
// fs.writeFile('temp', engineData)
// fs.writeFile('format', String.fromCharCode.apply(null, engineData))
// fs.writeFile('format.json', JSON.stringify(d));
//test end

// var undocu = layers[1].get('metadata').data.undocument;
// var out = undocu.map(function(i){
//     return String.fromCharCode(i);
// }).join('');
// console.log(out)
// for (var l in layers){
    // console.log(layers[0].get('metadata'))
    // console.log(layers[l].get('name'))
// }

//pngtest
// for (var i in layers){
//     if (layers[i].get('textElements') || layers[i].get('sectionDivider') || !layers[i].visible())
//         //去掉文件夹层与文字图层
//         continue;
//     layers[i].get('image').saveAsPng('./image/'+i+'.png')
//     console.log(layers[i].get('image').hasMask)
// }
//pngtest end

// var img = layers[0].get('image').toPng();
// console.log(img)
// fs.writeFile('temp', JSON.stringify(img));
// console.log(layers[0].get('image').loaded)
// console.log(layers[0].get('image').compression)


// root.textLayers = getTextLayers(layers);
// var view = fs.readFileSync('./view/struct-inline.ejs', 'utf8');
// var res = ejs.render(view, {
//     'root':root
// }).replace(/\r/g,'<br>');

//存进去用gbk就行
// var resBf = iconv.encode(res, 'gbk');
// fs.writeFile('test.html', resBf)
// console.log(view)
console.log('done')
