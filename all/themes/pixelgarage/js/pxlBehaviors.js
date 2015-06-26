/**
 * This file contains all Drupal behaviours of the Apia theme.
 *
 * Created by ralph on 05.01.14.
 */

(function ($) {

    /**
     * Audio controller.
     */
    Drupal.behaviors.audioController = {
        attach: function () {
            var audio   = document.getElementById('bg-audio'),
                $toggle = $(document).find('#audio-controls'),
                $toggleImg = $toggle.find('img.audio-play'),
                imgUrl     = $toggleImg.attr('src');

            // click on play / pause button
            $toggle.once('click', function () {
                $toggle.on('click', function () {
                    // toggle the play button
                    if (audio.paused || audio.ended) {
                        audio.play();
                        $toggleImg.attr('src', imgUrl.replace('tonan', 'tonaus'));
                    } else {
                        audio.pause();
                        $toggleImg.attr('src', imgUrl.replace('tonaus', 'tonan'));
                    }

                    // don't propagate click event further up
                    return false;
                });
            });

        }
    };


    function _sizePositionItem($items, itemImages) {
        // calculate image factor and scale factor
        var maxWidth = 1400,
            imgWidth = 1400,
            imgHeight = 858,
            scale = 1,
            imgFact  = 1,
            ww = $(window).width(),
            wh = $(window).height();

        if (ww > 1200) {
            // image width = 1400px
            imgWidth = 1400;
            imgHeight = 858;

        } else if (ww > 1024) {
            // image width = 1200px
            imgWidth = 1200;
            imgHeight = 735;

        } else if (ww > 768) {
            // image width = 1024px
            imgWidth = 1024;
            imgHeight = 628;

        } else if (ww > 480) {
            // image width = 768px
            imgWidth = 768;
            imgHeight = 471;

        } else {
            // image width = 480px
            imgWidth = 480;
            imgHeight = 294;

        }
        scale = Math.max(ww/imgWidth, wh/imgHeight, 1.0);
        imgFact = imgWidth / maxWidth;

        // position all items
        $items.each(function (i) {
            var $item = $(this),
                $iImg  = $item.find('.views-field-field-image img'),
                imgObj  = itemImages[i],
                iTop = '0px',
                iLeft = '0px';

            if ($item.hasClass('views-row-1')) {
                iLeft = (520*imgFact*scale) + 'px'; iTop = (100*imgFact*scale) + 'px';

            } else if ($item.hasClass('views-row-2')) {
                iLeft = (136*imgFact*scale) + 'px'; iTop = (408*imgFact*scale) + 'px';

            } else if ($item.hasClass('views-row-3')) {
                iLeft = (257*imgFact*scale) + 'px'; iTop = (-1*imgFact*scale) + 'px';

            } else if ($item.hasClass('views-row-4')) {
                iLeft = (880*imgFact*scale) + 'px'; iTop = (479*imgFact*scale) + 'px';

            }

            // position and size item in css
            $iImg.width(imgFact*scale*imgObj.width);
            $iImg.height(imgFact*scale*imgObj.height);
            $item.css({'position': 'absolute', 'top': iTop, 'left': iLeft});
        });

    }

    /**
     * Positions the proximity items according to the window size.
     */
    Drupal.behaviors.positionItems = {
        attach: function () {
            // Iterate through all proximity container instances
            $.each(Drupal.settings.proximity, function (container, settings) {

                var contSelector = '#' + container,
                    $container   = $(contSelector),
                    $items       = $container.find(settings.item_selector),
                    itemImages   = [];


                $(window).off('.proximity');
                $(window).on('load.proximity', function() {
                    $items.each(function () {
                        var $item = $(this),
                            $iImg  = $item.find('.views-field-field-image img');

                        // store original size of item images once for scaling
                        itemImages.push({width: $iImg.width(), height: $iImg.height()});

                    });
                    _sizePositionItem($items, itemImages);
                });
                $(window).on('resize.proximity', function() {
                    _sizePositionItem($items, itemImages);
                });

            }); // container instances

        }
    }

    /**
     * Controls the video playback.
    Drupal.behaviors.videoController = {
        attach: function () {
            var video = document.getElementById('picco-video'),
                $playPause = $(document).find('#picco-logo'),
                $peDialog = $('.main-container .pe-container #pe-modal-dialog');

            // PREVENT VIDEO FROM PLAYING ON MOBILES
            if ($(window).width() < 480) {
                video.pause();
            }

            // video playing/pause events
            $(video).once('playing', function () {
                $(video).on('playing', function () {
                    // set the pause button icon
                    $playPause.find('.fa').removeClass('fa-play').addClass('fa-pause');
                    $(this).removeClass('fadeout');
                });
            });
            $(video).once('pause', function () {
                $(video).on('pause', function () {
                    // set the play button icon
                    $playPause.find('.fa').removeClass('fa-pause').addClass('fa-play');
                    $(this).addClass('fadeout');
                });
            });

            // click on play / pause button
            $playPause.once('click', function () {
                $playPause.on('click', function () {
                    // toggle the play button
                    if (video.paused || video.ended) {
                        video.play();
                    } else {
                        video.pause();
                    }

                    // don't propagate click event further up
                    return false;
                });
            });

            // play/pause video on hiding/showing modal dialog
            $peDialog.once('events', function () {
                var isPaused = true;

                $peDialog.on('show.bs.modal', function () {
                    // pause video
                    isPaused = video.paused || video.ended;
                    video.pause();

                    // move logo behind dialog
                    $playPause.css('z-index', -10);
                });
                $peDialog.on('hide.bs.modal', function () {
                    // play video
                    if (!isPaused) {
                        video.play();
                    }

                    // move logo to the front
                    $playPause.css('z-index', 10);

                });
            });

        }
    };
     */

})(jQuery);