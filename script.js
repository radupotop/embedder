/*
 * Embedder
 * --------
 * A small JS video embedder.
 * It can embed almost any video according to rules.
 *
 * Author: Radu Potop <wooptoo@gmail.com>
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

    len=document.links.length
    for(i=0; i<len; i++) {
        a=document.links[i]

        if(src=parseHref(a.href)) {
            iframe = createIframe(src)
            a.appendChild(iframe)
        }
    }

}


function parseHref(href) {

    out = null

    for each (rule in rules) {
        pattern = new RegExp(rule.pattern, 'i')
        if (href.match(pattern)) {
            pos = href.search(rule.search)
            if(pos > -1) {
                pos += rule.search.length
                id = href.slice(pos,pos+rule.lenID)
                out = rule.url.replace('{ID}',id)
            }
        }
    }

    return out
}


function createIframe(src) {
    iframe = document.createElement('iframe')

    iframe.src = src
    iframe.setAttribute('allowfullscreen', true)
    iframe.setAttribute('width', 400)
    iframe.setAttribute('height', 320)

    return iframe
}
