# term-project-aherna57-tbonas-ajacks41-ecooperm-


Team members and contributions:
Amanda (aherna57)
Thalia (tbonas)
Alejandro (ajacks41)
Ethan (ecooperm)
Repo link: https://github.com/cs0320-f23/term-project-aherna57-tbonas-ajacks41-ecooperm.git
Estimated completion time: 100 hours


### 1. Functionality/Design


Our program is divided into three packages. The public package contains all of the photos and videos needed for our website. The prisma package contains the data, schema and seed files. Our src package contains all the subfolders for our frontend components.


The data.mjs file within the prisma package is where all of the restaurant data has been manually inputted by our team. Here we export the restaurants, and the restaurant categories and use this data in teh front end to render all of the relevant information about each place such as address, menu, cuisine etc.


Schema.prisma file is used for defining the data model of a database and generating a Prisma client for interacting with that database. Within it, we define a generator named "client" using the Prisma JavaScript client provider. The Prisma client is a set of auto-generated functions that allow you to interact with your database using a type-safe API. The schema defines several models representing different entities in the database, such as Category, Restaurant, RestaurantCategory, Review, and CategoryToRestaurant. Each model has properties (fields) that define the structure of the corresponding database table. The schema includes an index on the authorId field in the Review model and defines a unique constraint on the combination of fields A and B in the CategoryToRestaurant model. The file also contains a pragma section which defines the name of the database table to which the CategoryToRestaurant model is mapped.


The seed.mjs file acts as a script for loading seed data into a database using Prisma. This includes  an asynchronous function named load that will perform the loading of seed data into the database. We have a section that deletes existing data in the database tables for restaurantCategory, review, category, and restaurant. This ensures a clean slate before loading new data. Inside a try-catch block, the script attempts to load new data into the database. If an error occurs, it is caught and logged. If there are no errors, we load new seed data into the database, and establishes relationships between restaurants and categories. 


For our backend implementation, we used....


Our front end consists of all of the tsx files which implement the layout of our website. All of the css is also done in the front end and applied to relevant areas in the tsx file. Within this package, the login, homepage, user profile, sign out and restaurant pages are all rendered.


The core components of our front end and back end are outlined below.


Our Front end contains the following key files, their purpose and relationships are outlined briefly below:


Filterbuttons.tsx:
Effectively, this file creates a filter button with an associated dropdown menu for dynamic filtering based on provided options. It renders the dropdown options conditionally based on the state, improving performance by only rendering when necessary.


RestaurantBox.tsx:
Commented out in integration process as purpose now covered by other files/through backend.


RestaurantAbout.tsx:
The react functional component called RestaurantAbout, which is responsible for displaying detailed information about a restaurant, including cuisine type, phone number, location, and a link to view the restaurant's menu. Additionally, it presents suggestions for similar restaurants with placeholder names for illustration, aiming to provide a structured and visually appealing display of restaurant details and related recommendations. Uses an optional type (recs?: any[]) for the 'recs' prop to indicate that it can be undefined, providing flexibility in prop usage. We use the Link component from Next.js for efficient client-side navigation between restaurant suggestions.


RestaurantList.tsx:
responsible for rendering a list of restaurants. The overall goal is to create a component that generates a visually consistent and ordered display of restaurant information within a container. We used TypeScript types for FullRestaurant and RouterOutputs to ensure type safety and improve code clarity. Here, we also created functions (createStars and createDollarSigns) with Array.from to dynamically generate star and dollar sign icons based on the provided count.


Review.tsx:
Review renders a collection of user reviews. It utilizes mocked review data for illustration and includes sections for the review title, time ago text, restaurant name, star ratings, review text, and an optional review image. Each review is presented within a wrapper container, providing a visually organized and informative representation of user reviews. The overall goal is to display a user's reviews in a visually appealing manne


ReviewR.tsx:
renders a collection of user reviews. It utilizes mocked review data for illustration and includes sections for the review title, time ago text, username, star ratings, review text, and an optional review image. Each review is presented within a wrapper container, providing a visually organized and informative representation of user reviews. Includes an optional review image, enhancing the visual representation of user reviews.


ReviewView.tsx:
Renders an individual user review. It utilizes data from the API response and includes sections for the time ago text, username, star ratings, review text, and an optional review image. Each review is presented within a wrapper container, providing a visually organized and informative representation of a user review. The component is designed for displaying individual reviews in a user interface.


UserAbout.tsx:
UserAbout retrieves and displays user information stored in local storage. It includes sections for the user's bio, email, phone, and location. In case of any parsing errors or missing user data, the component returns a message indicating the absence of user data. Additionally, the component displays a section for restaurant suggestions with placeholder names.


myhome.tsx:
Renders the home page header. The header includes a title and logo that are clickable to navigate to the home page, as well as user information and a profile image. It uses the @clerk/nextjs library for authentication and includes a dropdown menu with a sign-out button. Uses an event handler function (handleHomeClick) to navigate to the home page when the title and logo are clicked.


Result.tsx:
This component takes a set of dynamic props defined by the ResultProps interface and iterates over these props, displaying key-value pairs in a formatted manner within a div. The component is designed to present flexible content, making it suitable for displaying various types of information in a consistent format.


Searchbar.tsx:
The react functional component called SearchBar responsible for rendering a search input with dynamic suggestions. It includes functionality for fetching suggestions based on user input, debouncing the fetch operation, handling input focus and blur events, and displaying suggestions in a dropdown. Here, we utilized the useDebounce custom hook to debounce the fetchData function, preventing rapid consecutive calls and improving performance. We also used fetch suggestions asynchronously based on the input value, enhancing user experience by providing dynamic and timely suggestions.


