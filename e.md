I have developed an Admin panel using Node.js,Express.js, MongoDD (mongoose) and Typescript.

Here the are admin panel routes:
## Auth Routes
- /auth/register
- /auth/login
- /auth/verify-login-otp
- /auth/admin-dashboard
- /auth/refresh
- /auth/logout

## Routes Only Admin Can Access
- /banner/get-banner
- /banner/get-banners
- /course//get-course
- /course//get-courses
- /notification/get-notification
- /notification/get-notifications

## Route for API key
- /api/request-api-key
- /api/verify-api-key-otp
- /api/get-api-key-requests
- /api/manage-api-key-requests

## Permitted Routes ( API key and Client Id )
- /public/banner/get-banner
- /public/banner/get-banners
- /public/course//get-course
- /public/course//get-courses
- /public/notification/get-notification
- /public/notification/get-notifications