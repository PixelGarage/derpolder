/**
 * ---
 * @author Ralph Moser (http://ramosoft.ch)
 * @version 0.1
 * @updated 11-06-14
 * ---
 */

(function($) {

    var $activeItem = null,
        stopTypewriter = false;

    /**
     *  Defines a typewriter mode for text. Each letter is displayed separately and with a given delay, until the
     *  given text is completed.
     *
     * @param $container    obj     Container in which the text is displayed
     * @param text          string  Text to be animated in typewriter mode
     * @param duration      int     Delay between two letters in ms (milliseconds)
     */
    function typewriterEffect($container, text, duration) {
        // split text in letters and display each letter separately
        stopTypewriter = false;
        $container.empty();

        $.each(text.split(''), function(i, letter){
            // break, if flag is set
            if (stopTypewriter) {
                $container.empty();
                return false;
            }

            //we add 100*i ms delay to each letter
            setTimeout(function() {
                // stop effect immediately
                if (stopTypewriter) return;

                //we add the letter to the container
                $container.html($container.html() + letter);

            }, duration*i);
        });

    }

    /**
     * Proximity event handler (default implementation).
     *
     * The default event handler can be overwritten by adding a new handler to the Drupal.settings.proximityEventHandler
     * in a separate java script file. Make sure that the script file is loaded after this script file to have any effect.
     *
     * The following parameters are available in the event handler:
     *
     * @param event object  The event object with the all event properties.
     *                      The event.data object contains the following proximity event specific data:
     *                          min                 : defined max. distance (pixels) from item with proximity factor equal 1 (default = 0)
     *                          max                 : outside this defined distance (pixels) the proximity factor is 0 (proximity extent)
     *                          startScale          : starting item scale factor (float) of proximity effect (defined in proximity view settings)
     *                          endScale	        : ending item scale factor (float) of proximity effect (defined in proximity view settings)
     *                          startOpacity        : starting item opacity factor (float) of proximity effect (defined in proximity view settings)
     *                          endOpacity          : ending item opacity factor (float) of proximity effect (defined in proximity view settings)
     *                          containerSelector   : css-selector of proximity container (can be used to define different proximity effects for different containers)
     *                          descrSelector       : css-selector of the item description element, that can be displayed when pointer is close.
     *
     * @param proximity float  The proximity factor [0,1]. 0 means no proximity effect (too far away from item), 1 means full proximity effect (closer than min. distance)
     *
     * @param distance  int     Distance of pointer from item (bounding box) in pixels.
     *
     */
    Drupal.settings.proximityEventHandler = function(event, proximity, distance) {
        // scale and / or change opacity of item depending on the mouse-item distance
        var $item		= $(this),
            d           = event.data,
            $container  = $(d.containerSelector),
            $descrCont  = $container.find(' .pe-content-container > .content'),
            $descr      = $item.find(d.descrSelector),
            transfVal	= proximity * ( d.endScale - d.startScale ) + d.startScale,
            opacityVal  = proximity * (d.endOpacity - d.startOpacity ) + d.startOpacity,
            $itemSound  = $item.find('.pe-item-sound')[0];

        if (proximity == 1) {
            //
            // force the item to the front when proximity equals 1 and show its description, if available
            $item.css( 'z-index', 10 );

            // add a typewriter and sound effect and fade description in
            if (!$item.is($activeItem)) {
                var text = $descr.text();

                typewriterEffect($descrCont, text, 100);
                $descrCont.fadeIn(d.transDuration);
                $itemSound.muted = false;
                $itemSound.play();
                $activeItem = $item;
                if (isMobile.any) Drupal.settings.proximityItemTouchCounter = 0;

            } else {
                // count touches on specific item
                if (isMobile.any) Drupal.settings.proximityItemTouchCounter++;

            }

        } else {
            //
            // send item to back again
            $item.css( 'z-index', 1 );

            if (proximity == 0) {
                //
                // reset item, stop animation/audio and hide description
                if ($item.is($activeItem)) {
                    if (!isMobile.any || (isMobile.any && Drupal.settings.proximityItemTouchCounter > 0)) {
                        // clear item effects (on mobile only on second click)
                        $descrCont.stop(true,true).hide();
                        $itemSound.pause();
                        stopTypewriter = true;
                        $activeItem = null;
                        Drupal.settings.proximityItemTouchCounter = 0;
                    } else {
                        // count touches on specific item
                        if (isMobile.any) Drupal.settings.proximityItemTouchCounter++;

                    }
                }

            }
        }

        // define item specific transformation and set its transparency
        var transf = 'scaleX(' + transfVal + ')',
            filter = 'none',
            _getRandomValues = function() {
                // crypto supported only IE11+
                var crypto = window.crypto || window.msCrypto; // for IE 11
                if(crypto) {
                    // use cryptographic random generator
                    var randArr = new Int8Array(3);
                    window.crypto.getRandomValues(randArr);
                    return randArr;

                } else {
                    // use Math.random
                    return [Math.random() * 256 -128, Math.random() * 256 -128, Math.random() * 256 -128];
                }
            };

        // mobile devices
        if (isMobile.any) {
            opacityVal = 1.0;
            filter = 'hue-rotate(135deg)';
        }

        if ($item.hasClass('views-row-1')) {
            if (isMobile.any) {
                transf = '';
            } else {
                transf = 'rotateX(' + (90 + transfVal*270) + 'deg)';
            }

        } else if ($item.hasClass('views-row-2')) {
            transf = 'rotateY(' + transfVal*360 + 'deg)';
            if (!isMobile.any) filter = 'hue-rotate(' + transfVal*270 + 'deg)'

        } else if ($item.hasClass('views-row-3')) {
            var tra = _getRandomValues();
            transf = 'translate3D(';
            for (var i = 0; i < tra.length; i++) {
                var coord = tra[i] / 128 * transfVal * 5;
                transf += coord.toString();
                if (i < 2) transf += 'px,';
            }
            transf += 'px)';

        } else if ($item.hasClass('views-row-4')) {
            var rot = _getRandomValues();
            //rot[3] = 0.0;
            transf = 'rotate3D(';
            for (i = 0; i < rot.length; i++) {
                coord = rot[i] / 128 * transfVal * 5;
                transf += coord.toString();
                transf += ',';
            }
            transf += transfVal * 20 + 'deg)';

        }

        // 3D transformation
        var perspect = '600px';
        $container.css({
            '-webkit-perspective': perspect,
            '-moz-perspective': perspect,
            '-ms-perspective': perspect,
            'perspective': perspect
        });
        $item.find('img').css({
            '-webkit-transform-style': 'preserve-3d',
            '-moz-transform-style': 'preserve-3d',
            '-ms-transform-style': 'preserve-3d',
            'transform-style': 'preserve-3d',
            '-webkit-transform'	: transf,
            '-moz-transform'	: transf,
            '-ms-transform'		: transf,
            'transform'			: transf,
            '-webkit-filter'	: filter,
            '-moz-filter'	    : filter,
            '-ms-filter'		: filter,
            'filter'			: filter,
            'opacity'			: opacityVal
        });

    };


})(jQuery);

