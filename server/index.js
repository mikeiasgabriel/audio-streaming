const http = require("http");
const port = 8888;
const host = "localhost";

const scdlCreate = require('soundcloud-downloader').create;
const axios = require('axios').default
const debug = require('debug')('http')

const SOUNDCLOUD_URL = 'https://soundcloud.com/user-746329428/devcast/s-0AcVucpLys3?in=user-746329428/sets/projeto-und-ii-temas-na-area-1//s-ETnYmYdYEPV'
const CLIENT_ID = 'yGulQnndmijePkC8RlDVWKoK8FMaMUnk'

const scdl = scdlCreate({
  clientID: CLIENT_ID,
  saveClientID: true,
  filePath: './client_id.json',
  axiosInstance: axios.create()
})

http
  .createServer(async function (req, res) {
    const { url, method } = req;
    
    const audioStream = await scdl.download(SOUNDCLOUD_URL);
    

    res.writeHead(200, { "Content-Type": "audio/mpeg" });
    audioStream.on("data", (data) => {
      //debug(data);
      res.write(data);
    });
  })
  .listen(port, host);

debug("Server running at http://" + host + ":" + port + "/");