const express = require('express')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')
const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());

const publicVapidKey = 'BCISlWoTV3o1kg0U5aseb0_ZqIsWgXocofBA_ojAfygG4ZQV8lw7KeMOZJRQa0Gh92guly3Fv_sYix-Jo-ZYM_k';
const privateVapidKey = 'jstQv9XODKcISUThtIETeSDiWhwJAkgTQohSwIQHAJU';

webpush.setVapidDetails(
  "mailto:test@test.com",
    publicVapidKey, 
    privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ 
    title: "ALMUNDO NOTIFICACION",
    url: req.body.url,
    ttl: req.body.ttl, 
    icon: req.body.icon,
    image: req.body.image,
    badge: req.body.badge,
    tag: req.body.tag
  });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
