# Frontend Assignment 2022

## "What to Order" Assignment 

### Task 1 API Gateway

Normally Software Engineer, Frontend at LINE MAN Wongnai will be responsible for Web application and API Gateway, which is the single entry point for all clients and composition of microservices in our infrastructure.

In this task, you have to develop an API Gateway to retrieve data from the provided JSON Data, with the requirement discussed in the next section.

#### Requirements

**Create API Gateway by using Typescript**

- [x] Create various endpoints and send data back so that the web can be displayed according to the design that is defined correctly.
- [x] Write a unit test for each endpoint created and ensures that each endpoint is always available and working properly


#### Extra Requirements

- [x] Make sure each endpoint has good performance and can respond quickly.

#### JSON Data Spec

- Restaurant `https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/:restaurantId.json`

```
{
 "name": string
 "id": number
 "coverImage": string
 "menus: string[]
 "activeTimePeriod": {
    open: string
    close: string
  }
}
```

| Field | Description |
| ------ | ------ |
| name | Restaurant Name |
| id | Restaurant ID |
| coverImage | Restaurant Cover Photo |
| menus | Restaurant Menus |
| activeTimePeriod.open | Restaurant Opening Hour |
| activeTimePeriod.close | Restaurant Closing Hour |

- Short Menu `https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/:restaurantId/menus/:menuName/short.json`

```
{
 "name": string
 "id": string
 "thumbnailImage"?: string
 "fullPrice": number
 "discountedPercent": number
 "discountedTimePeriod"?: {
    "begin": string
    "end": string
  }
 "sold": number
 "totalInStock": number
}
```

| Field | Description |
| ------ | ------ |
| name | Menu |
| id | Menu ID |
| thumbnailImage | Menu Cover Photo |
| fullPrice | Menu Price |
| discountedPercent | Menu Discount Percentage |
| discountedTimePeriod.begin | Discount Starting Time |
| discountedTimePeriod.end | Discount Ending Time |
| sold | Number of Menu Sold |
| totalInStock | Number of Menu Total Stock |

- Full Menu `https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/:restaurantId/menus/:menuName/full.json`

```
{
 "name": string
 "id": string
 "thumbnailImage"?: string
 "fullPrice": number
 "discountedPercent": number
 "discountedTimePeriod"?: {
    "begin": string
    "end": string
  }
 "sold": number
 "totalInStock": number
 "largeImage"?: string
 "options": {
    "label": string
    "choices": {
      "label": string
    }[]
  }[]
}
```

| Field | Description |
| ------ | ------ |
| name | Menu |
| id | Menu ID |
| thumbnailImage | Menu Cover Photo |
| fullPrice | Menu Price |
| discountedPercent | Menu Discount Percentage |
| discountedTimePeriod.begin | Discount Starting Time |
| discountedTimePeriod.end | Discount Ending Time |
| sold | Number of Menu Sold |
| totalInStock | Number of Menu Total Stock |
| largeImage | Large Menu Photo |
| options[].label | Header Section of Menu Options Ex. Choose the type of meat |
| options[].choices[].label | Choice of Menu Options Ex. Pork, Chicken |

We have prepared an API Server, https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api, for your API Gateway to be developed.

There are 2 restaurants with the following ID:

- 567051 (ร้านลืมเคี้ยว)
- 227018 (Ekkamai Macchiato - Home Brewer)

### Task 2 React Web Application

![](https://i.imgur.com/Xb7v6YT.png)

Creating a web application is the main job that Software Engineer, Frontend at LINE MAN Wongnai is passionate about. Our core web technology is React.

In this task, we need to create a React web application for reading menus when going to a restaurant. To help our users reduce the risk of spreading COVID-19 by ordering food at the restaurant without touching the menu book.

For a better application, we always think about User Experience (UX) by allowing the web application to be added and modified differently from the design provided to improve the UX/UI of the website.

#### Requirements

**Create Web Application by using React and Typescript**

Create a web application for displaying menus with good UX in mind. Users will feel that using menus through this website is more comfortable than using a menu book on a dining table. By connecting your web application to the API Gateway that you created in task 1 to bring the data to display and create various features as specified

The web application must be able to perform all of the following features:

- [x] Display details of each menu correctly
- [x] Display restaurant detail correctly
- [x] Can be used well on all screen sizes such as Desktop, Tablet, or Smartphone

And to control the quality of the code that will be sent to the user, we will need to do the following:

- [x] Write a unit test to ensure that all features are working properly.

Our main focus is to provide convenience to users. You can freely add other features in addition to the features mentioned above to create a better user experience and increase sales for the restaurant that uses your web application.

#### Extra Requirements

This is the part that if we do, it will help the UX even better.

- [x] Displays the discount for a period of time UI to increase user motivation in purchasing decisions
- [x] Displays the popular menu UI for the top sales menu to increase user motivation in purchasing decisions
- [x] Make your website faster, even with a lot of images and data that need to be loaded.

### Grading Criteria

- [ ] Website can work properly according to all requirements mentioned above.
- [ ] Proficiency in Javascript, Typescript, and React
- [ ] Good Developer Experience, Is the written code difficult to develop in the future?
- [ ] Website performance
- [ ] Website has good UX/UI, and users can use the website smoothly.
 
###  Run project

We have already an initial project for API Gateway and Web application. You have to develop both API Gateway and Web application based on all the tasks mentioned above. We will run the project you submitted by using this script, please make sure this script can run both projects at the root folder correctly.

1. install all dependencies
```
yarn
```

2. run web and API Gateway in parallel
```
npx lerna run dev --parallel
```

## Demonstration
![wongnai-demo](https://github.com/user-attachments/assets/8de83248-84a4-4077-b824-95943e057516)

## Built With

### Backend
  - Express 4
  - Axios
  - node-cache
  - Test with Jest and supertest

### Frontend
  - React 17
  - React Router v6
  - Axios
  - Tailwind CSS
  - react-intersection-observer
  - Test with Jest and React Testing Library

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

## How to run jest

Once all dependencies are installed, navigate to either the frontend (`./packages/web`) or backend (`./packages/api-gateway`) folders, then run the following command to execute the implemented test cases.
```
npm run test
```
