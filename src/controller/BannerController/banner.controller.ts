import Joi from "joi";
import RouteParamsHandler from "../../types/routeParams.type";
import CustomErrorHandler from "../../utils/ErrorHandler/custom.errorHandler";
import BannerModel from "../../model/banner.model";

const CreateBanner: RouteParamsHandler = async (req, res, next) => {
  try {
    const BannerTypeValidation = Joi.object({
      imageUrl: Joi.string().required().label("Banner Image Url"),
      caption: Joi.string().required().label("Banner Image Caption"),
      isActive: Joi.boolean().required().label("Banner Image Status"),
      refreshToken: Joi.string().required().label("Refresh Token"),
    });

    const { error } = BannerTypeValidation.validate(req.body);

    if (error)
      return next(new CustomErrorHandler(400, error.details[0].message));

    // Create Banner Instance
    const banner = new BannerModel({
      imageUrl: req.body.imageUrl,
      caption: req.body.caption,
      isActive: req.body.isActive,
    });

    // Save Banner into Database
    await banner.save();

    res.status(200).send("Your Banner is been created");
  } catch (error) {
    next(error);
  }
};

const GetBanner: RouteParamsHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const banner = await BannerModel.findById(id);

    if (!banner) return next(CustomErrorHandler.notFound("Banner Not Found"));

    res.status(200).json(banner);
  } catch (error) {
    next(error);
  }
};

const GetBanners: RouteParamsHandler = async (req, res, next) => {
  try {
    const banners = await BannerModel.find().sort({ date: -1 });
    res.status(200).send(banners);
  } catch (error) {
    next(error);
  }
};

const DeleteBanner: RouteParamsHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const banner = await BannerModel.findByIdAndDelete(id);

    if (!banner) {
      return next(CustomErrorHandler.notFound("Banner Not Found"));
    }

    res.status(200).json({ message: "Banner deleted" });
  } catch (error) {
    next(error);
  }
};

const UpdateBanner: RouteParamsHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { imageUrl, caption, isActive } = req.body;

    const banner = await BannerModel.findByIdAndUpdate(
      id,
      {
        imageUrl,
        caption,
        isActive,
      },
      { new: true }
    );

    if (!banner) {
      return next(CustomErrorHandler.notFound("Banner Not Found"));
    }

    res.status(200).json({
      UpdatedBanner: banner,
    });
  } catch (error) {
    next(error);
  }
};

export { CreateBanner, GetBanner, GetBanners, DeleteBanner, UpdateBanner };
