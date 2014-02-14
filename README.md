# nodepresskit
> An implementation of [@ramiismail](https://github.com/ramiismail)'s [presskit()](https://github.com/ramiismail/dopresskit) using [Assemble](http://assemble.io) - a Node.js/Grunt.js based static site builder.

## About presskit()

## Differences in nodepresskit

* **No PHP required.** - Removing the need for PHP makes presskit() a fully static site. This means that you can now opt for static site hosting options like Amazon S3 that are significantly cheaper and easier to maintain than shared hosting or a VPS, and rock-solid enough to handle the massive amount of traffic your site will generate.
* **YAML data files.** - YAML offers a cleaner and simpler syntax over XML, making it easier for you to fill in your info and move on with your actual work.
* **Handlebars.js templates.** - Instead of using PHP to generate your site, nodepresskit uses Handlebars.js templates which are far easier to understand if you ever feel the need to customize them.
* **Based on Twitter Bootstrap.** - This is honestly more of a personal preference thing. I just prefer Bootstrap over UIKit and have more experience working with it.

## Quickstart

#### 0. Install NPM
* NPM is included with Node.js - if you don't already have it, you can get it at [http://nodejs.org/](http://nodejs.org/)

#### 1. Download this project
Do *one* of the following:

* [Download][download] a .zip archive of this project.
* From the command line: `git clone git://github.com/chasepettit/nodepresskit.git`

#### 2. Install dependencies
`cd` into this project's directory and run the following command:

````bash
npm install
````

#### 3. Enter your info


#### 4. Build and upload
* To do a final build, just run `grunt` from the command line.
* Upload the contents of the `dist` directory to your server.


## Credits & Thanks

**Rami Ismail** - Author of the original presskit(), Business & Development @ Vlambeer - [Twitter](https://twitter.com/tha_rami), [GitHub](https://github.com/ramiismail)

**Chase Pettit** - Author of nodepresskit - [Twitter](https://twitter.com/chasepettit), [GitHub](https://github.com/chaser324)

The entire indie games community at large for being so incredibly supportive and inspiring.





[download]: https://github.com/chasepettit/nodepresskit/archive/master.zip "Download boilerplate-bootstrap"

