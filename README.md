# setup
Run `npm install` to get dependencies listed in `package.json`. Run `./utils/install.sh` to get this thing updating on boot for systems with `systemd`.  Then create a `Settings.js` file based on `Settings.default.js`.

# add a new update
Place an entry in `./data/updates.json` and an associated script in the `./updates/` folder.  Commit and push to github.
