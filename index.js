const http = require('http');
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
    Name: "stare",
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

const Headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "GET"
};
http.createServer(async function(Request, Response) {
  let PathEnd = Request.url.indexOf("?");
  if (PathEnd < 0) {
    PathEnd = Request.url.length;
  }
  let Path = Request.url.substring(1, PathEnd).split("/");
  if (Request.method == "POST") {
    let BodyData = "";
    Request.on("data", chunk => {
      BodyData += chunk;
    })
    Request.on("end", () => {
      ProcessData(BodyData);
    })
  } else {
    ProcessData();
  }
  async function ProcessData(Body) {
    try {
      let Status, Data;
      switch (Request.method) {
        case "GET":
          switch (Path[0]) {
            case "lynx":
              switch (Path[1]) {
                case "get":
                  await new Promise(async function(resolve, reject) {
                    https.get(decodeURIComponent(Path[2]).replaceAll("$", "/"), (resp) => {
                      let data = '';
                      resp.on('data', (chunk) => {
                        data += chunk;
                      });
                      resp.on('end', () => {
                        Status = 200;
                        Data = data;
                        resolve();
                      });
                    }).on("error", (err) => {
                      Status = 400;
                      Data = "An Error Occured"
                      resolve();
                    });
                  });
                  break;
                case "post":
                  await new Promise(async function(resolve, reject) {
                    let urlparams = new URL(decodeURIComponent(Path[2]).replaceAll("$", "/"))
                    let postData = JSON.stringify(Path[3]);

                    var options = {
                      hostname: url.orgin,
                      port: 443,
                      path: url.pathname,
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Length': postData.length
                      }
                    };
                    var req = https.request(options, (res) => {
                      console.log('statusCode:', res.statusCode);
                      console.log('headers:', res.headers);
                      res.on('data', (d) => {
                        Status = 200;
                        Data = data;
                        resolve();
                      });
                    }).on('error', (e) => {
                      Status = 400;
                      Data = "An Error Occured"
                      resolve();
                    });
                    req.write(postData);
                    req.end();
                  });
                  break;
                case "send":
                  //ws
                  break;
              }
              break;
            case "cat":
              Status = 200;
              Data = JSON.stringify(cats[Math.floor(Math.random() * cats.length)]);
              break;
            case "docs":
              Status = 200;
              Data = `<!DOCTYPE html>
              <html>
                <head>

                </head>
                <body>
                  <h1>theGoofyCatApi</h1>
                </body>
              </html>
              `
              break;
            default:
              Status = 400;
              Data = "Invalid Request"
          }
          break;
      }
      Response.writeHead(Status, Headers);
      Response.end(Data);
    }
    catch (err) {
      console.log(err)
      Status = 400;
      Data = "An Error Occured"
      Response.writeHead(Status, Headers);
      Response.end(Data);
    }
  }
}).listen(3000);