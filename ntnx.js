/*jshint esversion: 6 */

var request = require('request');

global.ntnx_con = {
 cluster  : "",
 username : "",
 password : "",
};

exports.cluster_list = function () {
  var req = post("clusters/list",{ "kind" : "cluster" });
  };

function cluster_list_show(response) {
  MainWin.webContents.send('ntnx:cluster_name',response.body.entities[0].status.name);
}

// get Nutanix v3 API URL
function get_v3_URL() {
   return 'https://' + ntnx_con.cluster + ':9440/api/nutanix/v3/';
}

// get Nutanix v2 API URL
function get_v2_URL() {
   return 'https://' + ntnx_con.cluster + ':9440/PrismGateway/services/rest/v2.0/';
}

// get BasicAuth
function get_BasicAuth() {
   return 'Basic ' + new Buffer(ntnx_con.username + ':' + ntnx_con.password).toString('base64');
}

function handle_error(error) {
 if (error) {
  console.log("ERROR: ",error);
  return false;
 }
 else {
   return true;
 }
}

function handle_statusCode(statusCode) {
  if (statusCode < 200 || statusCode >= 300)  {
      console.log("ERROR: ",statusCode);
      return false;
  }
  else {
    return true;
  }
}


function post(resource, payload) {
  // Ignore self signed-certificates
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  var options = {
   url: get_v3_URL() + resource,
   method: 'POST',
   headers: {
       "Authorization" :  get_BasicAuth(),
       "Content-Type":    "application/json"
   },
   json:  payload
  };

  request(options , function (error, response, body) {
          // Do more stuff with 'body' here
          if (handle_error(error)) {
            if (handle_statusCode(response.statusCode)) {
              cluster_list_show(response);
            }
          }
   });
}
