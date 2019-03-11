module.exports = (config) => {
  return`<!DOCTYPE html>
<html lang="en"  class="o-hoverable-on ${config.shared.documentClasses}">
<head>
  <meta charset="utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <title>${config.demo.title}</title>
  <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=${config.shared.browserFeatures}"></script> <style>
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
	<script src="./${config.demo.name}.js"></script>
	<script src="https://registry.origami.ft.com/embedapi?autoload=resize"></script>
</body>

</html>`;
}