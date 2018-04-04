﻿/**
 * Unidirectional dispatch-driven collection views, for your pleasure.
 */


define([
    'backbone',
    'underscore',
    'modules/url-dispatcher',
    'modules/intent-emitter',
    'modules/get-partial-view',
    'modules/facet-clear'
], function(Backbone, _, UrlDispatcher, IntentEmitter, getPartialView, makeClearUrl) {

    function factory(conf) {

        var _$body = conf.$body;
        var _dispatcher = UrlDispatcher;
        var ROUTE_NOT_FOUND = 'ROUTE_NOT_FOUND';
        function updateUi(response) {
            var url = response.canonicalUrl;
            _$body.html(response.body);
            if (url) _dispatcher.replace(url);
            _$body.removeClass('mz-loading');
        }

        function showError(error) {
            // if (error.message === ROUTE_NOT_FOUND) {
            //     window.location.href = url;
            // }
            _$body.find('[data-mz-messages]').text(error.message);
        }

        function intentToUrl(e) {
            var elm = e.target;
            var url;
            if (elm.tagName.toLowerCase() === "select") {
                elm = elm.options[elm.selectedIndex];
            }

            /**
             * Custom code applied for the facet clear functionality
             */
            if(elm.getAttribute('data-mz-facet-clear')) {
                var pathName = _$body.context.location.pathname;
                var searchName = _$body.context.location.search;
                url = pathName+searchName;
                url = makeClearUrl(url, elm.id);
            } else {
                url = elm.getAttribute('data-mz-url') || elm.getAttribute('href') || '';    
            }
            
            if (url && url[0] != "/") {
                var parser = document.createElement('a');
                parser.href = url;
                url = window.location.pathname + parser.search;
            }
             console.log("URL : "+url);
            return url;
        }

        var navigationIntents = IntentEmitter(
            _$body,
            [
                'click [data-mz-pagingcontrols] a',
                'click [data-mz-pagenumbers] a',
                'click a[data-mz-facet-value]',
                'click [data-mz-action="clearFacets"]',
                'click button[data-mz-facet]',
                'click button[data-mz-facet-clear=facetClear]',
                'change input[data-mz-facet-value]',
                'change [data-mz-value="pageSize"]',
                'change [data-mz-value="sortBy"]'
            ],
            intentToUrl
        );

        navigationIntents.on('data', function(url, e) {
            if (url && _dispatcher.send(url)) {
                _$body.addClass('mz-loading');
                e.preventDefault();
            }
        });

        _dispatcher.onChange(function(url) {
            getPartialView(url, conf.template).then(updateUi, showError);
        });

    }

    return {
        createFacetedCollectionViews: factory
    };

});