Home.tsx:
Serves as the main page for a restaurant-related application. It includes features such as a search bar, filter buttons, and a list of restaurants. The component also integrates user authentication using the Clerk library. This component uses dynamic API calls to fetch restaurant data dynamically based on the selected filter option or no option, providing flexibility and reducing unnecessary data fetching. The file integrates user authentication using the Clerk library, handling sign-in and sign-out buttons. We also use the Axios library to fetch data from a dummy API endpoint for search functionality.


[restaurantprofile].tsx:
The purpose of this file is to define a Next.js page component called RestaurantProfile, which represents the profile page of a restaurant. The page includes information about the restaurant, its reviews, and recommendations. Additionally, it provides a form for users to submit reviews. This file includes components such as CreatePostWizard, which allows users to submit reviews, and RestaurantFeed, which displays reviews for a specific restaurant. Additionally, it uses the RestaurantAbout component to show information about the restaurant, and ReviewView to render individual reviews.


Some of the key design features of our front end package are illustrated below.


State management:
The use of state management via React's useState hooks allows us to maintain the state of various variables, this design enables real-time updates to the UI based on user input and interactions. More specific examples of our use of useState hooks includes:


In Filterbuttons.tsx (useState) is employed to manage the visibility of the dropdown and the selected filter option.


In home.tsx, (useState) manages various states, such as selected filter options, active filter categories, and a reset key to trigger a reset of filters.


Effect Hooks:
Effect hooks provide a clear and declarative way to handle side effects. They help in keeping your component logic organized and maintainable, and they align well with React's component-based architecture. Additionally, they improve the separation of concerns by isolating side effects from the rest of the component logic, resulting in cleaner and more maintainable code. In our front end, Filterbuttons.tsx utilizes the useEffect hook to reset the component state when the resetKey prop changes. In Review.tsx there is a useEffect hook that doesn't contain any dependencies.  The absence of dependencies indicates that the effect doesn't depend on any prop or state value.




Interfaces:
Throuhgout our code, we use interfaces to make our code more readable, making it clear what data structures are expected. Also, static typing provided by interfaces helps catch errors during development, reducing the likelihood of runtime errors. Some examples of where interfaces are used in our code is expressed below.


Filterbuttons.tsx, defines a TypeScript interface (FilterButtonsProps) for the component's props to enhance code readability and maintainability. It also defines an interface (SelectedOptions) to represent the selected filter options. Interfaces enable static typing, ensuring that the props provided to the Result component adhere to a specific structure. This helps catch errors during development rather than at runtime.


Searchbar.tsx, defines a TypeScript interface (SearchBarProps) for the component's props to enhance code readability and maintainability. We also created SuggestionItem to describe the structure of suggestion items.


In RestaurantAbout.tsx we defines a TypeScript interface (RestaurantAboutProps) for the component's props to enhance code readability and maintainability.


In result.tsx, the ResultProps interface allows for flexible rendering of key-value pairs within a div.


Conditional Rendering:
Throughout our code, we use conditional rendering to dynamically display content based on certain conditions, creating more flexible and interactive components, improving the user experience. Some examples in our coe are as follows:


For example, in Filterbuttons.tsx, we render the dropdown options conditionally based on the state, improving performance by only rendering when necessary.


In RestaurantAbout, we conditionally render content based on the availability of restaurant data, enhancing the component's robustness.


In home.tsx, we use conditional rendering based on the user's sign-in status to display different content, such as sign-in buttons or the main application interface.


UserAbout.tsx, utilizes conditional rendering to handle cases where certain user information is missing or not available.


Accessibility:
We also included aria labels throughout our code, such as in home.tsx to enhance user accessibility. Additionally, we purposefully rendered our styling using a high contrast colour scheme to make it as firendly for those afflicted with colour blindness as possible. We also used flexboes throughout our code so that our website would be functional and accessible on any screensize and device used.




An explanation of our design choices for our backend package is written below.




### 2. Errors/Bugs:
Based on extensive testing there are currently no known bugs in our code.


### 3. Testing:






### 4. Build and Run:
Upon inputting the command 'npm run dev' into the terminal, the user is able to run both the frontend and back end of our code.


They will be sent to our login page where they will be able to sign in using their brown email. Once signed in, they will be directed to the homepage, where they can search for a specific restaurant by name in the search bar. By default, a list of all the restaurants in our manually created database will appear in alphabetical order. There is a list of dropdown buttons to filter the appearance of the restaurants based on certain user requests, these are listed as a dropdown menu by category. The dropdown menu appears when you click on the buttons. There is also a reset button ont eh right hand side to revert any filters applies. If you click on the name of any restaurnats in the list, you will be directed to the restaurant page. There you will find relevant information about the restaurant, a list of similar restaurant suggestions and be able to see reviews left about the place, including images, a star and written rating. Users also ahve the capacity to add posts here, writing their own and clicking the post button to upload when complete. Additionally, below this filter buttons section, there is also a button where you can click to be directed to a new page which will generate a random "food crawl" itinerary for you. This allows users to have a restaurant plan of sorts to guide their exploration of the providence food scene. If you want to navigate back to the homepage at any stage, you can click the website bear bites icon at the top.  


From the homepage, if you click on the user icon in the top right corner, you will be directed to your login page. There, you will be able to see saved information about your profile registration, including all fo the posts you have made on the platform. You also have the option to sign out of your profile here, which will direct you to the sign in page.


