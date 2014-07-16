/**
 * Embedder https://github.com/wooptoo/embedder
 * @author Radu Potop <radu.potop@wooptoo.com>
 * @license MIT
 */
/**
 * A small JavaScript video embedder.
 * It can embed almost any video according to rules.
 */
(function(document){

/**
 * Parsing rules
 * 
 * Format
 * {
 *    'pattern': Match links against pattern. Video ID must be in a regex group.
 *    'url': Embed iframe URL with ID placeholder.
 *    'width': Optional, override embed width.
 *    'height': Optional, override height.
 * }
 */
var rules = [
    {
        'pattern': /.*youtube\.com\/.*(?=.*v=([\w\-]{11})).*(?=.*list=([\w\-]+)).*/i,
        'url': 'http://www.youtube.com/embed/$1?list=$2'
    },
    {
        'pattern': /.*youtube\.com\/.*v=([\w\-]{11}).*/i,
        'url': 'http://www.youtube.com/embed/$1'
    },
    {
        'pattern': /.*youtu\.be\/([\w\-]{11}).*/i,
        'url': 'http://www.youtube.com/embed/$1'
    },
    {
        'pattern': /.*youtube\.com\/.*list=([\w\-]+).*/i,
        'url': 'http://www.youtube.com/embed/?list=$1'
    },
    {
        'pattern': /.*vimeo\.com\/([\d]{7,8}).*/i,
        'url': 'http://player.vimeo.com/video/$1'
    },
    {
        'pattern': /.*(soundcloud\.com\/[\w\-]+\/sets\/[\w\-]+).*/i,
        'url': 'http://w.soundcloud.com/player/?url=$1'
    },
    {
        'pattern': /.*(soundcloud\.com\/[\w\-]+\/[\w\-]+).*/i,
        'url': 'http://w.soundcloud.com/player/?url=$1',
        'height': '166px'
    },
    {
        'pattern': /.*ted\.com\/talks\/([\w\-]+\.html).*/i,
        'url': 'http://embed.ted.com/talks/$1'
    },
    {
        'pattern': /.*(kickstarter\.com\/projects\/[\w\-]+\/[\w\-]+).*/i,
        'url': 'http://$1/widget/video.html'
    }
];

/**
 * Do not embed links that match this pattern
 */
var noembed = /#noembed$/;

/**
 * Auto start the script
 */
embedder();

/**
 * Run parser over all the links in the document
 */
function embedder() {
    
    for(var i=0; i<document.links.length; i++) {
        var a=document.links[i];
        var src=parseHref(a.href);

        if(src) {
            var iframe = createIframe(src);
            insertAfter(iframe,a);
        }
    }
    
}

/**
 * Parse each href attribute and extract the video ID
 */
function parseHref(href) {
    
    for (var i=0; i<rules.length; i++) {
        var rule = rules[i];
        
        if (!noembed.test(href) && rule.pattern.test(href)) {
            return {
                'src': href.replace(rule.pattern, rule.url),
                'i': i
            };
        }
    }
    
}

/**
 * Create iframe element for each video
 */
function createIframe(src) {

    var iframe = document.createElement('iframe');

    iframe.src = src.src;
    
    iframe.style.width = rules[src.i].width || '640px';
    iframe.style.height = rules[src.i].height || '390px';
    
    iframe.style.borderWidth = '0px';
    iframe.style.display = 'block';
    iframe.scrolling = 'no';

    return iframe;
}

/**
 * Insert after node
 */
function insertAfter(new_node, existing_node) {
    if (existing_node.nextSibling) {
        existing_node.parentNode.insertBefore(new_node, existing_node.nextSibling);
    } else {
        existing_node.parentNode.appendChild(new_node);
    }
}

})(document);
