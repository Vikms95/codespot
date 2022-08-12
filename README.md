CONNECT BACKEND WITH REACT
https://www.youtube.com/watch?v=kJA9rDX7azM

TODO-
<!-- -Create models -->
<!-- - Create routes structure -->
<!-- - Setup db with mongo and mongoose -->
<!-- - Implement user creation -->
<!-- - Implement user login -->
<!-- - Implement route protecting -->
<!-- - Create user from frontend -->
<!-- - Login user and attach token to the client -->
- Implement verification of token on protected routes
  :figure out how to send token to the backend from Dashboard component to verify that the token is valid
  :implement useEffect getting the token on protected routes?

- Plan on where would I need endpoints


1. user registers - OK returned
2. user logs in - Token returned
3. user saves token
4. user includes token in the header when accessing protected route
5. server verifies token and either lets user in or denies

- Dashboard is where all your posts are located
- Home will be where all the posts from all the users are shown
- Post will be the details of each post which is accesible from the homepage or the dashboard

- Collections
  - Users
  - Posts - hold all the posts with a id key of the author(user)
          - hold an array of the comments and an id key of the post