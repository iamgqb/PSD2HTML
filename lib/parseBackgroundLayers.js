
function getBackgroundLayers(layer){
    var o = {};
    o.type = 'img';
    o.name = layer.name;
    o.visible = layer.visible();
    o.image = layer.get('image');

    return o;
}

module.exports = getBackgroundLayers;