# frontend-challenge

This is the resolution for the [GetNinjas frontend-challenge](https://github.com/getninjas/frontend-challenge), it gets data from a Node.js server and render the form fields on the DOM without any lib.

I really like the most recent EcmaScript features, so this project runs on the most recent browser versions (probably not Safari hahaha), but I left a Babel configuration on Gulp with task to minify the HTML, CSS and JS files to the dist/ folder, the resulting files will work on older browser too.

To start it just run:

```
node server.js
```

And open the public/index.html file or go to `http://localhost:3000` on a modern browser.

Or for older browser just run:

```
npm install
gulp dist
```

To build JavaScript files, change the line 5 on the app.js file from _public_ to _dist_, run `node server.js` and open the generated dist/index.html or go to `http://localhost:3000` on a older browser.
