
function insertLayerEndSig(layers){
    //将组图层结束标志添加进来，用来与groupID数组对齐

    for (var i=0; i<layers.length; i++){
        var value = layers[i];
        if (value && value.isGroup && value.isGroup()){
            var l = value.descendants().length;
            layers.splice(i+l+1, 0, {type:'groupEnd',name:value.name,visible:value.visible()});            
        }
    }
    return layers;
}

module.exports = insertLayerEndSig;