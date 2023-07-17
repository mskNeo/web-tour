// Imports
const express = require('express')
import serverless from 'serverless-http';

const app = express()
const router = express.router()
const port = 5000

// Static files
app.use(express.static('public'));

// Set View's
app.set('views', './views');
app.set('view engine', 'ejs');

// Navigation
router.get('/', (req, res) => {
    res.render('index', { text: 'Hey' })
})

app.use(`/.netlify/functions/api`, router);

// Listen on Port 5000
app.listen(port, () => console.info(`App listening on port ${port}`))

export const handler = serverless(app)