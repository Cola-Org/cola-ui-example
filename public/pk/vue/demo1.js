var app = new Vue({
	el: '#app',
	data: {
		colors: [
			{name: "白色", num: 100, price: 3499, selected: true}, {name: "红色", num: 100, price: 3699}
		]
	},
	computed: {
		selectedColors: function () {
			return this.colors.filter(function (color) {
				return color.selected;
			});
		}
	},
	methods: {
		addColor: function() {
			this.colors.push({});
		},
		deleteColor: function(color) {
			var i = this.colors.indexOf(color);
			if (i >= 0) this.colors.splice(i, 1);
		}
	}
});