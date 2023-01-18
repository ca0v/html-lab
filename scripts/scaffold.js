// open the file specified in the command line and inject a templated scaffold
// into it
// usage: node scaffold.js <filename> <scaffoldname>

var fs = require("fs")
var path = require("path")
var util = require("util")

var filename = process.argv[2]
var scaffoldName = process.argv[3]

// open the file
fs.readFile(filename, "utf8", function (err, data) {
  if (err) {
    console.log("Error: " + err)
    return
  }

  // read the scaffold template
  // get the folder of this script
  var folder = path.dirname(process.argv[1])
  fs.readFile(
    path.join(folder, "scaffolds", scaffoldName + ".html"),
    "utf8",
    function (err, scaffold) {
      if (err) {
        console.log("Error: " + err)
        return
      }

      // inject the scaffold into the file,
      // must place this in the document: ///<scaffold/>/
      var result = data.replace(/\/\/\s*<\s*scaffold\s*\/>/, scaffold)

      if (!result.length) result = scaffold

      // write the file
      fs.writeFile(filename, result, "utf8", function (err) {
        if (err) {
          console.log("Error: " + err)
          return
        }

        console.log("Scaffolded " + scaffoldName + " into " + filename)
      })
    }
  )
})
