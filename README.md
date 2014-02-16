# nodepresskit
> An implementation of [@ramiismail](https://github.com/ramiismail)'s [presskit()](https://github.com/ramiismail/dopresskit) using [Assemble](http://assemble.io) - a Node.js/Grunt.js based static site builder.
> *This is currently in active development and should be considered a beta. Please contact Chase Pettit via [e-mail](chasepettit@gmail.com) or [Twitter](https://twitter.com/chasepettit) with any issues or suggestions. Thanks.*

## About presskit()

[presskit()](http://dopresskit.com/) (pronounced 'do presskit') was originally developed by Vlambeer's Rami Ismail to be a quick and easy solution for developers to share everything that the press needs to write timely and well-informed articles.

## Differences in nodepresskit

nodepresskit is derived directly from the original presskit(), but it offers some options that might be preferable for some. Primarily, nodepresskit is intended to make the presskit() site fully static - removing the need for PHP and opening up cheaper, easier, and more robust hosting options such as Amazon S3.

* **No PHP required.** - Removing the need for PHP makes presskit() a fully static site. This means that you can now opt for static site hosting options like Amazon S3 that are significantly cheaper and easier to maintain than shared hosting or a VPS, and rock-solid enough to handle the massive amount of traffic your site will generate.
* **YAML data files.** - YAML offers a cleaner and simpler syntax over XML, making it easier for you to fill in your info and move on with your actual work.
* **Handlebars.js templates.** - Instead of using PHP to generate your site, nodepresskit uses Handlebars.js templates which are far easier to understand if you ever feel the need to customize them.
* **Based on Twitter Bootstrap.** - This is honestly more of a personal preference thing. I just prefer Bootstrap over UIKit and have more experience working with it.

## Quickstart

#### 0. Install NPM & Grunt.js
* NPM is included with Node.js - if you don't already have it, you can get it at [http://nodejs.org/](http://nodejs.org/). Verify your install by running the following command at the command line:

````bash
npm -v
````

* With NPM installed, you can install the Grunt.js CLI (command line interface) by running the following command at the command line:

````bash
npm install -g grunt-cli
````

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

Everything you need to edit is inside of the `data` directory.

* Edit the `company.yml` file with all of the information about your studio. 
* Put all studio relevant photos/screenshots and logos (.jpg/.png/.gif) into the `images` and `logos` directories respectively. Optionally, you can include a single .zip archive in each directory.
* Put a `header.{png/jpg/gif}` image in the `images` directory to be displayed at the top of the page.
* Put videos into the `trailers` directory and edit your `company.yml` file with mp4 tags referring to the individual filenames.

All of your projects live in the `data/games` directory. Refer to the `sample_game` for an example.

* It is recommended that you copy the `sample_game` directory and rename it to the title of your project - all lowercase and replacing whitespace with underscores.
* Edit the `game.yml` file with information about the project.
* Put all screenshots and logos (.jpg/.png/.gif) into the game's `images` and `logos` directories respectively. Optionally, you can include a single .zip archive in each directory.
* Put a `header.{png/jpg/gif}` image in the `images` directory to be displayed at the top of the page.
* Put videos into the `trailers` directory and edit your `game.yml` file with mp4 tags referring to the individual filenames.

#### 4. Build and upload
* To preview your site, run `grunt dev` at the command line and point your browser to http://localhost:8080 (press CTRL-C to stop previewing). 
* To do a final build, just run `grunt` from the command line.
* Upload the contents of the `dist` directory to your server.


## Credits & Thanks

**Rami Ismail** - Author of the original presskit(), Business & Development @ Vlambeer - [Twitter](https://twitter.com/tha_rami), [GitHub](https://github.com/ramiismail)

**Chase Pettit** - Author of nodepresskit - [Twitter](https://twitter.com/chasepettit), [GitHub](https://github.com/chaser324)

The entire indie games community at large for being so incredibly supportive and inspiring.





[download]: https://github.com/Chaser324/nodepresskit/archive/master.zip "Download boilerplate-bootstrap"

