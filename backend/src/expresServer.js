const express = require('express');
const app = express();
app.get('/', (req, res) => {
res.send('Hello Ghamdan');
});
let server = app.listen(8000, () => {
}); 