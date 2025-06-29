# CS-465
## Architecture

The Travlr project was built using the **MEAN stack** (MongoDB, Express, Angular, Node.js) and features two distinct front-end architectures. The customer-facing side is a classic server-side rendered application built with **Express and Handlebars**. In this model, the server handles all logic and sends complete HTML pages to the browser for each request.

In contrast, the administrative side is a modern **Single-Page Application (SPA)** built with Angular. This client-side architecture is highly modular, composed of self-contained components and services. The entire application is loaded once, and subsequent interactions are handled dynamically in the browser, providing a faster and more fluid user experience by only fetching raw data from the API as needed.

The decision to use a NoSQL database like **MongoDB** for the back-end was driven by its flexibility and scalability, which are ideal for web applications where data structures may change over time. Unlike traditional SQL databases that require a rigid, predefined schema, MongoDB's document-based model allows for storing complex data, like our nested trip information, in a more natural, JSON-like format. This structure simplifies development by aligning closely with the JavaScript objects used throughout the application, from the Express server to the Angular front-end, making data manipulation more intuitive.

## Functionality

Throughout this project, **JSON** served as the universal language for data exchange, acting as the link between the front-end and back-end. While JavaScript is a full programming language with functions and logic, JSON is purely a text-based data format. The Express API would fetch trip data from MongoDB, convert it into JSON format, and send it over the network. The Angular front-end would then receive this JSON and parse it back into JavaScript objects to be used within its components, creating a seamless data pipeline.

**Refactoring** was a constant and essential practice throughout the development process to improve functionality and efficiency. A key instance was in the Angular SPA, where the logic for displaying a single trip was initially part of the main trip listing component. This was later refactored into a separate, reusable `trip-card` component. This separation of concerns made the code cleaner and easier to maintain. Reusable UI components like this reduce code duplication, ensure a consistent look and feel across the application, and allow developers to update a single component's logic or style and have that change automatically propagate everywhere it's used.

## Testing

Testing the full-stack application involved a multi-layered approach to verify that API methods, endpoints, and security layers were all functioning correctly. The **API endpoints** are the specific URLs on the server (e.g., `/api/trips` or `/api/login`) that the front-end calls to perform an action. Each endpoint is associated with an **HTTP method** (`GET`, `POST`, `PUT`, `DELETE`) that defines the intended operation—retrieving, creating, updating, or deleting data.

To ensure security, we implemented a **JWT (JSON Web Token)** protocol. The `/login` endpoint provides a token upon successful authentication, and this token must be included in the header of any subsequent requests to protected endpoints. A custom **middleware** on the back-end intercepts these requests to verify the token's validity before allowing the operation to proceed.

The testing process began with isolating the back-end using **Postman**. I sent requests directly to the API endpoints to confirm that `GET` requests retrieved data, `POST` requests created new entries, and `PUT` requests updated existing ones. After adding the security layer, I tested that protected endpoints correctly returned a **401 Unauthorized** error if no token was provided.

The second phase was **end-to-end testing in the browser**. This involved the complete user flow: registering a user, logging in to receive a token, and then confirming that the now-authenticated user could successfully use the "Add Trip" and "Edit Trip" features. This proved that the front-end was correctly storing and attaching the JWT to its API calls via the `HttpInterceptor`.

## Reflection

This course has been instrumental in helping me reach my professional goals by transforming theoretical knowledge into practical, hands-on skill. Before this project, concepts like “full-stack,” “API,” and “SPA” were abstract. Now, I have tangible experience in building a complete application from the ground up.

I have learned how to design and implement a server with **Node.js and Express**, structure routes and controllers, model data with a NoSQL database like **MongoDB**, and connect everything with a **RESTful API**. Most significantly, I have developed a strong foundational skill in **Angular**, learning to build modular components, manage services, and implement a secure, authenticated user experience.

The skills I have mastered in this course—from debugging **CORS errors** and **JWT validation** to architecting a clean separation between the front-end and back-end—have made me a far more marketable candidate. I am no longer just a student who has studied programming; I am a developer who has built a functional, secure, full-stack application. This project serves as a cornerstone of my professional portfolio, demonstrating a comprehensive understanding of the entire web development lifecycle and equipping me with the confidence and competence to tackle real-world development challenges.
