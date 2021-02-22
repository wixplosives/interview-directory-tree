# Directory Tree

This is a web app that allows a user to view a directory [user-files](user-files) in a browser and to rename files and folders in that directory. It's deployed to a server where multiple users can interact with it.

![Animation](docs/animation.gif?raw=true)

The app can do the following:

-   Display the contents of [user-files](user-files) as a tree (folders always expanded).
-   Allow renaming files and folders by pressing a pencil icon next to their name.
-   Cancel renaming on <kbd>Esc</kbd> press.
-   Confirm renaming on <kbd>Enter</kbd> press or input blur.
-   Show an error when renaming to a file that already exists.

## Your Task

We ask you to launch the app and try using it, then review the code, and suggest bug fixes, code style and structure improvements, user experience improvements.

Focus on these files:

-   [src/server/routes.ts](src/server/routes.ts)
-   [src/client/tree/queries.ts](src/client/tree/queries.ts)
-   [src/client/tree/tree-item.tsx](src/client/tree/tree-item.tsx)

## Running the Project

1. Use Node 14+
2. Run `yarn`
3. Run `yarn start`
4. Open http://localhost:8080

If you make changes to the server code, make sure to restart it.

For linting and automatic code formatting you have `yarn lint` and `yarn prettify`.
