# Snake Your Friend's Snakes

Live deployed demo can be found [here](https://real-time-web-lhlbqzzcsq.now.sh/).

## Table of Contents

<!-- TOC -->

* [Snake Your Friend's Snakes](#snake-your-friends-snakes)
  * [Table of Contents](#table-of-contents)
  * [Project Description](#project-description)
  * [Getting Started](#getting-started)
    * [Installing](#installing)
    * [Usage](#usage)
  * [Functionality](#functionality)
  * [Technologies Used](#technologies-used)
  * [Controls](#controls)
  * [Known Issues & Future Plans](#known-issues--future-plans)

<!-- /TOC -->

![Cover Image](./cover.png)

## Project Description

Welcome to `Snake Your Friend's Snakes` the chat game, a multiplayer snake game where your input influences the other player's snakes as well! Here the objective is to score as many points as you can by eating the red squares/fruits while preventing your competition from doing so. Of course, you can insult your friends through the chat functionality as well!

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

After cloning the repository you can install the required dependencies using npm:

```javascript
$ npm install
```

### Usage

In order to launch a development environment:

```javascript
$ npm start
```

Then, visit `localhost:3000`, send your friends a link and start _absolutely demolishing_ them.

## Functionality

* Control your own snake!
* Smack talk your opponents
* A simple emoji & tag system
* Have your own unique username, or go anonymous
* Sabotage your friends by influencing their snake's movement
* See how you and your opponents are doing through a scoreboard

## Technologies Used

This application is real-time by leveraging the power of `socket.io` a web-sockets implementation for `node.js`.

Furthermore, this project uses the `pug` templating language, because well, i [_really_](https://jamerrone.github.io/wafs/app/#home) like dogs.

## Controls

As the controls aren't currently documented, here is a simple controls map.

| **Control** | **Command** |
| :---------: | ----------- |
|      ↑      | /up         |
|      ↓      | /down       |
|      ←      | /left       |
|      →      | /right      |

## Known Issues & Future Plans

* The current UI is not user-friendly, and simply ugly.
* Add a help function that explains the game controls.
* Usernames are not unique, two users can share the same username.
* Usernames are not linked to the socket ID, this means that whenever a user leaves the game there username and score are kept.
* No database or local files are being used, everything is saved in the server memory.
