/*
 * Embedder
 * --------
 * A small JS video embedder.
 * It can embed almost any video according to rules.
 *
 * Author: Radu Potop <wooptoo@gmail.com>
 * License: BSD
 *

    rule format:
    {
        'pattern': A HREF pattern, usually site domain
        'search': string after which the video ID is found
        'lenID': length of video ID
        'url': embed URL with ID placeholder
    }

*/


rules = [
    {
        'pattern': 'youtube\.com',
        'search': 'v=',
        'lenID': 11,
        'url': 'http://www.youtube.com/embed/{ID}',
    },
    {
        'pattern': 'youtu\.be',
        'search': '.be/',
        'lenID': 11,
        'url': 'http://www.youtube.com/embed/{ID}',
    },
    {
        'pattern': 'vimeo\.com',
        'search': '.com/',
        'lenID': 8,
        'url': 'http://player.vimeo.com/video/{ID}',
    },
]


/*
 * auto start the script
 */
embedder()


function embedder() {

    var len=document.links.length

    for(var i=0; i<len; i++) {
        var a=document.links[i]
        var src=parseHref(a.href)

        if(src) {
            var iframe = createIframe(src)
            insertAfter(iframe,a)
        }
    }

}


function parseHref(href) {

    var len=rules.length

    for (var i=0; i<len; i++) {
        var rule = rules[i]
        var pattern = new RegExp(rule.pattern, 'i')
        if (href.match(pattern)) {
            var pos = href.search(rule.search)
            if(pos > -1) {
                pos += rule.search.length
                var id = href.slice(pos,pos+rule.lenID)
                var out = rule.url.replace('{ID}',id)
            }
        }
    }

    return out
}


function createIframe(src) {

    var iframe = document.createElement('iframe')

    iframe.src = src
    iframe.style.width = '500px'
    iframe.style.height = '375px'
    iframe.style.borderWidth = '0px'
    iframe.style.display = 'block'

    return iframe
}


/*
 * Credits to: http://blog.svidgen.com/2007/10/javascript-insertafter.html
 * */
function insertAfter(new_node, existing_node) {
    if (existing_node.nextSibling) {
        existing_node.parentNode.insertBefore(new_node, existing_node.nextSibling);
    } else {
        existing_node.parentNode.appendChild(new_node);
    }
}
