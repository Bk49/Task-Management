# Task Management Application

## Setup

1. Clone the repository to local machine 
```
git clone https://github.com/Bk49/Task-Management.git
```
2. Install necessary packages and run the development server
```
bun i && bun dev
```
3. Build the application to `dist` folder
```
bun run build
```

## Overview

A task management application consisting of a single page only, utilizing various modals (known as dialogs) for performing mutations on the tasks and custom fields while using a table for pagination, sorting and filtering of tasks.

The application is created using ReactTS with Vite as a SPA for the simplicity in hosting and scalability thanks to client-side rendering. It utilizes MUI as the CSS framework to create clean and easy to use user interface. React Hook Form is used for capturing states of dialogs, while Zod is used as the form validation and schema definition tool to ensure type compatability between forms and internal data store. Zustand is used as the application state management tool, allowing application states to be safely shared between different components without the overhead of providers. Notistack is integrated to the application to allow error, success and warning messages to be displayed to users as feedbacks based on their interactions.

The application has been hosted on (Render)[https://task-management-hdpj.onrender.com/].

## Assumptions & Design Decisions

1. The application is supposed to consist of a single page only with navigations kept to a minimum. This means router configuration needs to be done in the future if more functions are added
2. The application does not require SEO, therefore is created as a SPA
3. The application does not involve complex animations and graphics to preserve performance while also allow it to carry out its main purpose (To manage tasks)
4. Some clear shorthands such as `sort(a,b => a-b)` is not properly named according to what there are since it is assumed that whoever that reads the code and maintains it will be mid-level engineers who are familiar with ES6 already
5. Custom fields are not supposed to be persisted for all tasks if they are deleted at any point of time (e.g. Supposed `deadline` is added, task with `id` 1 has been assigned a deadline. Deleting the `deadline` field will result in the lost of the deadline being assigned to task `id` 1)
6. Priority and Status are sorted according to most to least high priority or "done-ness" respectively, not alphabetically
7. Maintainability of code carries more importance over performance, therefore packages used are also introduced 


## Bonus Milestones

1. Addition of snackbars using notistack for better user feedback upon errors and form submission


## Interesting Things

1. It is my first time using Zustand, previous projects has either no need for global state management (Using React Query for fetched data persistance and useAuth0 for user related data) or has been using useContext (For its simplicity)
2. The decision to perform manual sorting without using libraries like (fast-sort)[https://github.com/snovakovic/fast-sort] is on purpose since the requirements purposely highlighted to not use DataTable
3. 