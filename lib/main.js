import DOMNodeCollection from './dom_node_collection';

window.$m = function(arg){
  if(arg instanceof Function) {
    const funcArr = [];
    funcArr.push(arg);
    document.addEventListener("DOMContentLoaded", function(){
      for(let i = 0; i < funcArr.length; i++) {
        funcArr[i]();
      }
     });
  }
  if (typeof arg === 'string') {
    const newArg = [].slice.call(document.querySelectorAll(arg));
    const dom = new DOMNodeCollection(newArg);
    return dom;
  }
  if(arg instanceof HTMLElement) {
    const newArg = [].slice.call(arg);
    const dom = new DOMNodeCollection(newArg);
    return dom;
  }
}

$(() => {
  $m.ajax({
      type: 'GET',
      url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
      success(data) {
        console.log("We have your weather!");
        console.log(data);
      },
      error() {
        console.error("An error occurred.");
      },
   });
});

window.$m.ajax = function(options) {
  const defaults = {
   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
   method: "GET",
   url: "",
   success: () => {},
   error: () => {},
   data: {},
  };

  const keys = Object.keys(options);
  for (let i = 0; i < keys.length; i++) {
    defaults[keys[i]] = options[keys[i]];
  }

  const xhr = new XMLHttpRequest();

  xhr.open(defaults.method, defaults.url);


  xhr.onload = function (response) {
    defaults.success(JSON.parse(this.response));
  };

  const optionalData = defaults.data;
  xhr.send(optionalData);

};
