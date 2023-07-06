import { JwtPayload, decode } from "jsonwebtoken";
import RefreshTokenModel from "../../model/refreshToken.model";
import IssueAccessAndRefreshToken from "./issue.jwt.token";

enum ROLE {
  ADMIN = "Admin",
  OTHER = "OTHER",
}

export class RefreshTokenRotation {
  static async refresh(token: string, user: any) {
    // Find the existing refresh token in the database
    const OldRefreshtoken = await RefreshTokenModel.findOne({
      refreshToken: token,
    });

    // Check if old refresh token is valid
    if (!OldRefreshtoken || OldRefreshtoken.status !== "valid") {
      throw new Error("Invalid Refresh Token");
    }

    // Check old refresh token expiration
    if (OldRefreshtoken.expiresAt.valueOf() < Math.floor(Date.now() / 1000)) {
      throw new Error("Refresh Token has expired");
    }

    // update the status of old refresh token from 'valid' to 'invalid'
    OldRefreshtoken.status = "invalid";
    await OldRefreshtoken.save();

    // Delete all previous refresh token of the user
    await RefreshTokenModel.deleteMany({ userId: OldRefreshtoken.userId });

    let accessToken, refreshToken;

    if (ROLE.ADMIN === "Admin") {
      accessToken = await IssueAccessAndRefreshToken.issueAdminAccessToken(
        user.id
      );

      refreshToken = await IssueAccessAndRefreshToken.issueAdminRefreshToken(
        user.id
      );
    }

    // Decode the new refresh token
    const decoded = decode(refreshToken as string, { complete: true });

    // invalid refresh token generated
    if (!decoded) {
      throw new Error("Invalid Genereated Refresh Token");
    }

    // extract the payload from the nwe decoded refresh token
    const { payload } = decoded as { payload: JwtPayload };

    // get the expiration time of the refresh token from payload
    const expiresAt = payload.exp;

    // create and save in refresh token in database
    await RefreshTokenModel.create({
      refreshToken,
      expiresAt: expiresAt,
      status: "valid",
      userId: user.id,
    });

    return { accessToken, refreshToken };
  }
}
