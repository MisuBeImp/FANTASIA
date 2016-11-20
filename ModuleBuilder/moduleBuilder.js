module.exports.createModule = createModule;
var fileSystem = require('fs');
var progressBar = require('./projgressBar.js');
var helper = require('./FindDirectory.js');
var path = require('path');
var colors = require('colors');


function createModule() {
    var moduleOption = process.argv[2];
    var moduleName = process.argv[3];
    var additionalOption = process.argv[4];
    var baseURL = process.argv[5];
    if (moduleOption) {
        if (moduleOption === '-h' || moduleOption === '--help') {
            showHelpInformation();
        }
        if (moduleName) {
            console.log(("command accepted").green.bold);
            if (moduleOption === '-c') {
                progressBar.startProgressBar("Controller", 50);
                createController(moduleName);
            } else if (moduleOption === '-d') {
                progressBar.startProgressBar("Directive", 50);
                createDirective(moduleName);
            } else if (moduleOption === '-f') {
                progressBar.startProgressBar("Factory", 50);
                createFactory(moduleName);
            } else if (moduleOption === '-s') {
                progressBar.startProgressBar("Service", 50);
                createService(moduleName);
            } else if (moduleOption === '-rs') {
                if (additionalOption === '-u') {
                    if (baseURL) {
                        progressBar.startProgressBar("Rest Service", 80);
                        createRESTService(moduleName, baseURL);
                    } else {
                        console.log(("must have the the base url").red.bold);
                    }
                } else {
                    console.log(("must have the the base url option").red.bold);
                }
            }
            else if (moduleOption === '-v') {
                progressBar.startProgressBar("View", 50);
                createViewFile(moduleName);
            } else if (moduleOption === '--help' || moduleOption === '-h') {
                showHelpInformation();
            }
        } else {
            console.log(("must have the module name").red.bold);
        }
    } else {
        console.log(("must have the module option").red.bold);
    }
}


function showHelpInformation() {
    console.log([
        'usage: ng-module option moduleName',
        '',
        'options:',
        '  -c                                create controller',
        '  -d                                create custome directive',
        '  -f                                create fatory',
        '  -s                                create service',
        '  -rs modelName -u baseURL          create rest service',
        '  -h --help                         Print this list and exit.'
    ].join('\n').green.bold);
    process.exit();
}

function createController(name) {
    fileSystem.readFile(__dirname + '/template/controller.txt', 'utf8', readData);
    function readData(error, data) {
        if (error) {
            return console.log(error);
        }
        var updatedDate = getUpdateData(data, name);
        fileSystem.writeFile(name.toLowerCase() + '.controller.js', updatedDate, 'utf8', writeData);
        function writeData(error) {
            if (error) {
                return console.log(error);
            }
        }

        function getUpdateData(data, name) {
            name = name.toLowerCase();
            var updatedList = data.replace(/controllerName/g, name + 'Controller');
            return updatedList;
        }
    }
}
function createRESTService(name, baseURL) {
    fileSystem.readFile(__dirname + '/template/rest-service.txt', 'utf8', readData);
    function readData(error, data) {
        if (error) {
            return console.log(error);
        }
        var updatedDate = getUpdateData(data, name);
        fileSystem.writeFile(name.toLowerCase() + '.rest.service.js', updatedDate, 'utf8', writeData);
        function writeData(error) {
            if (error) {
                return console.log(error);
            }
        }

        function getUpdateData(data, name) {
            var updatedList = data.replace(/serviceName/g, name.toLowerCase() + 'RestService');
            updatedList = updatedList.replace(/XXX/g, name);
            updatedList = updatedList.replace(/BASEURL/g, baseURL);
            return updatedList;
        }
    }
}
function createDirective(name) {
    fileSystem.readFile(__dirname + '/template/directive.txt', 'utf8', readData);
    function readData(error, data) {
        if (error) {
            return console.log(error);
        }
        var updatedDate = getUpdateData(data, name);
        fileSystem.writeFile(name.toLowerCase() + '.directive.js', updatedDate, 'utf8', writeData);
        function writeData(error) {
            if (error) {
                return console.log(error);
            }
        }

        function getUpdateData(data, name) {
            name = name.toLowerCase();
            var updatedList = data.replace(/directiveName/g, name);
            return updatedList;
        }
    }
}
function createService(name) {
    fileSystem.readFile(__dirname + '/template/service.txt', 'utf8', readData);
    function readData(error, data) {
        if (error) {
            return console.log(error);
        }
        var updatedDate = getUpdateData(data, name);
        fileSystem.writeFile(name.toLowerCase() + '.service.js', updatedDate, 'utf8', writeData);
        function writeData(error) {
            if (error) {
                return console.log(error);
            }
        }

        function getUpdateData(data, name) {
            name = name.toLowerCase();
            var updatedList = data.replace(/serviceName/g, name + 'Service');
            return updatedList;
        }
    }
}
function createFactory(name) {
    fileSystem.readFile(__dirname + '/template/factory.txt', 'utf8', readData);
    function readData(error, data) {
        if (error) {
            return console.log(error);
        }
        var updatedDate = getUpdateData(data, name);
        fileSystem.writeFile(name.toLowerCase() + '.factory.js', updatedDate, 'utf8', writeData);
        function writeData(error) {
            if (error) {
                return console.log(error);
            }
        }

        function getUpdateData(data, name) {
            name = name.toLowerCase();
            var updatedList = data.replace(/factoryName/g, name + 'Factory');
            return updatedList;
        }
    }
}
function createViewFile(name) {
    fileSystem.readFile(__dirname + '/template/view.txt', 'utf8', readData);
    function readData(error, data) {
        if (error) {
            return console.log(error);
        }
        fileSystem.writeFile(name.toLowerCase() + '.view.html', data, 'utf8', writeData);
        function writeData(error) {
            if (error) {
                return console.log(error);
            }
        }
    }

}