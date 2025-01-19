# authRouters
POST /signup
POST /login
POST /logout

# profileRouter
GET  /profile/view
PATCH /profile/edit
PATCH /profile/password

# connectionRequestRouter
<!-- Sending the connection request -->
POST /request/send/:status/:userId     //:status = interested/ignored

<!-- After getting the connection request -->
POST /request/review/accepted/:requestId
POST /request/review/rejected/:requestId

# userRouter 
<!-- Getting all the connection request through which user will either accept or reject -->
GET /user/request/received
<!-- Get connection of user after request successfull on either side-->
GET /user/connection
<!-- API for FEED -->
GET /user/feed



<!-- Available status -->
Status : ignore, interested, accepted, rejected
