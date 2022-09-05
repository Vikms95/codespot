- Collections
  - Users
  - Posts - hold all the posts with a id key of the author(user)
          - hold an array of the comments and an id key of the post

REST URL CONVENTIONS
https://www.theodinproject.com/lessons/nodejs-api-basics
https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/#h-use-nouns-instead-of-verbs-in-endpoint-paths
/api/posts/:postid/comments

COMPOSITION WITH STYLED COMPONENTS
https://reactjs.org/docs/composition-vs-inheritance.html
https://styled-components.com/docs/basics

-PENDING ROUTES-

- GET /posts/:postid/comments
- POST /posts/:postid/comment
- PUT /posts/:postid/comments/:commentid
- DELETE /posts/:postid/comments/:commentid

- AUTH PROCESS  -
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


<!-- - /createpost is just a form where you will have to fill the required
  :implement functionality for a user to create a post -->
  <!-- :create a form webpage -->
  <!-- :make that form make a call POST /api/createpost -->
  <!-- :that endpoint will create a new item in the posts mongo collection -->
  <!-- :get user from jwt.verify payload -->
  <!-- :refactor context so it uses the userid? -->


<!-- - /dashboard is where all your own posts are located -->
  <!-- /api/:userid/posts -->
  <!-- :implement functionality to fetch posts with your id by calling GET /api/:userid/posts? -->
  <!-- :get the post that match the id taken from React context -->
  <!-- :you can make a post public and private, edit and delete from /dashboard -->
  <!-- <Dashboard/> -->
  <!-- :map all the fetched posts and pass the data as props to <Post/> -->


<!-- - / will be where all the posts from all the users are shown -->
  <!-- :implement functionality to fetch for all the posts no matter the user -->
  <!-- :posts on <Home/> do not receive the user context that is logged in? -->
  <!-- :user does not persist on <Home/> when page is reloaded? -->

<!-- - DELETE /posts/:postid -->
<!-- :postid is returning undefined? -->
<!-- :not finding post in the Post collection with findByIdAndRemove? -->
<!-- :pass the post id to <Modal/> so it can be fetched and deleted from there  -->
<!-- - PUT /posts/:postid -->
  <!-- :use same <PostForm/> but with the input fields filled and the submit button with a different event listener -->
  <!-- :If no props are passed, this component will be used to create a new post. Otherwise, props will contain the data
    required to fetch the post info(from server or from posts state?) We will conditionally render the JSX depending if we have props or not. -->
  <!-- :populate form inputs with the post data if post is located as parameter -->

<!-- - Page will not reload if I don't update the posts state -->
  <!-- :deleted the posts on the frontend too -->
<!-- - Move posts to App and pass it to <Dashboard/> and <Home/> as props -->

<!-- - Extract fetch snippets onto useFetch custom hooks -->
  <!-- :cannot assign the response from useFetch to posts prop -->
  <!-- :it seems like with useFetch, whenever I delete, it does not update the Post state
  again
    :it works with useEffect, not with useFetch -->

<!-- - Fix checked value on <PostForm> -->
<!-- - Set checked value as checked when the post to update has it like that -->
<!-- - Fix /update/:postid crashing when reload the page -->
  <!-- :when reloading, posts is empty -->
<!-- - Implement post update on the backend (frontend is not needed, since React will redirect to dashboard, thus making a new fetch) -->
<!-- - Implement logout user functionality
  :logged in user seems to persist when redirecting and until the page is refreshed -->

<!-- - Do not show private blogs on home -->

<!-- - When I get the posts on load with a GET request, those posts have the password since the user field is populated Safe to pass the password on the frontend? Reassign the user object to be the same without the password on the b/end? -->
<!-- - Setup modal wrapper that covers the whole page so it can't be clicked outside -->
<!-- - Setup TinyMCE
  :contents of the Editor are being passed as undefined -->


<!-- - Setup multer to let the user upload post image value
https://www.npmjs.com/package/multer
https://github.com/expressjs/multer -->
<!-- https://stackoverflow.com/questions/63451157/how-can-i-use-multer-with-react -->

<!--:NOT PASSING THE FILE AT ALL
:  storage: {},
limits: { fileSize: 10000 },
preservePath: undefined, <!!!!
fileFilter: [Function: allowAll]

:storage property on options is EMPTY
:change the request params on the react requestParams service?
!:form was not being sent by React with the image, now it does. Still pending to see what is going on in the backend
TRY FIRST ANSWER:
  https://stackoverflow.com/questions/71309865/file-upload-with-react-nodejs-multer-doesnt-work
:mongoose error > not receiving the form data after changing the parameters
:all formdatas are not working(sending data as undefined)
TRY THIS:
  https://www.positronx.io/react-file-upload-tutorial-with-node-express-and-multer/ -->
  <!-- : now file is uploaded, but the rest of the data is not being found by mongoose, check formatting -->
  <!-- :now file is uploaded and data is found, but req.file seems to be undefined
  :post request errors because I'm trying to access req.file inside the middleware
  :file won't print on the multer option callbacks
  :now file is not saved T_T
  :before deleting postController file it wassaving? maybe review the createPost on postController? --> 
  <!-- :make the image appear on each posts based on the files saved on the backend and the path saved on the database -->
  <!-- :how to retrieve image from the app.use(static..) ?? do i need that or another endpoint? -->
  <!-- https://expressjs.com/en/starter/static-files.html -->
  <!-- https://stackoverflow.com/questions/61374786/how-to-use-serve-static-file-with-express-and-react -->

