var express = require('express'),
    app = express(),
    port = process.env.PORT || 1337;

app.use(express.static('./'));

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});
