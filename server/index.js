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

const sounds = {
  motor_grafico: 'https://soundcloud.com/user-746329428/motores-graficos-de-jogos/s-V4WP2fkzc3s?in=user-746329428/sets/projeto-und-ii-temas-na-area-1//s-ETnYmYdYEPV',
  design_patterns: 'https://soundcloud.com/user-746329428/design-patterns/s-ZvRa9qzDYei?in=user-746329428/sets/projeto-und-ii-temas-na-area-1//s-ETnYmYdYEPV',
  direct: 'https://soundcloud.com/user-746329428/directcast/s-BrTV8T0D7Kl?in=user-746329428/sets/projeto-und-ii-temas-na-area-1//s-ETnYmYdYEPV',
  dev_cast: 'https://soundcloud.com/user-746329428/devcast/s-0AcVucpLys3?in=user-746329428/sets/projeto-und-ii-temas-na-area-1//s-ETnYmYdYEPV',
}

http
  .createServer(async function (req, res) {
    const { url, method } = req;
    
    const soundToListen = sounds[url];
    
    
    if(soundToListen) {
      debug(`request to listen ${url}`)
      
      const audioStream = await scdl.download(soundToListen);
    
      res.writeHead(200, { "Content-Type": "audio/mpeg" });
      audioStream.on("data", (data) => {
        //debug(data);
        res.write(data);
      });
    }
  })
  .listen(port, host);

debug("Server running at http://" + host + ":" + port + "/");