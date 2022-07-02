const express = require('express');
const app = express();
const port = 3000;

const https = require('https');

const cats = [
  {
    Name: "Frank",
    Image: "https://raw.githubusercontent.com/flurrrii/goofycatapi/main/images/frank.webp",
    AlternateImages: {
      "angry": "https://raw.githubusercontent.com/flurrrii/goofycatapi/main/images/frank_angry.gif",
      "hungry": "https://raw.githubusercontent.com/flurrrii/goofycatapi/main/images/frank_hungry.gif"
    },
    Bio: "Frank is an older fellow. He likes to go out on afternoon strolls through his neighbourhood."
  },
  {
    Name: "d",
    Image: "https://raw.githubusercontent.com/flurrrii/goofycatapi/main/images/d.webp",
    AlternateImages: {
      "death": "https://raw.githubusercontent.com/flurrrii/goofycatapi/main/images/d_death.gif"
    },
    Bio: "this cat is d."
  },
  {
    Name: "Stare",
    Image: "https://raw.githubusercontent.com/flurrrii/goofycatapi/main/images/stare.webp",
    Bio: "He knows what you have done"
  },
  {
    Name: "Happy Cat",
    Image: "https://raw.githubusercontent.com/flurrrii/goofycatapi/main/images/happycat.webp",
    Bio: "He is having a nice day and hopes you are too."
  },
  {
    Name: "Funmy Cat",
    Image: "https://raw.githubusercontent.com/flurrrii/goofycatapi/main/images/funmycat.gif",
    Bio: "He is quite funmy"
  },
  {
    Name: "Bath Cat",
    Image: "https://raw.githubusercontent.com/flurrrii/goofycatapi/main/images/bathcat.webp",
    Bio: "Enjoys baths very much"
  },
  {
    Name: "Charlie",
    Image: "https://raw.githubusercontent.com/flurrrii/goofycatapi/main/images/charlie.webp",
    Bio: "Small cat, big dreams."
  },
  {
    Name: "Dance Cat",
    Image: "https://raw.githubusercontent.com/flurrrii/goofycatapi/main/images/dancecat.gif",
    Bio: "He is very funky"
  },
  {
    Name: "Jinx",
    Image: "https://raw.githubusercontent.com/flurrrii/goofycatapi/main/images/jinx.webp",
    AlternateImages: {
      "baffled": "https://raw.githubusercontent.com/flurrrii/goofycatapi/main/images/jinx_baffled.webp",
      "calm": "https://raw.githubusercontent.com/flurrrii/goofycatapi/main/images/jinx_calm.webp",
      "concern": "https://raw.githubusercontent.com/flurrrii/goofycatapi/main/images/jinx_concern.webp",
      "excited": "https://raw.githubusercontent.com/flurrrii/goofycatapi/main/images/jinx_exited.webp"
    },
    Bio: "Jinx is defintely a cat"
  },
  {
    Name: "Kent",
    Image: "https://raw.githubusercontent.com/flurrrii/goofycatapi/main/images/kent.webp",
    Bio: "A friend of Frank. Does not enjoy walks, he would rather watch birds."
  },
  {
    Name: "lo",
    Image: "https://raw.githubusercontent.com/flurrrii/goofycatapi/main/images/lo.webp",
    Bio: "lo"
  },
  {
    Name: "Spooked Cat",
    Image: "https://raw.githubusercontent.com/flurrrii/goofycatapi/main/images/spookedcat.webp",
    Bio: "Gets spooked easliy, has a passion for hating tape measures."
  },
  {
    Name: "Tim",
    Image: "https://raw.githubusercontent.com/flurrrii/goofycatapi/main/images/tim.webp",
    Bio: "Son of Frank"
  },
]

//Get Random Cat
app.get('/cats', (req, res) => {
  res.send(cats[Math.floor(Math.random() * cats.length)]);
});

app.get('/cat/*', (req, res) => {
  let path = req._parsedUrl.path.split('/');
  res.send(cats.filter(cats.Name == path[1].replaceAll("_"," ")))
});

//"Docs"

//Proxy Get
app.get('/lynx/get/*', (req, res) => {
  let path = req._parsedUrl.path.split('/');
  https.get(decodeURIComponent(path[3]).replaceAll("$", "/"), (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      res.send({Data:data})
    });
  }).on("error", (err) => {
    res.send("Unexpected Error")
  });
});

//Proxy Post

//Proxy Send WS


app.listen(port, () => console.log(`Listening on port ${port}`))