<!-- - Setup timestamp property for posts  -->
<!-- - Change privacy button to a normal switch button(just like the one on Weather App) -->
<!-- - Fix bug where cancel button is shown above the cancel modal -->
<!-- - UpdateForm apply the new logic -->

<!-- - Create hover on PostPreview to read the full Post -->

<!-- -Fix PostReview text overflow -->
  <!-- :posts with elipsis have some less padding than the ones that do not -->

<!-- -Refactor custom Hooks to hold its own state! -->

<!-- - Create Post component -->
  <!-- https://dribbble.com/shots/15993980-Blog-Photo-Website-concept -->
  <!-- :title > date above img > image > content  -->
  <!-- :need to create posts context -->
  <!-- :make post not crash when page refreshed > localstorage -->
  <!-- :improve the logic so the past localStorage image does not get shown before the actual image
  :useLocalStorage hook? -->
  <!-- :remember that you can return a setState from a custom hook
  :lookup how to return state from inside a custom hook, since usePost only seems to work with the state put outside of it and passing the setState
  :https://reactjs.org/docs/hooks-custom.html

<!-- - Try to abstract context with this 
https://www.reddit.com/r/reactjs/comments/ww2azd/what_hooks_do_you_use_on_a_regular_basis/ --> 
<!-- - Make not authorized page --> 
<!-- - Style Navbar > make it a slide navbar with only icons at the beginning and button to show names
https://dribbble.com/shots/16265164-Side-Menu-Design
https://www.youtube.com/watch?v=biOMz4puGt8 -->

- Create Comments component
  <!-- : comments have their own separate collection -->
  <!-- : they have 2 Joins, the user id and the post id -->
  <!-- : create comment count per post endpoint -->
  <!-- :create CommentSection component
    :pass PostComments as -->
  <!-- :add form and endpoints to create a new comment on a Post
    :attach user id and post id to the comment object -->
  <!-- :make comments appear right after you create them(update the state) -->
  <!-- :make comment form appear only if a user is logged in, show login link instead -->
  <!-- :style comment form(lookup dribble) -->
  <!-- :conditionally render icons on the comment, if logged user id is not equals to the comment user, do not show edit and delete, if no user at all, do not show reply button -->

  :implement functionality to reply comments(parent, child relations)
    https://www.youtube.com/watch?v=lyNetvEfvT0&t=6687s
    https://www.youtube.com/watch?v=sjAeLwuezxo


    :when a comment with children is deleted, delete all the children too on state  
      :children on the database still exist, is it needed to delete them?
      :the only side effect besides database clutter is the comment count form PostPreview showing
      the amount with the child components too
        :use the comments state instead of fetching them?(does not seem like a good idea)

    >I think it'd be better if you kept the deleted users' comments as well, but show in your front end that the user was deleted due to XX. But while deleting a user, you could have a checkbox option - delete user comments - which will delete all comments and its replies, because if you do not wish to show the child comments on your site again, it would be a waste storing them in your db
    https://stackoverflow.com/questions/26565475/delete-parent-record-and-keep-child-in-comments-table
    >DELETE<
    Comment gets deleted 
      <!-- If comment children === null -->
      <!-- Delete from backend -->
      <!-- Delete from frontend -->
      If comment has children
        <!-- Set deleted property to true on backend -->
        Set deleted property to true on frontend
        <!-- !:comments turn to undefined when deleted and no children -->
        :the rest of the comments are not receiving an id?
        

    :setComments is not available after one deleted comment? pass comments as context?

   >REPLY<
    :that reply button has attached the id from the comment as props, so the comment form will have the parentid on state

    :implement parentid being passed if the comment form is triggered with the reply button >>> create a specialized CommentFormWithParent which will have the id passed as props + extra features?

  :implement icons for CRUD actions on the comments
    :when reply button is clicked, display a CommentForm right below the comment to reply

  :user available comment icons not appearing after creating a comment, only after refreshing

  :implement Comment and Replies CRUD - (replies is the same but including the parentid instead) 
  
  :style comment list
    https://dribbble.com/shots/16102470-Help-Center-Existing-Tickets-Exploration/attachments/7953319?mode=media

  :make timestamp be used to calculate how long from the moment it was created (3 hours ago, 3 months ago...)
  

- Fix images showing the default one before fetching all the PostView images

- Fix Post showing undefined if you logout while a Post is displayed

- Fix Navbar covering the whole screen when going from mobile to desktop view

- Implement redirecting to the post that was being read when logged in after cliking on the Login link from the post

- Implement sanitization of inputs

-STILYNG-

<!-- - Style Home so the first Post is bigger than the rest -->
<!-- :use first-children to style the first post different from the others -->
: use.reservese to get the latest post as the first one
<!-- : make first element occupy 1 row and 2 columns -->
  <!-- :first-child not being selected? -->
  <!-- :make first two elements be bigger -->

<!-- - Style file input
  :https://stackoverflow.com/questions/572768/styling-an-input-type-file-button -->

- Style user managament forms

- Implement error handling on api calls or asynchronous operations

