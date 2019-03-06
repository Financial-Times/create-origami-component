module.exports = (demo) => {
  return`<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <title>${demo.title}</title>
</head>

<body>
  <main id="root"></main>
  <script src="https://registry.origami.ft.com/embedapi?autoload=resize"></script>
</body>

</html>`;
}