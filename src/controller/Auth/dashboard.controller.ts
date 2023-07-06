import RouteParamsHandler from "../../types/routeParams.type";

const DashboardController: RouteParamsHandler = async (req, res, next) => {
  try {
    if (!req.user) return;

    const { username, role, email } = (<any>req).user;

    res.status(200).json({
      username,
      role,
      email,
    });
  } catch (error) {
    next(error);
  }
};

export default DashboardController;
