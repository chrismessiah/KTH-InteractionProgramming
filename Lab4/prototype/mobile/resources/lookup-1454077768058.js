(function(window, undefined) {
  var dictionary = {
    "10001b47-0d57-4cc7-abc7-c89ffd1a2506": "Appetizer",
    "26f12980-90c6-4a30-9679-9b49cfc7421e": "Main Course",
    "d12245cc-1680-458d-89dd-4f0d7fb22724": "Index",
    "91d307d8-8aa3-4aa3-8dac-6dc9bfa3b36f": "Dessert",
    "e3bc5c7f-9524-4d2b-bc4b-a5d228bb6946": "Recepie",
    "79e0304b-3de1-4dde-bc5e-59a938f112e6": "Menu",
    "87db3cf7-6bd4-40c3-b29c-45680fb11462": "960 grid - 16 columns",
    "e5f958a4-53ae-426e-8c05-2f7d8e00b762": "960 grid - 12 columns",
    "f39803f7-df02-4169-93eb-7547fb8c961a": "Template 1"
  };

  var uriRE = /^(\/#)?(screens|templates|masters)\/(.*)(\.html)?/;
  window.lookUpURL = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, url;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      url = folder + "/" + canvas;
    }
    return url;
  };

  window.lookUpName = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, canvasName;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      canvasName = dictionary[canvas];
    }
    return canvasName;
  };
})(window);