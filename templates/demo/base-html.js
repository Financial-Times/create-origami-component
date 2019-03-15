module.exports = (config) => {
	const shared = config.shared;
	const demo = config.demo;
  return`<!DOCTYPE html>
<html lang="en" class="o-hoverable-on ${shared.documentClasses ? shared.documentClasses : ''}">
<head>
  <meta charset="utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
  <title>${demo.title}</title>
	<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=${shared.browserFeatures}"></script>
	${shared.dependencies ? `<link rel="stylesheet" href="https://www.ft.com/__origami/service/build/v2/bundles/css?modules=o-buttons,${shared.dependencies.toString()}${config.brand ? `&brand=${config.brand}` : ''}"/>` : ''}

	<style>
		body {
			margin: 0;
		}
		.core .o--if-js,
		.enhanced .o--if-no-js {
			display: none !important;
		}
	</style>
	<script>
		(function (d) {
			d.className = d.className + ' demo-js';
		})(document.documentElement);
	</script>
</head>

<body>
  <main id="root"></main>
	<script src="./${demo.name}.js"></script>
	${shared.dependencies ? `<script src="https://origami-build.ft.com/v2/bundles/js?modules=${shared.dependencies.toString()}"></script>` : ''}
	<script src="https://registry.origami.ft.com/embedapi?autoload=resize"></script>
</body>

</html>`;
}