define(['modules/jquery-mozu', 'underscore', 'modules/backbone-mozu', 'hyprlive'], function ($, _, Backbone, Hypr) {
    
    var ProductListView = Backbone.MozuView.extend({
            templateName: 'modules/product/product-list-tiled'
        }),

    FacetingPanel = Backbone.MozuView.extend({
        additionalEvents: {
            "change [data-mz-facet-value]": "setFacetValue",
            "click [data-mz-facet-link]": "handleFacetLink"
            // "click [data-mz-value=facetClear]":"clearThisFacet"
        },
        templateName: "modules/product/faceting-form",
        initialize: function () {
            alert("OKKK");
            this.listenTo(this.model, 'loadingchange', function (isLoading) {
                this.$el.find('input').prop('disabled', isLoading);
            });
        },
        clearFacets: function () {
             console.log("Clear FACETS");
            
           // this.model.clearAllFacets();
        },
        clearFacetValues: function(e) {
            console.log("ClearFacetValues");
            /*var $target = $(e.currentTarget),
                id = $target.data('mz-facet-id'),
                field = $target.data('mz-facet');
                this.set("values", { isApplied: false });
            this.collection.parent.updateFacets({ resetIndex: true });*/    
            e.preventDefault();
            var field = $(e.currentTarget).data("mz-facet");
            this.model.get("facets").findWhere({field: $(e.currentTarget).data('mz-facet') }).empty();
            this.render();
        },
        clearFacet: function (e) {
            console.log("CLEAR");
            this.model.get("facets").findWhere({ field: $(e.currentTarget).data('mz-facet') }).empty();
        },
        drillDown: function(e) {
            var $target = $(e.currentTarget),
                id = $target.data('mz-hierarchy-id'),
                field = $target.data('mz-facet');
            this.model.setHierarchy(field, id);
            this.model.updateFacets({ force: true, resetIndex: true });
            e.preventDefault();
        },
        setFacetValue: function (e) {
           var $box = $(e.currentTarget);
            this.model.setFacetValue($box.data('mz-facet'), $box.data('mz-facet-value'), $box.is(':checked'));
        },
        handleFacetLink: function (e) {
            e.stopImmediatePropagation();
        }
    });



    return {
        List: ProductListView,
        FacetingPanel: FacetingPanel
    };
});