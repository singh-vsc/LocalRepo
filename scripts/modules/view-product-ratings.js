define(['modules/jquery-mozu', 'underscore', 'modules/backbone-mozu', 'hyprlive', "modules/models-product", "modules/api"], function ($, _, Backbone, Hypr, ProductModel, api) {
	
	// var prdCode=$thisElem.attr("data-mz-productcode");
	var url = "https://api.yotpo.com/v1/widget/4X91rXasdFWFBX4Rnh5WEr4NnvMwpFpjxzNFLubD/products/891/reviews";
		api.request("GET", url).then(function (response){
		var data = response.response;
		// prod_model.set({reviews: res});
		// newMod.set({reviews: res});
		console.log("MODEL VAL : "+JSON.stringify(data));
		
		var product = new ProductModel.Product(data); 

		var ReviewsView = Backbone.MozuView.extend({
			templateName: "modules/product/product-reviews",
			events: {
				"click #productreview": "showReviews"
			}
		});

		var view = new ReviewsView({
			model: product,
			el: $('#ratings')
		});
		view.render();
		
	});
});