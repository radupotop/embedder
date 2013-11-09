/**
 * Embedder
 * --------
 * A small JS video embedder.
 * It can embed almost any video according to rules.
 *
 * Author: Radu Potop <radu.potop@wooptoo.com>
 * License: BSD
 *
 */
(function(document){

/**
 * Parsing rules
 * 
 * Format
 * {
 *    'pattern': Match links against pattern. Video ID must be in a regex group.
 *    'url': Embed iframe URL with ID placeholder.
 * }
 */
var rules = [
    {
        'pattern': /youtube\.com\/.*v=(.{11})/i,
        'url': 'http://www.youtube.com/embed/{ID}'
    },
    {
        'pattern': /youtu\.be\/(.{11})/i,
        'url': 'http://www.youtube.com/embed/{ID}'
    },
    {
        'pattern': /vimeo\.com\/(.{8})/i,
        'url': 'http://player.vimeo.com/video/{ID}'
    },
    {
        'pattern': /ted.com\/talks\/([a-z0-9_-]+)\.html/i,
        'url': 'http://embed.ted.com/talks/{ID}.html'
    }
];

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
        var match = href.match(rule.pattern);
        if (match) {
            return rule.url.replace('{ID}', match.slice(1).join(''));
        }
    }
    
}

/**
 * Create iframe element for each video
 */
function createIframe(src) {

    var iframe = document.createElement('iframe');

    iframe.src = src;
    iframe.style.width = '640px';
    iframe.style.height = '390px';
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
