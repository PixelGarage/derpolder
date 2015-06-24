/**
 * ---
 * @author Ralph Moser (http://ramosoft.ch)
 * @version 0.1
 * @updated 11-06-14
 * ---
 */

(function($) {

    var $activeItem = null;

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
        $.each(text.split(''), function(i, letter){

            //we add 100*i ms delay to each letter
            setTimeout(function(){
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
            $descrCont  = $(d.containerSelector + ' .pe-content-container > .content'),
            $descr      = $item.find(d.descrSelector),
            descrClone  = $descr.clone(),
            transfVal	= proximity * ( d.endScale - d.startScale ) + d.startScale,
            opacityVal  = proximity * (d.endOpacity - d.startOpacity ) + d.startOpacity;

        // force the item to the front when proximity equals 1 and show its description, if available
        if (proximity == 1) {
            // put cell to front
            $item.css( 'z-index', 10 );
            $descrCont.empty();

            // add a typewriter effect to description and fade it in
            if (!$item.is($activeItem)) {
                typewriterEffect($descrCont, descrClone.text(), 100);
                $descrCont.fadeIn(d.transDuration);
            }
            $activeItem = $item;

        } else {
            // reset cell, stop animation and hide description
            $item.css( 'z-index', 1 );

            if (!$activeItem || $activeItem.is($item)) {
                $descrCont.stop(true,true).hide();
                $activeItem = null;
            }

        }

        // define item specific transformation and set its transparency
        var transf	= 'scale(' + transfVal + ')';

        if ($item.hasClass('views-row-1')) {
            transf = '';

        } else if ($item.hasClass('views-row-2')) {
            transf = '';

        } else if ($item.hasClass('views-row-3')) {
            transf = '';

        } else if ($item.hasClass('views-row-4')) {
            transf = '';

        }

        $item.css({
            '-webkit-transform'	: transf,
            '-moz-transform'	: transf,
            '-o-transform'		: transf,
            '-ms-transform'		: transf,
            'transform'			: transf,
            'opacity'			: opacityVal
        });

    };


})(jQuery);

