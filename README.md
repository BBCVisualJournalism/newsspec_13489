#AP Delegate Tracker
This bespoke wraps the AP delegate tracker in an iframe. The iframe responds to a set of element queries to resize the iframes height based off of its width.

#Grunt jobs
* `grunt` - Default task. Builds the content directory from the source. Minifies the JS, generates test.html and app.html and copies over over files.
* `grunt deploy:{stage/live}` - Deploys to the chosen enviroment (Just like the dev-scaffold does).
* `grunt disable` - Overwrite all files with blank files, so that the include can be disabled quickly if we need to. NOTE: You'll still need to deploy and FTP the files.
