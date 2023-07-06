import Joi from "joi";
import RouteParamsHandler from "../../types/routeParams.type";
import CustomErrorHandler from "../../utils/ErrorHandler/custom.errorHandler";
import CourseModel from "../../model/course.model";

const CreateCourse: RouteParamsHandler = async (req, res, next) => {
  try {
    // Course Type Validation
    const CourseTypeValidation = Joi.object({
      name: Joi.string().required().label("Course Name"),
      description: Joi.string().required().label("Course Description"),
      duration: Joi.number().required().label("Course Duration"),
      registrationFee: Joi.number().required().label("Course Registration Fee"),
      admissionFee: Joi.number().required().label("Course Admission Fee"),
      refreshToken:Joi.string().required().label("Refresh Token")
    });

    const { error } = CourseTypeValidation.validate(req.body);

    if (error)
      return next(new CustomErrorHandler(404, error.details[0].message));

    // Create Course Instance
    const course = new CourseModel({
      name: req.body.name,
      description: req.body.description,
      duration: req.body.duration,
      registrationFee: req.body.registrationFee,
      admissionFee: req.body.admissionFee,
    });

    // Saving course into database
    await course.save();

    res.status(201).send("course created");
  } catch (error) {
    next(error);
  }
};

const GetCourse: RouteParamsHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await CourseModel.findById(id);

    if (!course) return next(CustomErrorHandler.notFound("Course Not Found"));

    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

const GetCourses: RouteParamsHandler = async (req, res, next) => {
  try {
    const courses = await CourseModel.find().sort({ date: -1 });
    res.status(201).json(courses);
  } catch (error) {
    next(error);
  }
};

const DeleteCourse: RouteParamsHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await CourseModel.findByIdAndDelete(id);

    if (!course) return next(CustomErrorHandler.notFound("Course Not Found"));

    res.status(200).send("course deleted");
  } catch (error) {
    next(error);
  }
};

const UpdateCourse: RouteParamsHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, duration, registrationFee, admissionFee } =
      req.body;

    const course = await CourseModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        duration,
        registrationFee,
        admissionFee,
      },
      { new: true }
    );

    if (!course) return next(CustomErrorHandler.notFound("Course Not Found"));

    res.status(200).json({
      UpdatedCourse: course,
    });
  } catch (error) {
    next(error);
  }
};

export { CreateCourse, GetCourse, GetCourses, DeleteCourse, UpdateCourse };
