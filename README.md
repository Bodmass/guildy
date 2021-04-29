# Guildy (In Development) 
![GitHub Logo](/public/images/guildy/guildyLogo.png)
- App
  - https://github.com/Bodmass/guildy
  - https://guildywow.herokuapp.com
  
# Features
- [x] Login with your Battle.net Account 
- [ ] View your Guilds Calendar
- [ ] View Ingame Events
- [ ] Create Custom Events
- [ ] Create Raid Rosters
- [ ] Post scheduled Event (and Roster) Announcements via Webhook 
- [ ] and more planned!

# Install
```node
git@github.com:bodmass/guildy.git
cd guildy
yarn
```

# Scripts

Script | Description
------------ | -------------
dev | Starts the local development server on http://localhost:3000 (Port can be changed)
build | Builds
start | Starts built server
prettier | runs [prettier](https://github.com/prettier/prettier) agaisnt project
lint | runs [eslint](https://github.com/eslint/eslint) agaisnt project

# Config

Environment Variable | Description
------------ | -------------
BLIZZARD_CLIENT_ID | OAuth ID for Battle.net
BLIZZARD_CLIENT_SECRET | OAuth Secret for Battle.net
NEXT_PUBLIC_URL | URL to send to Battle.net for Redirect
JWTSECRET | Secret to verify JWT

Visit the [Blizzard Battle.net Developer Portal](https://develop.battle.net/) to obtain your own Blizzard API credentials.




