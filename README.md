
- Collections
  - Users
  - Posts - hold all the posts with a id key of the author(user)
          - hold an array of the comments and an id key of the post

1. user registers - OK returned
2. user logs in - Token returned
3. user saves token
4. user includes token in the header when accessing protected route
5. server verifies token and either lets user in or denies

TODO-
<!-- -Create models -->
<!-- - Create routes structure -->
<!-- - Setup db with mongo and mongoose -->
<!-- - Implement user creation -->
<!-- - Implement user login -->
<!-- - Implement route protecting -->
<!-- - Create user from frontend -->
<!-- - Login user and attach token to the client -->

<!-- - Implement verification of token on protected routes -->
  <!-- :figure out how to send token to the backend from Dashboard component to verify that the token is valid -->
  <!-- :implement useEffect getting the token on protected routes? -->


<!-- 
- Give context to the app about the logged in user
  :The problem is that after logging in, the state is still not updated
  :Call setter from context before redirecting to the route -->

<!-- x - Can't access directly when not logged in
x - Can acces directly when logged in
x - Can't access directly when token set manually
x- Can't access directly when token is modified manually to an invalid one -->






- Dashboard is where all your posts are located
  :implement functionality to a user create a post
    :create a form
    :make that form make a post call to the /api/createpost
    :that endpoint will create a new item in the post collection
    :that item will hold an user field with the user id

- Home will be where all the posts from all the users are shown
- Post will be the details of each post which is accesible from the homepage or the dashboard