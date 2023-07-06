import express from "express";
import {
  GetBanner,
  GetBanners,
  GetCourse,
  GetCourses,
  GetNotification,
  GetNotifications,
} from "../../controller";

const PermittedRoutesRouter = express.Router();

PermittedRoutesRouter.get("/get-course/:id", GetCourse)
  .get("/get-courses", GetCourses)
  .get("/get-notification/:id", GetNotification)
  .get("/get-notifications", GetNotifications)
  .get("/get-banner/:id", GetBanner)
  .get("/get-banners", GetBanners);

export default PermittedRoutesRouter;
