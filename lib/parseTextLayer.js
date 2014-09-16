var PED = require('parse-engine-data');
var fontMap = require('./fontMap');

function getTextLayers(layer){

    var o = {};
    o.type = 'text';
    o.name = layer.name;
    o.visible = layer.visible();

    var typeTool = layer.get('typeTool');

    if(!typeTool){
        return;
    }

    o.coords = layer.get('coords');
    o.txt = typeTool.textData['Txt '];

    var engineData = typeTool.textData.EngineData;

    var data = PED(engineData);

    var fonts = getFonts(data.ResourceDict.FontSet);
    
    o.wordsSnippets = getTextDetail(data.EngineDict.StyleRun.RunArray, 
                                    data.EngineDict.StyleRun.RunLengthArray,
                                    fonts, o.txt);
    return o;
}



// console.log(root.textLayers[0].wordsSnippets);

function getFonts(arr){
    return arr.map(function(i){
        return i['Name'];
    });
}

function getTextDetail(StyleArr, cutsArr, fonts, text){
    // 当字体和颜色莫名消失的时候，颜色使用黑色，字体使用第一种
    function getFontFaimly(style){
        var index = style.Font || 0;//未知bug 字体也会木有
        return fonts[index];
    }

    function getFontSize(style){
        return style.FontSize + 'px'; //像素和点的关系？
    }

    function getColor(style){
        var color = style.FillColor.Values || [1, 0, 0, 0]; //未知BUG颜色木有了
        var r = ~~(color[1]*255),
            g = ~~(color[2]*255),
            b = ~~(color[3]*255);
        return 'rgb('+r+','+g+','+b+')';
    }

    function isBold(fontFamily){
        // PSD中的加粗是按照字体来的
        if (/-Bold/g.test(fontFamily)){
            return 'bold';
        }
        return 'normal';
    }

    function getTracking(style){
        // This is letter-spacing
        var value = style.Tracking;
        if(value) {
            var fontSize = style.FontSize;
            // 字体大小 X tracing / 1000 (1/1000em)
            return ~~(fontSize*value/1000)+'px';
        }
        return 'normal';
    }

    function getKerning(style){
        // margin-left
        if (style.AutoKerning){
            return 0;
        }
        var fontSize = style.FontSize,
            value = style.Kerning;
        return ~~(fontSize*value/1000)+'px';
    }

    function getLeading(style){
        // line-height
        if (style.AutoLeading === false){ //这里AutoLeading会出现undefined 不能用!
            return style.Leading + 'px';
        }
        return 'normal';
    }

    function getOpacity(style){
        var color = style.FillColor.Values || [1, 0, 0, 0]; //未知BUG颜色木有了
        return color[0];
    }

    function getTextSnippets(index){
        var start = 0;
        for(var i=0; i<index; i++){
            start += cutsArr[i];
        }
        return text.substr(start, cutsArr[index]);//这段字符串包含的文字，注意换行符\r
    }

    function getTextDecoration(style){
        var underline = style.Underline,
            linethrough = style.Strikethrough;

        if (underline) 
            return 'underline';
        if (linethrough)
            return 'line-through';
        return 'none';
    }

    function mapFont(fontFamily){
        if (fontMap[fontFamily])
            return fontMap[fontFamily]
        return 'sans-serif';
    }

    return StyleArr.map(function(current, index){
        var style = current.StyleSheet.StyleSheetData;
        var o = {};

        var fontFamily = getFontFaimly(style);

        o['font-weight'] = isBold(fontFamily);
        //检测完后, 把Bold与Regular标志去掉, CSS中不需要
        //up 这里再议， 标志去掉也没用，与css中名字不匹配
    

        o['font-family'] = mapFont(fontFamily);
        o['font-size'] = getFontSize(style);
        o['opacity'] = getOpacity(style);
        o['color'] = getColor(style);   
        o['letter-spacing'] = getTracking(style);
        o['margin-left'] = getKerning(style);
        o['line-height'] = getLeading(style);//行高应该设置给父元素,但各个片段的linehegiht不一样怎么办
        o['text-decoration'] = getTextDecoration(style);
        o.text = getTextSnippets(index);
        return o;
    });
}

module.exports = getTextLayers;