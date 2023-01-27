const express = require('express');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server is listening on PORT ${PORT}. Hi Micahel & Kai`)
})