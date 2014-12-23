var request = require('request');
var cheerio = require('cheerio');
var phantom = require('phantom');
var http = require('http');

var settings = require('./settings.json');
var mainURL = settings.mainURL;
var area = settings.preferences.area;
var city = settings.preferences.city;
var neighborhood = settings.preferences.neighborhood;
var type = settings.preferences.type;
var fromRooms = settings.preferences.fromRooms;
var untilRooms = settings.preferences.untilRooms;
var fromPrice = settings.preferences.fromPrice;
var topPrice = settings.preferences.topPrice;
var priceType = settings.preferences.priceType;
var fromSquareMeter = settings.preferences.fromSquareMeter;
var topSquareMeter = settings.preferences.topSquareMeter;
var parking = settings.preferences.parking;
var elevator = settings.preferences.elevator;
var fromFloor = settings.preferences.fromFloor;
var topFloor = settings.preferences.topFloor;
var streetId = settings.preferences.street;


var curURI = "";

for (i in settings.streets) {

    curURI =  mainURL + "?" +
    area[0] + "=" + area[1] + "&" +
    city[0] + "=" + encodeHeb(city[1]) + "&" +
    neighborhood[0] + "=" + neighborhood[1] + "&" +
    fromRooms[0] + "=" + fromRooms[1] + "&" +
    untilRooms[0] + "=" + untilRooms[1] + "&" +
    fromPrice[0] + "=" + fromPrice[1] + "&" +
    topPrice[0] + "=" + topPrice[1] + "&" +
    priceType[0] + "=" + priceType[1] + "&" +
    fromSquareMeter[0] + "=" + fromSquareMeter[1] + "&" +
    topSquareMeter[0] + "=" + topSquareMeter[1] + "&" +
    parking[0] + "=" + parking[1] + "&" +
    elevator[0] + "=" + elevator[1] + "&" +
    fromFloor[0] + "=" + fromFloor[1] + "&" +
    topFloor[0] + "=" + topFloor[1] + "&" +
    streetId[0] + "=" + encodeHeb(settings.streets[i]);

    console.log(curURI);


};

/*


var latestDownloadDetailsFile = 'latest-download.json';
var latestDownloadDetails = { fileName : "", path : tmpPath, playerURL : ""};

var fs = require("fs");

getPage(mainURL, function(err,html) {

  saveHTML(settings.latestMainHTML,html);

  var $ = cheerio.load(html);
  $('tbody tr a').filter(function(){

    // Let's store the data we filter into a variable so we can easily see what's going on.
    var data = $(this);

    // Navigate and get the text from:
    // <tr><td width="100%" align="right" valign="bottom" height="40"><a href="javascript:PlayThisSong('3261','1');"><img src="/images/but_leazana.gif" width="157" height="39" border="0">

    var fileId = data.children()[0].parent.attribs.href.split('\'')[1];
    var playerURL = playerURLPrefix + fileId;
    getPage(playerURL, function(err,html) {
      $ = cheerio.load(html);
      $('table tr td script').filter(function(){
        data = $(this);

        var sourceFile = data.html().split("\'file\':")[1].split("\'")[1].split('/')[2];
        var sourceFileURL = sourceFilePrefix + sourceFile;
        console.log("***" + sourceFile);

        console.log(localPath + latestDownloadDetailsFile);
        var latestDownloadDetails = require(localPath + latestDownloadDetailsFile);

        if (sourceFile == latestDownloadDetails.fileName) {
          console.log("File already exists: " + latestDownloadDetails.fileName);
        } else {
          console.log("Downloading: " + sourceFile);

          downloadFile(sourceFileURL, tmpPath, sourceFile, function(err) {
            if(err) {
              console.log(err);
            }
            else {
              console.log("finished download");
              latestDownloadDetails.fileName = sourceFile;
              latestDownloadDetails.playerURL = playerURL;
              fs.writeFile(localPath + latestDownloadDetailsFile, JSON.stringify(latestDownloadDetails, null, 4), function(err){
                if (err) {
                  console.log(err);
                } else {
                  console.log('File successfully written! - Check your project directory for the output.json file');
                };
              });
              var src = tmpPath + sourceFile;
              var dest = destinationPath + sourceFile;
              console.log("*** * " + src);
              var mv = require('mv');

              mv(src, dest, function(err) {
                // handle the error
              });
              console.log("*** *" + dest);
            };
            console.log("***end***");
          });
        };
      });
    });
  });
});



function getPage(url, callback) {
  phantom.create(function (ph) {
    ph.createPage(function (page) {
      page.open(url, function () {
        page.evaluate(function () {return document.documentElement.innerHTML;}, function(result) {
          ph.exit();
          callback(null, result);
        });
      });
    });
  });
};


function handleResult(err, result) {
  if (err) {
    // Just an example. You may want to do something with the error.
    console.error(err.stack || err.message);

    // You should return in this branch, since there is no result to use
    // later and that could cause an exception.
//    ret = result;
    return;
  };
//  console.log(result);
  return(result);

  // All your logic with the result.
};


function downloadFile(source, path, fileName, callback){
  console.log("*** " + source);
  var file = fs.createWriteStream(path+fileName);

  var req = request.get(source).pipe(file);
  req.on('finish', function(){
    console.log('File downloaded.');
    callback(null);
  });
};


function saveHTML(fileName, html) {
  fs.writeFile(fileName, html, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("The file was saved!");
    };
  });

};
*/

function encodeHeb(q){
  q=q.replace(/א/gi,"%E0");
  q=q.replace(/ב/gi,"%E1");
  q=q.replace(/ג/gi,"%E2");
  q=q.replace(/ד/gi,"%E3");
  q=q.replace(/ה/gi,"%E4");
  q=q.replace(/ו/gi,"%E5");
  q=q.replace(/ז/gi,"%E6");
  q=q.replace(/ח/gi,"%E7");
  q=q.replace(/ט/gi,"%E8");
  q=q.replace(/י/gi,"%E9");
  q=q.replace(/כ/gi,"%EB");
  q=q.replace(/ך/gi,"%EA");
  q=q.replace(/ל/gi,"%EC");
  q=q.replace(/מ/gi,"%EE");
  q=q.replace(/ם/gi,"%ED");
  q=q.replace(/נ/gi,"%F0");
  q=q.replace(/ן/gi,"%EF");
  q=q.replace(/ס/gi,"%F1");
  q=q.replace(/ע/gi,"%F2");
  q=q.replace(/פ/gi,"%F4");
  q=q.replace(/ף/gi,"%F3");
  q=q.replace(/צ/gi,"%F6");
  q=q.replace(/ץ/gi,"%F5");
  q=q.replace(/ק/gi,"%F7");
  q=q.replace(/ר/gi,"%F8");
  q=q.replace(/ש/gi,"%F9");
  q=q.replace(/ת/gi,"%FA");
  q=q.replace(/ /gi,"+");
  return (q);
}
