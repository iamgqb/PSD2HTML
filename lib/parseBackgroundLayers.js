
function getBackgroundLayers(layer){
    var o = {};
    o.type = 'img';
    o.name = layer.name;
    o.visible = layer.visible();
    o.coords = layer.get('coords');
    var _image = layer.get('image');
    o.image = {
        saveAsPng: _image.saveAsPng,
        toPng: _image.toPng,
        width: function(){return layer.width},
        height: function(){return layer.height},
        pixelData: _image.pixelData
    };
    // o.image = layer.get('image');

    return o;
}

module.exports = getBackgroundLayers;