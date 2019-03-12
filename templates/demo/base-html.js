module.exports = (config) => {
	const shared = config.shared;
	const demo = config.demo;

  return`<!DOCTYPE html>
<html lang="en"  class="o-hoverable-on ${shared.documentClasses}">
<head>
  <meta charset="utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <title>${demo.title}</title>
  <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=${shared.browserFeatures}"></script> <style>
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
	${shared.dependencies ? `<link rel="stylesheet" href="https://origami-build.ft.com/v2/bundles/css?modules=${shared.dependencies.toString()}${shared.brand ? `&brand=${shared.brand}` : ''}"/>` : ''}
</head>

<body>
  <main id="root"></main>
	<script src="./${demo.name}.js"></script>
	${shared.dependencies ? `<script src="https://origami-build.ft.com/v2/bundles/js?modules=${shared.dependencies.toString()}"></script>` : ''}
	<script src="https://registry.origami.ft.com/embedapi?autoload=resize"></script>
</body>

</html>`;
}