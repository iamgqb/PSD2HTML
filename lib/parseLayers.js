var parseTextLayer = require('./parseTextLayer');
var parseBackgroundLayers = require('./parseBackgroundLayers');
var justifyLayers = require('./justifyLayers');

function getLinkedArr(tree){

    if (tree.psd.resources.resources['1026'])
        return tree.psd.resources.resources['1026'].linkArray

    return [];
}

function parse(tree){
    var result = [];
    var linkMark = {};
    var groupID = getLinkedArr(tree); //[]若为空，该psd中没有链接图层

    justifyLayers(tree.descendants()).forEach(function(layer, index){
        // console.log(layer.name)
        if (layer.type === 'groupEnd'){
            //之前为了对齐插入的对象
            result.push(layer);
        } else if (layer.get('typeTool')){
            //文本图层
            result.push(parseTextLayer(layer));
        } else if (layer.get('sectionDivider')){
            //组图层
            result.push({type:'groupStart',name:layer.name,visible:layer.visible()})
        } else {
            //除上述之外，应为要转为图像的背景图层
            result.push(parseBackgroundLayers(layer));
            // result.push(layer)
        }

        var matchIndex = linkHelper(index);
        if (!isNaN(matchIndex)){
            //可能返回的下标为 0
            if (result[index].name === '#href'){
                addLink(matchIndex, result[index].txt)
            } else if (result[matchIndex].name === '#href'){
                addLink(index, result[matchIndex].txt)
            } else {
                // throw 'It\'s looks like no match url layer'; 
                //console.error('The layer index '+ index +' looks like no match url layer')
            }
        }
    });

    // this result has #href undefined etc. These we don't need 
    return result;

    function addLink(index, url){
        //重新标记链接图层，并添加url
        result[index].type = 'link';
        result[index].url = url;
    }

    function linkHelper(index){
        //记录链接图层
        var n = groupID[index];
        if (n === 0 || n === undefined) return NaN;
        if (linkMark[n] || !isNaN(linkMark[n])){
            //可能记录为下标为0
            return linkMark[n];
        } else {
            linkMark[n] = index;
        }
        return NaN;
    }
}


module.exports = parse;