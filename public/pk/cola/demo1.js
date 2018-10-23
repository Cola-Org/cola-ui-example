cola(function (model) {
	model.dataType({
		name: "Color",
		properties: {
			name: {
				caption: "颜色",
				validators: ["required"]
			},
			num: {
				caption: "库存",
				dataType: "int"
			},
			price: {
				caption: "价格",
				dataType: "number"
			}
		}
	});
	model.describe("colors", "Color");

	model.set("colors", [
		{ name: "白色", num: 100, price: 3499, selected: true }, { name: "红色", num: 100, price: 3699 }
	]);

	model.action({
		addColor: function() {
			model.get("colors").insert({});
		},
		deleteColor: function(color) {
			color.remove();
		},
		getSelectedColors: function(colors) {
			return colors.filter(function(color) {
				return color.get("selected");
			});
		}
	});
});