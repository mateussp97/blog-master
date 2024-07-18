# BlogMaster

BlogMaster is a **user and post management application**.

The tool allows administrators to manage users and each user to create, edit, and view their posts.

## Requirements

### Functional Requirements

- [x] The administrator must be able to register a new user;
- [x] The administrator must be able to view user data;
- [x] The administrator must be able to view the list of users;
- [x] The user must be able to create a new post;
- [x] The user must be able to view their posts;
- [x] The user must be able to edit their posts;
- [x] The user must be able to delete their posts;
- [x] The user must be able to view only published posts;
- [x] The administrator must be able to view all posts;
- [x] The administrator must be able to delete posts;

### Business Rules

- [x] The user can only create posts if they are registered;
- [x] The post will only be published if the `published` field is set to `true`;
- [x] The user can only edit or delete their own posts;

## Features and Application Routes

### Users

- **Register User**

  - **Method:** POST
  - **Route:** `/users`
  - **Description:** Creates a new user.
  - **Payload Example:**
    ```json
    {
      "email": "johndoe@acme.com",
      "name": "John Doe"
    }
    ```

- **View User**
  - **Method:** GET
  - **Route:** `/users/:id`
  - **Description:** Returns the data of a specific user.
- **View User List**

  - **Method:** GET
  - **Route:** `/users`
  - **Description:** Returns the list of all registered users.

- **Edit User**

  - **Method:** PATCH
  - **Route:** `/users/:id`
  - **Description:** Updates the data of a specific user.
  - **Payload Example:**
    ```json
    {
      "email": "johndoe@acme.com",
      "name": "Doe John"
    }
    ```

- **Delete User**
  - **Method:** DELETE
  - **Route:** `/users/:id`
  - **Description:** Removes a specific user.

### Posts

- **Create Post**

  - **Method:** POST
  - **Route:** `/posts`
  - **Description:** Creates a new post.
  - **Payload Example:**
    ```json
    {
      "title": "Automated CRUD with NestJS and Prisma",
      "content": "Learn how to create an automated CRUD with NestJS and Prisma.",
      "published": true,
      "authorEmail": "johndoe@acme.com"
    }
    ```

- **View Post**

  - **Method:** GET
  - **Route:** `/posts/:id`
  - **Description:** Returns the data of a specific post.

- **View Published Posts with Pagination**

  - **Method:** GET
  - **Route:** `/posts/feed?page=1&limit=10`
  - **Description:** Returns the list of all published posts with pagination.

- **View Post List with Pagination**

  - **Method:** GET
  - **Route:** `/posts?page=1&limit=10`
  - **Description:** Returns the list of all posts with pagination.

- **Edit Post**

  - **Method:** PATCH
  - **Route:** `/posts/:id`
  - **Description:** Updates the data of a specific post.
  - **Payload Example:**
    ```json
    {
      "title": "Automated CRUD with NestJS and Prisma",
      "content": "Learn how to create an automated CRUD with NestJS and Prisma.",
      "published": false
    }
    ```

- **Publish Post**

  - **Method:** PUT
  - **Route:** `/posts/publish/:id`
  - **Description:** Publishes a specific post.

- **Delete Post**
  - **Method:** DELETE
  - **Route:** `/posts/:id`
  - **Description:** Removes a specific post.
