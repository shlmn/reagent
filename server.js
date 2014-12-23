var request = require('request');
var cheerio = require('cheerio');
var phantom = require('phantom');
var http = require('http');
var Dropbox = require('dropbox');

var settings = require('./settings.json');
var mainURL = settings.mainURL;
var playerURLPrefix = settings.playerURLPrefix;
var sourceFilePrefix = settings.sourceFilePrefix;
var localPath = settings.localPath;
var tmpPath = settings.tmpPath;
var destinationPath = settings.destinationPath;

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
