(function (global) {

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        "rxjs": {
            defaultExtension: "js"
        },
        "dist": {
            defaultExtension: "js",
            format: "register"
        }
    };

    var packageNames = [
        "@angular/common",
        "@angular/compiler",
        "@angular/core",
        "@angular/http",
        "@angular/platform-browser",
        "@angular/platform-browser-dynamic",
        "@angular/router",
        "@angular/router-deprecated",
        "@angular/testing",
        "@angular/upgrade"
    ];

    // add package entries for angular packages in the form "@angular/common": { main: "index.js", defaultExtension: "js" }
    packageNames.forEach(function (pkgName) {
        packages[pkgName] = {main: "index.js", defaultExtension: "js"};
    });

    var config = {
        paths: {
            "@angular": "node_modules/@angular",
            "rxjs/*": "node_modules/rxjs/*",
            "reflect-metadata": "node_modules/reflect-metadata"

        },
        map: {
            "rxjs": "node_modules/rxjs"
        },
        packages: packages
    };

    // filterSystemConfig - index.html"s chance to modify config before we register it.
    if (global.filterSystemConfig) {
        global.filterSystemConfig(config);
    }

    System.config(config);

})(this);