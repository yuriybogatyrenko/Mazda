var doc = $(document);
var menu_activated = false;

doc.ready(function () {
    setTimeout(function () {
        $('select.selectpicker').selectpicker();
    }, 300);


    doc.on('click', '[data-call-submenu]', function (e) {
        var _this = $(this);
        var bl = $('[data-submenu="' + _this.attr("data-call-submenu") + '"]');

        if (!_this.hasClass('active')) {
            _this.addClass('active');
            bl.show().addClass('active');
        } else {
            _this.removeClass('active');
            bl.hide().removeClass('active');
        }


        menu_activated = true;
        e.preventDefault();
    });

    doc.on('click', '.js-show-all-params', function (e) {
        var $this = $(this),
            filter = $('.full-filter-hidden');

        if ($this.hasClass('active')) {
            filter.slideUp(300);
            $this.removeClass('active');
        } else {
            filter.slideDown(300);
            $this.addClass('active');
        }

        e.preventDefault();
    });

    $('.owl-carousel__parent-element').each(function () {
        var $this = $(this);
        var similar_next = $this.find('.custom-carouse__next');
        var similar_prev = $this.find('.custom-carouse__prev');

        var owl = $this.find('.owl-carousel');

        var items_num = parseInt(owl.attr("data-items"));

        if (items_num > 0) {
            owl.owlCarousel({
                items: items_num,
                responsive: {
                    0: {
                        items: items_num
                    }
                }
            })
        } else {
            owl.owlCarousel({
                items: 3,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 3
                    }
                }
            });
        }

        similar_next.on('click', function (e) {
            $(this).closest('.owl-carousel__parent-element').find('.owl-carousel:visible').trigger('next.owl.carousel');
            e.preventDefault()
        });

        similar_prev.on('click', function (e) {
            $(this).closest('.owl-carousel__parent-element').find('.owl-carousel:visible').trigger('prev.owl.carousel');
            e.preventDefault()
        });
    });

    $('[data-js-hide]').on('click', function (e) {
        $(this).closest('[data-js-hide-block]').hide();
        e.preventDefault();
    });

    $('[data-jsp]').jScrollPane();

    $(window).resize(function () {
        var throttleTimeout;
        $('[data-jsp]').each(function () {
            var api = $(this).data('jsp');
            if (!throttleTimeout) {
                throttleTimeout = setTimeout(
                    function () {
                        api.reinitialise();
                        throttleTimeout = null;
                    },
                    100
                );
            }
        })
    });

    $('.dealers-map__current-dealer-name').bind("DOMSubtreeModified", function () {
        var header = $('.dealers-map__listing-header'),
            listing = $('.dealers-map__listing'),
            block = $('.dealers-map__units'),
            throttleTimeout,
            api = block.data('jsp'),
            top = -(listing.offset().top -
            (header.offset().top
            + header.outerHeight()));

        block.css({top: top});

        if (!throttleTimeout) {
            throttleTimeout = setTimeout(
                function () {
                    api.reinitialise();
                    throttleTimeout = null;
                },
                50
            );
        }
    });

    $(function () {
        var news_grid = {};

        news_grid.container = $('.main-page__news-grid, .main-page__rated-dealers');
        news_grid.owl = news_grid.container.find('>.row');

        news_grid.owl.css({margin: 0}).addClass('owl-carousel').owlCarousel({
            items: 3,
            margin: 30,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 3
                }
            }
        });
    });
});

$(function () {
    var char = {};
    var ww = $(window).width();

    char.models_wrapper = '.auto-model__characters-tab__pags-wrapper';
    char.models_link = '.auto-model__modification-element-link';
    char.back_link = '[data-modification-go-back]';
    char.content_wrapper = '.auto-model__characters-tab__wrapper';


    // открываем полные характеристики
    char.open = function () {
        // console.log('open');

        $(char.models_wrapper).fadeOut(300, function () {
            // тут можем сделать ajax на доставание информации о моделях
            $(char.content_wrapper).fadeIn(300);
        });
    };

    // закрываем полные характеристики
    char.close = function () {
        console.log('close');
        $(char.content_wrapper).fadeOut(300, function () {
            $(char.models_wrapper).fadeIn(300);
        });
    };

    // отчищаем полные характеристики
    char.clear = function () {
        $(char.content_wrapper).removeAttr('style');
        $(char.models_wrapper).removeAttr('style');
    };

    doc.on('click', char.back_link, function (e) {
        if (ww >= 768)
            return;
        e.preventDefault();

        char.close();
    });

    doc.on('click', char.models_link, function (e) {
        if (ww >= 768)
            return;
        e.preventDefault();

        char.open();
    });

    $(window).bind('resize', function () {
        ww = viewport().width;
        if(ww >= 768) {
            char.clear();
        }
    });
});

function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}