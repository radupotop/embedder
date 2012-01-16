function embed() {
    //~body=document.getElementsByTagName('body')[0]

    aList = document.getElementsByTagName('a')
    for each (a in aList) {
        if (a.href && a.href.match(/youtube\.com/)) {

            hrefNew = a.href.replace('watch?v=', 'embed/')
            pos = hrefNew.search('&')
            if (pos > -1) { hrefNew = hrefNew.slice(0,pos) }

            iframe = createIframe(hrefNew)

            console.log(iframe)

            a.appendChild(iframe)
            //~console.log(a.parentNode)
        }
    }
}

function createIframe(src) {
    iframe = document.createElement('iframe')

    iframe.src = src
    iframe.setAttribute('allowfullscreen', true)
    iframe.setAttribute('width', 420)
    iframe.setAttribute('height', 315)

    return iframe
}

embed()
