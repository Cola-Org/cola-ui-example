cola(function (model) {
	function post(URL, params) {
		var temp = document.createElement("form");
		temp.action = URL;
		temp.method = "post";
		temp.style.display = "none";

		for (var key in params) {
			var opt = document.createElement("input");
			opt.name = key;
			opt.value = params[key];
			temp.appendChild(opt);
		}
		document.body.appendChild(temp);
		temp.submit();
		$(temp).remove();
		return temp;
	}

	model.describe("properties", {
		dataType: {
			properties: {
				"projectName": {
					caption: "项目名称",
					validators: [
						"required"
					]
				},
				"applicationName": {
					caption: "启动类名称",
					validators: [
						"required"
					]
				},
				"groupId": {
					caption: "Maven的组织名",
					validators: [
						"required"
					]
				},
				"version": {
					caption: "版本号",
					validators: [
						"required"
					]
				},
				"baseVersion": {
					caption: "Calf Base 版本",
					validators: [
						"required"
					]
				},
				"uiDoradoVersion": {
					caption: "Calf UI Dorado 版本",
					validators: [
						"required"
					]
				},
				"interfaceVersion": {
					caption: "Calf Interface 版本",
					validators: [
						"required"
					]
				},
				"serviceVersion": {
					caption: "Calf Service 版本",
					validators: [
						"required"
					]
				},
				"webVersion": {
					caption: "Calf Web 版本",
					validators: [
						"required"
					]
				},
			}
		}
	});

	model.set("properties", {
		"projectName": "demo",
		"groupId": "com.hupun",
		"version": "0.0.1-SNAPSHOT",
		"uiDoradoVersion": "0.0.1-SNAPSHOT",
		"interfaceVersion": "0.0.1-SNAPSHOT",
		"baseVersion": "0.0.1-SNAPSHOT",
		"serviceVersion": "0.0.1-SNAPSHOT",
		"webVersion": "0.0.1-SNAPSHOT",
		"applicationName": "Demo"
	});

	model.describe("baseVersions", {
		provider: "/service/wizard/versions/content/repositories/calf-snapshots/com/hupun/calf-base/maven-metadata.xml"
	});
	model.describe("uiDoradoVersions", {
		provider: "/service/wizard/versions/content/repositories/calf-snapshots/com/hupun/calf-ui-dorado/maven-metadata.xml"
	});
	model.describe("interfaceVersions", {
		provider: "/service/wizard/versions/content/repositories/calf-snapshots/com/hupun/calf-interface-starter/maven-metadata.xml"
	});
	model.describe("webVersions", {
		provider: "/service/wizard/versions/content/repositories/calf-snapshots/com/hupun/calf-web-starter/maven-metadata.xml"
	});
	model.describe("serviceVersions", {
		provider: "/service/wizard/versions/content/repositories/calf-snapshots/com/hupun/calf-service-starter/maven-metadata.xml"
	});

	model.action({
		download: function () {
			var data = model.get("properties");

			if (data.validate()) {
				var properties = model.get("properties").toJSON();
				post("/service/wizard/create-project", properties);
			}
		}
	});
});