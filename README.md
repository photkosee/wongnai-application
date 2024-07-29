## Table of Contents

- [Background](#background)
- [Project Requirements](#project-requirements)
- [Demonstration](#demonstration)
- [Built With](#built-with)
- [How to run the project](#how-to-run-the-project)
- [How to run jest](#how-to-run-jest)
- [Author](#author)

## Background

This project is an assignment for the LINE MAN Wongnai Frontend Engineer Internship 2023 application.
[Link to project's specification](SPEC-eng.md)

## Project Requirements

- [x] API Gateway endpoints for restaurant and menu data
- [x] Unit tests for said endpoints
- [x] Display details of each menu correctly
- [x] Display restaurant detail correctly
- [x] Can be used well on all screen sizes such as Desktop, Tablet, or Smartphone
- [x] Unit tests for frontend features

#### Extra Requirements

- [x] Ensure good performance and quick respond (I used caching)
- [x] Dynamic route for each restaurant
- [x] Displays the discount for a period of time UI to increase user motivation in purchasing decisions
- [x] Displays the popular menu UI for the top sales menu to increase user motivation in purchasing decisions
- [x] Model that provides further details for each menu
- [x] Make your website faster, even with a lot of images and data that need to be loaded.

## Demonstration
![wongnai-demo](https://github.com/user-attachments/assets/8de83248-84a4-4077-b824-95943e057516)

## Built With

### Backend
  - Express
  - Jest
  - Axios
  - node-cache

### Frontend
  - React 17
  - React Router v6
  - Axios
  - Tailwind CSS

## Reflection

### Caching to Improve API Gateway Performance

Initially, I used the apicache library, which was easy to configure without needing a custom middleware. However, while testing with Jest, I encountered an issue where the server was not closing once the tests were completed. I tried multiple solutions to resolve the issue, even though it wasn’t critical since the code still passed all the unit tests. In the end, I switched to implementing my own cache middleware that integrates with the node-cache library. This time, everything worked just fine.

### Fetching Menu Data

Fetching all menu data at once can take a long time initially (before being cached). I initially set Axios to timeout after 5 seconds, which was not enough to retrieve all the menu details. Since some restaurants have a lot of menus, fetching the details of every menu might not be a good idea (see the endpoints I implemented for the gateway). There might be a better way to design this gateway, but for now, I decided to implement frontend in such a way that it can load up to a specified number of menus and allows users to call a load more function to continue loading the next set of menus. Another approach would be implementing pagination on the server side, which should have a better performance.

### Downgrade dependencies

Since this is quite an old test, it uses React 17, which can have compatibility issues with certain libraries. One such issue arose with the `@testing-library/react` library when I tried to implement unit tests. I ended up downgrading the library to make it work.

### Mistake when implementing unit test for frontend

I encountered an issue while trying to render a component with the render function from `@testing-library/react` to test whether the component displayed all required information. I received the following error:
```
Argument of type 'boolean' is not assignable to parameter of type 'ReactElement<any, string | JSXElementConstructor<any>>'.ts(2345)
```
This error occurred with the following code:
```
render(<MenuCard {...menu} />);
```
spent some time trying to fix the types of input and the way I imported the component, but those were not the actual issues. It turned out that the problem was that the file was not using the .tsx extension, which is necessary for using React components. This oversight happened simply because I hadn't written unit tests for the frontend in so long. But this is a good to to revise it.

## How to run the project

From root directory

1. install all dependencies
```
npm i
```
2. run web and API Gateway in parallel
```
npx lerna run dev --parallel
```

## How to run jest

Once all dependencies are installed, navigate to either the frontend (`./packages/web`) or backend (`./packages/api-gateway`) folders, then run the following command to execute the implemented test cases.
```
npm test
```

## Author

Phot Koseekrainiramon
- [LinkedIn](https://www.linkedin.com/in/phot-kosee/)
- [GitHub](https://github.com/photkosee)
