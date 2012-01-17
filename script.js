rules = {
    0: {
        'match': 'youtube\.com',
        'search': 'v=',
        'lenID': 11,
        'out': 'http://www.youtube.com/embed/',
    },
}




function embed() {

    len=document.links.length
    for(i=0; i<len; i++) {
        a=document.links[i]

        iframe = createIframe(parseHref(a.href))
        a.appendChild(iframe)
    }

}


function parseHref(inp) {

    if (inp.match(/youtube\.com/)) {
        pos=inp.search('v=')
        id=inp.slice(pos+2,pos+13)
        out='http://www.youtube.com/embed/'+id
    } else
    if (inp.match(/youtu\.be/)) {
        pos=inp.search('.be/')
        id=inp.slice(pos+4,pos+15)
        out='http://www.youtube.com/embed/'+id
    } else
    if (inp.match(/vimeo\.com/)) {
        pos=inp.search('.com/')
        id=inp.slice(pos+5,pos+16)
        out='http://player.vimeo.com/video/'+id
    } else {
        out=null
    }

    return out
}


function createIframe(src) {
    iframe = document.createElement('iframe')

    iframe.src = src
    iframe.setAttribute('allowfullscreen', true)
    iframe.setAttribute('width', 100)
    iframe.setAttribute('height', 80)

    return iframe
}

embed()
