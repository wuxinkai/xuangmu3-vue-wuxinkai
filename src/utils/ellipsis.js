export default {
    //控制文字显示多少个
    cntercept: function(dom, len) {
        let textLen = dom.innerHTML
        var str = '';
        for (var i = 0; i < textLen.length; i++) {
            if (textLen.length > len) {
                str = textLen.substring(0, len) + '...';
                dom.innerHTML = str;
            }
        }
    }
}