# NPM Shell Login

Whenever you're using a CI service, or containers, you may face the problem of login to npm. The usually offered solution to do `npm login -e | echo ...` doesn't work on all shells. This package offers a reliable solution to perform npm login in any shell, from any script.

## Usage

- define environment variables for your credentials :

```bash
# replace ~/bash_profile with ~/.zshrc if you're using zsh
# fill in the <values below>

$ echo "export NPM_USER=<npm_username>" >> ~/.bash_profile
$ echo "export NPM_PASS=<npm_password>" >> ~/.bash_profile
$ echo "export NPM_EMAIL=<npm_email>" >> ~/.bash_profile
$ source ~/.bash_profile
```

- make sure you have node ^8.11.3 and npm ^5.5.0
- run `$ npx npm-shell-login`

If the command is successful, you are logged in to npm, and it will output the npm token created by the login process in your `~/.npmrc` file should you need it somewhere else

You can also use this in another js script:

```javascript
const { npmLogin, getNPMToken } = require("npm-shell-login");

// npmLogin returns a promise which resolves with the response code from
// the login process
// if it's 0, all went well, if not, the login failed
// it will only reject if the child process times out (20 seconds)
const code = await npmLogin();
if (code === 0) { /* yay ! */ }
else { /* oh no ! */ }


// getNPMToken will return a promise with the token from your ~/.npmrc file
const token = await getNPMToken();
```

## Contributing

PRs for bug fixes, enhancements and new features are welcome !

Simply clone the repo, and run `yarn` to install dependencies. You can run the script locally by running `$ node index.js`
