/*
 * CSSLoaded Event
 *   Copyright (c) 2009 Klaus Hartl
 *   Released under the MIT and GPL Licenses.
 */
(function() {
    
    var rules = [
        '#__cssloaded {\
            position: absolute;\
            visibility: hidden;\
        }'
    ];
    rules.push.apply(rules, window.WebKitAnimationEvent ? [ // Firefox throws error when appending unknown rules...
        '#__cssloaded {\
            -webkit-transform: translateY(0);\
            -webkit-animation-name: __cssloaded;\
            -webkit-animation-duration: .001s;\
            -webkit-animation-iteration-count: 1;\
        }',
        '@-webkit-keyframes __cssloaded {\
            from {\
                top: 0;\
            }\
            to {\
                top: 0;\
            }\
        }'
    ] : [
        '#__cssloaded:after {\
            content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9YGARc5KB0XV+IAAAAddEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIFRoZSBHSU1Q72QlbgAAAF1JREFUGNO9zL0NglAAxPEfdLTs4BZM4DIO4C7OwQg2JoQ9LE1exdlYvBBeZ7jqch9//q1uH4TLzw4d6+ErXMMcXuHWxId3KOETnnXXV6MJpcq2MLaI97CER3N0vr4MkhoXe0rZigAAAABJRU5ErkJggg==);\
        }'
    ]);
    
    document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
    var sheet = document.styleSheets[document.styleSheets.length - 1];
    rules.forEach(function(rule) {
        sheet.insertRule(rule, sheet.cssRules.length);
    });

    addEventListener('DOMContentLoaded', function(e) {

        var dummy = document.createElement('div');
        dummy.id = '__cssloaded';
        document.body.appendChild(dummy);
        
        // In WebKit utilize webkitAnimationEnd event, in Firefox the generated image will fire a load event...
        dummy.addEventListener(window.WebKitAnimationEvent ? 'webkitAnimationEnd' : 'load', function(e) {
            var cssLoaded = document.createEvent('Events');
            cssLoaded.initEvent('CSSLoaded', false, false);
            dispatchEvent(cssLoaded);
        }, false);

    }, false);
    
})();
