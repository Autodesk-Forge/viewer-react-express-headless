# Viewer Rocks - React Front End by Jaime Rosales

Visualize 3D objects using our Viewer.

## Setup

### Development mode

Follow these instructions to get the app running locally:

1. run `git clone` this repository
1. `cd` into the project's directory
1. create a file called `server/credentials.js` with your credentials, [follow this template](https://github.com/jaimerosales/viewer-rocks/blob/master/server/credentials_.js)
1. run `npm install`
1. run `npm run watch`

This will get a server running locally, open `http://localhost:3000` on your browser to see the app running.

### Production mode

To run this app in production mode, run `npm run build` and then `npm start` in a production environment.

If you try to deploy this on Heroku, we set a `postinstall` script that will run the `build` script, so there is no need to run it again, simply let Heroku run `npm start` (which it does automatically) and you'll be good to go.

## Heroku Deployment

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/jaimerosales/viewer-rocks)

To deploy this project to Heroku, be sure to set your environment variables in the dashboard:

- `CONSUMER_KEY`
- `CONSUMER_SECRET`

Then be sure to have the [Heroku Toolbelt](https://devcenter.heroku.com/articles/heroku-command-line) installed on your machine and run this command the first time to get things set up:

`heroku git:remote -a [heroku-project-name]`

To deploy, be sure to commit your changes and run:

`git push heroku master`
