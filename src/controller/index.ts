export { default as AuthDashboard } from "./Auth/dashboard.controller";
export { default as AuthLogIn } from "./Auth/logIn.controller";
export { default as AuthLogOut } from "./Auth/logout.controller";
export { default as AuthVerifyOTP } from "./Auth/verify.otp.controller";
export { default as AuthRegister } from "./Auth/register.controller";
export { default as AuthRefreshToken } from "./Auth/refresh.token.controller";

// API
export { default as RequestAPIkey } from "./API/request.api.key.controller";
export { default as verifyAPIKeyOTP } from "./API/verify.api.key.otp.controller";
export { default as getAPIKeyRequests } from "./API/get.api.key.requests.controller.";
export { default as manageAPIkeyStatus } from "./API/manage.api.key.status.controller";

// Notifications
export {
  CreateNotification,
  DeleteNotification,
  GetNotification,
  GetNotifications,
  UpdateNotification,
} from "./NotificationController/notification.controller";

// Course
export {
  CreateCourse,
  DeleteCourse,
  GetCourse,
  GetCourses,
  UpdateCourse,
} from "./CourseController/course.controller";

// Banner
export {
  CreateBanner,
  DeleteBanner,
  GetBanner,
  GetBanners,
  UpdateBanner,
} from "./BannerController/banner.controller";
