import { sign } from "jsonwebtoken";
import { join } from "path";
import { readFileSync } from "fs";
import { Types } from "mongoose";

//* --- Admin Tokens ---//

//! Admin Access Token Key

const pathToAminPrivateAccessKey: string = join(
  __dirname,
  "../../..",
  "AdminAccess_privateKey.pem"
);

const ADMIN_ACCESS_PRIVATE_KEY: string = readFileSync(
  pathToAminPrivateAccessKey,
  "utf-8"
);

//! Admin Refresh Token Key

const pathToAminPrivateRefreshKey: string = join(
  __dirname,
  "../../..",
  "AdminRefresh_privateKey.pem"
);

const ADMIN_REFRESH_PRIVATE_KEY: string = readFileSync(
  pathToAminPrivateRefreshKey,
  "utf-8"
);

class IssueAccessAndRefreshToken {
  /**
   *@static
   *@property {string} ADMIN_ACCESS_PRIV_KEY - private key for admin access token
   */
  static ADMIN_ACCESS_PRIV_KEY = ADMIN_ACCESS_PRIVATE_KEY;

  /**
   *@static
   *@property {string} ADMIN_REFRESH_PRIV_KEY - private key for admin refresh token
   */
  static ADMIN_REFRESH_PRIV_KEY = ADMIN_REFRESH_PRIVATE_KEY;

  // issue tokens
  static async issueToken(
    userId: Types.ObjectId,
    privateKey: string,
    expiresIn: string
  ) {
    const payload = {
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
    };

    return sign(payload, privateKey, {
      expiresIn: expiresIn,
      algorithm: "RS256",
    });
  }

  // issue admin Access Token
  static async issueAdminAccessToken(userId: Types.ObjectId) {
    return this.issueToken(userId, this.ADMIN_ACCESS_PRIV_KEY, "58s");
  }

  // issue Admin Refresh Token
  static async issueAdminRefreshToken(userId: Types.ObjectId) {
    return this.issueToken(userId, this.ADMIN_REFRESH_PRIV_KEY, "1y");
  }
}

export default IssueAccessAndRefreshToken;
