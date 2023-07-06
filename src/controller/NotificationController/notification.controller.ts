import Joi from "joi";
import RouteParamsHandler from "../../types/routeParams.type";
import CustomErrorHandler from "../../utils/ErrorHandler/custom.errorHandler";
import NotificationModel from "../../model/notification.model";

// Complete the following functions:

const CreateNotification: RouteParamsHandler = async (req, res, next) => {
  try {
    // Notification Type Validation
    const NotificationTypeValidationSchema = Joi.object({
      title: Joi.string().required().label("Notification Title"),
      message: Joi.string().required().label("Notification Message"),
      refreshToken: Joi.string().required().label("Refresh Token"),
    });

    const { error } = NotificationTypeValidationSchema.validate(req.body);

    if (error)
      return next(new CustomErrorHandler(400, error.details[0].message));

    // Create Notification instance
    const notification = new NotificationModel({
      title: req.body.title,
      message: req.body.message,
    });

    // save notification into database
    await notification.save();

    res.status(201).send("Notification created");
  } catch (error) {
    next(error);
  }
};

const GetNotification: RouteParamsHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const notification = await NotificationModel.findById(id);

    if (!notification) {
      return next(CustomErrorHandler.notFound("Notification Not Found"));
    }

    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
};

const GetNotifications: RouteParamsHandler = async (req, res, next) => {
  try {
    const notifications = await NotificationModel.find().sort({ date: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

const DeleteNotification: RouteParamsHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const notification = await NotificationModel.findByIdAndDelete(id);

    if (!notification) {
      return next(CustomErrorHandler.notFound("Notification Not Found"));
    }

    res.status(200).json({ message: "Notification deleted" });
  } catch (error) {
    next(error);
  }
};

// Complete the following functions
const UpdateNotification: RouteParamsHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, message } = req.body;

    const notification = await NotificationModel.findByIdAndUpdate(
      id,
      {
        title,
        message,
      },
      { new: true }
    );

    if (!notification) {
      return next(CustomErrorHandler.notFound("Notification Not Found"));
    }

    res.status(200).json({
      UpdatedNotification: notification,
    });
  } catch (error) {
    next(error);
  }
};

export {
  CreateNotification,
  GetNotification,
  GetNotifications,
  DeleteNotification,
  UpdateNotification,
};
