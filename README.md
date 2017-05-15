# swa-rae
Group Project #1. An app that allows users to create hangouts or parties and allows them to invite friends via Facebook. 

:point_up::point_up::point_up::point_up: <= current build status

# \#pineapplesoda
       ___________________   ___.            __________                   __               __     ____
      /  _____/\__    ___/___\_ |__   ____   \______   \_______  ____    |__| ____   _____/  |_  /_   |
     /   \  ___  |    |_/ ___\| __ \_/ ___\   |     ___/\_  __ \/  _ \   |  |/ __ \_/ ___\   __\  |   |
     \    \_\  \ |    |\  \___| \_\ \  \___   |    |     |  | \(  <_> )  |  \  ___/\  \___|  |    |   |
      \______  / |____| \___  >___  /\___  >  |____|     |__|   \____/\__|  |\___  >\___  >__|    |___|
             \/             \/    \/     \/                          \______|    \/     \/

Use Several APIS

## Live demo:

[http://soiree.homuncul.us](http://soiree.homuncul.us)

@fry
@les
@jcmcmorris1
@robzter


![#pineapplesoda](http://gt.bootcampcontent.com/pineapplesoda/project-one/raw/master/public/media/pineapplesoda.png)

## Project Description / feature list

An app to spin up spontaneous parties with your friends and their friends.  Specify where the party is, share it socially and accept it.  Stretch goals are Spotify playlist for the party and a uber ride request.

1. Facebook SignIn
    https://www.npmjs.com/package/passport-facebook
2. Post to Facebook
    https://www.npmjs.com/package/fb
3. Tag People
4. Choose a Location
5. RSVP
6. See RSVP on map
7. Create a Playlist
8. Add to Playlist
    https://github.com/thelinmichael/spotify-web-api-node
9. Limit a party size/Respect party size limit
10. See RSVP List
11. Request Uber Ride
    https://www.npmjs.com/package/node-uber

## Non-negotiable Project Requirements:
### 1. Must uses at least two APIs
        three.js, d3.js, google apis, twitter, youtube, reddit, ?
### 2. Must use AJAX to pull data
### 3. Must utilize at least one new library or technology that we haven't discussed
        skeleton, socket.io, ?
### 4. Must have a polished frontend / UI
        shouldn't be too hard once we decide what to do
### 5. Must meet good quality coding standards (indentation, scoping, naming, comments)
        ez, jsFormat, psudocode with comments, use good names
### 6. Must NOT use alerts, confirms, or prompts (look into modals! hint: bootstrap)
        ez
### 7. Must have some sort of repeating element (table, columns, etc)
        this will undoubtedly be required one way or another
### 8. Must use Bootstrap or Alternative CSS Framework
        skeleton, anime.js, some crazy sass shi^Wstuff
### 9. Must be Deployed (Heroku and/or Firebase)
        shouldn't be too difficult
### 10. Must have User Input Validation
        ";TRUE=TRUE

### how to contribute:

     # if you're grabbing the project for the first time:
        git clone git@gt.bootcampcontent.com:pineapplesoda/project-one.git

     # else if you're starting some new work, grab info about any new branches from the remote/upstream:
        git fetch --all

     # switch to the dev branch
        git checkout dev

     # to create a NEW branch (say, for a new feature):
        git checkout -b new-branch-name

     # to check out an already EXISTING branch (to continue where you/someone left off):
        git checkout existing-branch-name

     # or if you want to pull in any new changes on the branch you're already on, do:
        git pull

     # after you've made your changes, push them upstream
        git push origin your-branch-name


*   the stuff in the scope of the current class project is in project-one/public/
*   main page is public/index.html
*   js lives in public/js/
*   css lives in public/css/

### Want to view/run this locally?

open public/index.html in your browser of choice

or for the server bits:

     # you're gonna need nodejs (https://nodejs.org/en/)
     npm install
     npm start

     # to run the tests:
     npm test

assign the merge request to @fry and it'll get into master promptly






