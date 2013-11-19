/* globals chrome,$ */
(function() {
    "use strict";

    var port = chrome.runtime.connect({
        name: "imghide"
    });

    var state = true;
    var toHideSelector = "image, iframe, svg, img";
    var allSelector = '*:not(pre)';
    var $prevAll;
    var $prevHide;

    port.onMessage.addListener(function(msg) {
        if (msg.imgs) {
            if (state) {
                $prevHide = $(toHideSelector);
                hideImgs($prevHide);
                $prevAll = $(allSelector);
                hideBackground($prevAll);
            } else {
                if (typeof $prevAll !== "undefined") {
                    showBackground($prevAll);
                    showImgs($prevHide);
                }
            }
            state = !state;
        }
    });

    function hideBackground($selector) {
        $selector.each(function() {
            var $this = $(this);
            if ($this.css('background')) {
                $this.data("bkg", $this.css('background'));
                $this.css('background', 'none');
            }
        });
    }
    function showBackground($selector) {
        $selector.each(function() {
            var $this = $(this);
            if ($this.data("bkg")) {
                $this.css('background', $this.data('bkg'));
            }
        });
    }


    function hideImgs($selector) {
        $selector.stop().fadeTo(400, 0, function() {
            $(this).css('visibility', 'hidden');
        });
    }

    function showImgs($selector) {
        $selector.stop().css('visibility', '').fadeTo(400, 1);
    }

})();
