import oracledb from "oracledb";
import { Response } from "express";
import pool from "../../config/database-config";
import jwt from "jsonwebtoken";
import { IUser } from "../../interfaces/users";
export class UserService {
  constructor() {}

  static async loginUser(req: IUser, res: Response) {
    let connection;
    let result: any;

    try {
      const { username, password } = req;
      connection = (await pool).getConnection();
      console.log("connected to database");

      console.log(
        `Calling pkg_sa.auth_user....un...${username} and password is ${password}`
      );
      // run query to get all ad_applications
      result = (await connection).execute(
        `
          BEGIN
           pkg_sa.auth_user_js (
        :p_un,
        :p_pw,
        :p_dev_type,
        :p_dev_address,
        :v_user_code,
        :v_person_code,
        :v_user_grp,
        :v_user_org,
        :v_os_code,
        :v_trace_menu,
        :v_name_format,
        :v_login_change,
        :v_sys_profile,
        :v_org_desc,
        :v_user_desc,
        :v_result,
        :v_aent_code,
        :v_ent_code,
        :v_ent_name,
        :v_otp_enabled,
        :v_device_exists,
        :v_org_type,
        :v_country_code,
        :v_user_phone,
        :v_user_email,
        :v_main_form,
        :v_view_type,
        :v_bg_color
    );
END;`,
        {
          p_un: username,
          p_pw: password,
          p_dev_type: "",
          p_dev_address: "",
          v_user_code: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_person_code: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_user_grp: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_user_org: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_os_code: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_trace_menu: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_name_format: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_login_change: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_sys_profile: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_org_desc: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_user_desc: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_result: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_aent_code: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_ent_code: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_ent_name: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_otp_enabled: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_device_exists: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_org_type: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_country_code: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_user_phone: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_user_email: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_main_form: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_view_type: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          v_bg_color: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        }
      );

      let user = {};

      if ((await result).outBinds.v_result === "0") {
        const accessToken = jwt.sign(
          {
            userCode: (await result).outBinds.v_user_code,
            personCode: (await result).outBinds.v_person_code,
            userGrp: (await result).outBinds.v_user_grp,
            userOrg: (await result).outBinds.v_user_org,
            osCode: (await result).outBinds.v_os_code,
            traceMenu: (await result).outBinds.v_trace_menu,
            nameFormat: (await result).outBinds.v_name_format,
            loginChange: (await result).outBinds.v_login_change,
            sysProfile: (await result).outBinds.v_sys_profile,
            orgDesc: (await result).outBinds.v_org_desc,
            aentCode: (await result).outBinds.v_aent_code,
            entCode: (await result).outBinds.v_ent_code,
            entName: (await result).outBinds.v_ent_name,
            otpEnabled: (await result).outBinds.v_otp_enabled,
            deviceExists: (await result).outBinds.v_device_exists,
            orgType: (await result).outBinds.v_org_type,
            countryCode: (await result).outBinds.v_country_code,
            userPhone: (await result).outBinds.v_user_phone,
            userEmail: (await result).outBinds.v_user_email,
            mainForm: (await result).outBinds.v_main_form,
            viewType: (await result).outBinds.v_view_type,
            bgColor: (await result).outBinds.v_bg_color,
          },
          "hhsyyahashhshsggaga",
          {
            expiresIn: "20m",
          }
        );

        user = {
          userCode: (await result).outBinds.v_user_code,
          personCode: (await result).outBinds.v_person_code,
          userGrp: (await result).outBinds.v_user_grp,
          userOrg: (await result).outBinds.v_user_org,
          osCode: (await result).outBinds.v_os_code,
          traceMenu: (await result).outBinds.v_trace_menu,
          nameFormat: (await result).outBinds.v_name_format,
          loginChange: (await result).outBinds.v_login_change,
          sysProfile: (await result).outBinds.v_sys_profile,
          orgDesc: (await result).outBinds.v_org_desc,
          aentCode: (await result).outBinds.v_aent_code,
          entCode: (await result).outBinds.v_ent_code,
          entName: (await result).outBinds.v_ent_name,
          otpEnabled: (await result).outBinds.v_otp_enabled,
          deviceExists: (await result).outBinds.v_device_exists,
          orgType: (await result).outBinds.v_org_type,
          countryCode: (await result).outBinds.v_country_code,
          userPhone: (await result).outBinds.v_user_phone,
          userEmail: (await result).outBinds.v_user_email,
          mainForm: (await result).outBinds.v_main_form,
          viewType: (await result).outBinds.v_view_type,
          bgColor: (await result).outBinds.v_bg_color,
        };

        return res.status(200).json({
          success: true,
          message: "User logged in successfully!",
          accessToken: accessToken,
        });
      } else {
        return res.status(400).json({
          error: "Please login with correct credentials",
          success: false,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (connection) {
        try {
          // Always close connections
          await (await connection).close();
          console.log("close connection success");
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
}
