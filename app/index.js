import './main.scss';

(function(window){
    let _lazyImages = []
    let _allowLoadingOutsideViewport = false
    let _classAfterLoading = null
    let _classBeforeLoading = null
    let _dataLoadedValueForNotComputable = null

    function _load(url, el) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            let errorCalled = false;

            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';
            let prev_percentage = 0;
            xhr.onprogress = e => {
                if (e.lengthComputable) {
                    let percentage = e.loaded / e.total * 100 | 0;
                    if (percentage != prev_percentage)
                        el.setAttribute('data-loaded', percentage.toString());
                } 
                else {
                    if (!errorCalled) {
                        errorCalled = true;
                        if (_dataLoadedValueForNotComputable)
                            el.setAttribute('data-loaded', dataLoadedForNotComputable.toString())
                    }
                }
            }
        
            xhr.onloadend = () => {
                if (xhr.status != 200) {
                    reject(xhr);
                } 
                else {
                    
                    let options = {}
                    const headers = xhr.getAllResponseHeaders();
                    const m = headers.match(/^Content-Type\:\s*(.*?)$/mi);
                    if (m && m[1]) {
                        options.type = m[1];
                    }
                    let blob = new Blob([xhr.response], options);
                    let src = window.URL.createObjectURL(blob);
                    el.removeAttribute('data-loaded');
                    
                    resolve(src);
                }
            }
            xhr.send();
        });
    }

    function _inViewport(el) {
        let rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    function _lazyHandler() {
        _lazyImages.forEach((el, idx, arr) => {
            if (_inViewport(el) || _allowLoadingOutsideViewport){
                arr.splice(idx, 1);
                if (_classBeforeLoading)
                    el.classList.add(_classBeforeLoading);

                let src = el.getAttribute('data-src');
                if (src){
                    _load(src, el).then((src) => {
                        el.setAttribute('src', src);
                        el.removeAttribute('data-src');
    
                        if (_classBeforeLoading)
                            el.classList.remove(_classBeforeLoading)
                        if (_classAfterLoading)
                            el.classList.add(_classAfterLoading)
                    });
                }
                
            }
        });
    }

    function _init({selector = '', allowLoadingOutsideViewport = false, dataLoadedForNotComputable = null, classAfterLoading = null, classBeforeLoading = null }) {
        _allowLoadingOutsideViewport = allowLoadingOutsideViewport;
        _lazyImages = [...selector ? document.querySelectorAll(selector) : document.getElementsByTagName('img')];
        _dataLoadedValueForNotComputable = dataLoadedForNotComputable
        _classAfterLoading = classAfterLoading
        _classBeforeLoading = classBeforeLoading

        
        if (window.addEventListener) {
            addEventListener('DOMContentLoaded', _lazyHandler, false); 
            addEventListener('load', _lazyHandler, false); 
            addEventListener('scroll', _lazyHandler, false); 
            addEventListener('resize', _lazyHandler, false); 
        } else if (window.attachEvent)  {
            attachEvent('onDOMContentLoaded', _lazyHandler);
            attachEvent('onload', _lazyHandler);
            attachEvent('onscroll', _lazyHandler);
            attachEvent('onresize', _lazyHandler);
        }
    }

    window.lazzzy = {
        init : _init
    }

})(window)
