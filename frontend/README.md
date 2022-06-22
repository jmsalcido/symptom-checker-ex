# Frontend

## Frontend TODO

- [x] create-react-app with typescript
- [x] Home screen for user to decide if just want a lookup or review of results
- [x] Symptom Checker form view
- [x] Search component for looking up symptoms
- [x] Select symptom ui (searchable for now)
- [ ] Remove symptom from selected symptoms

## Improvements for future

- [ ] A better UI for selecting symptoms, instead of searching all of them.
    - Thinkin on a quiz like view, but I would need to order symptoms by frequency or something to be able to show the
      user a list of symptoms related to people... I am thinking on the frequency
- [ ] More images for a better UX, I started looking for images that were "related" to the use case
    - I started looking for images that were "related" to the use case but I lost some time on that, I would totally add
      more images and use calm language for this.

## Structure

```
./frontend/
├── public
└── src
    ├── assets
    │   └── SymptomChecker
    ├── components
    │   ├── Home
    │   ├── Navigation
    │   ├── Results
    │   │   ├── Home
    │   │   └── ResultDetails
    │   ├── SymptomChecker
    │   └── shared
    ├── routes
    ├── services
    └── types
```

Everything resides under `src` folder:

1. `assets` - contains some images used for the look and feel
2. `components` - all the react components should live here, separated it under 3 main categories: `Home`, `Results`
   and `SymptomChecker`
3. `routes` - using `react-dom-router` for handling the routes in the app, so most of the layout of the routes resides there.
4. `services` - mostly logic related to the server communication.
5. `types` - some types from TypeScript to have them separated when used by multiple files/classes/functions.

## Color Palette to follow:

https://www.colourlovers.com/palette/77121/Good_Friends

I think it looks calm, and it could help the entire selection of symptoms related.

## Main Structure:

### Landing/SymptomChecker:

Main page, contains important info on how to use the web app and links to start or review your results.

### Symptoms Selection:

Symptoms page will be a view to select only the symptoms you are experiencing, the data will be filled from the backend.

### Results Home:

Just a page to include your result id for looking up your results from previous runs.

### Results Detail:

This page will contain the details of your matched disorders/diseases.

This page will contain a list of possible diseases ordered from the backend, selected the top 5

----- 

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right
into your project so you have full control over them. All of the commands except `eject` will still work, but they will
point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## Learn More

You can learn more in
the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
