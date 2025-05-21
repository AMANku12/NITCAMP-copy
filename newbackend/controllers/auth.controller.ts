import { Request, Response } from "express";
import pool from "../db/db";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const fetchRoleData = async (role: string, user_id: number) => {

  const query = `SELECT * FROM ${role} WHERE user_id = $1`;
  const result = await pool.query(query, [user_id]);
  
  return result.rows.length > 0 ? result.rows[0] : null;
};

const fetchGooleData = async (token: string) => {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    return payload;
}

const userController = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    res.status(400).json({ errors: errorMessages });
    console.log("Validation errors:", errorMessages);
    return;
  }

  const { token, role } = req.body;

  try {
    const payload = await fetchGooleData(token);
    
    const { email, name } = payload as { email?: string; name?: string };

    if (!email || !name) {
      res.status(400).json({ message: "Invalid Google token" });
      return;
    }

    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    // new user
    if (existingUser.rows.length === 0) {

      const newUser = await pool.query(
        "INSERT INTO users (fullname, email, role) VALUES ($1, $2, $3) RETURNING *",
        [name, email, role]
      );

      console.log("🆕 New user created:", newUser.rows[0]);
      res.status(200).json({ message: "SUCCESS-NEWUSER", user: newUser.rows[0] });

    } else {  // existing user

      console.log("✅ Existing user:", existingUser.rows[0]);

      const roleData = await fetchRoleData(existingUser.rows[0].role, existingUser.rows[0].id);

      if(roleData){
        console.log("Role data fetched:", roleData);
        res.status(200).json({ message: "SUCCESS-EXISTINGUSER", user: existingUser.rows[0], roleData });

      }else{
        console.log("No role data found");
        res.status(200).json({ message: "SUCCESS-EXISTINGUSER-NO_ROLE_DATA", user: existingUser.rows[0], roleData: null });
      }

    }
  } catch (error) {
    console.error("❌ Error in Google login:", error);
    res.status(500).json({ message: "Something went wrong with Google login" });
  }
};

const adminController = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    res.status(400).json({ errors: errorMessages });
    console.log("Validation errors:", errorMessages);
    return;
  }

  const { email, password} = req.body;

  try {
    const existingUser = await pool.query("SELECT * FROM admin WHERE email = $1", [email]);

    if(existingUser.rows.length === 0){
      res.status(400).json({ message: "Admin not found" });

    }else{
      const user = existingUser.rows[0];
      const isPassValid = await bcrypt.compare(password, user.password);

      if(!isPassValid){
        res.status(400).json({ message: "Invalid password" });

      }else{
        user.password = undefined; 
        console.log("✅ Admin login successful:", user);
        res.status(200).json({ message: "SUCCESS-ADMINLOGIN", user });
      }
    }

  } catch (error) {
    console.error("❌ Error in admin login:", error);
    res.status(500).json({ message: "Something went wrong with admin login" });
    
  }
}

const adminRegisterController = async (req: Request, res: Response): Promise<void> => {
  const {name, email, password, phone_number, adminKey} = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    res.status(400).json({ errors: errorMessages });
    console.log("Validation errors:", errorMessages);
    return;
  }

  try {
    const existingAdmin = await pool.query("SELECT * FROM admin WHERE email = $1", [email]);
 
    if(existingAdmin.rows.length > 0){
      res.status(400).json({ message: "Admin already exists" });
      return;
    }

    if(adminKey !== process.env.ADMIN_KEY){
      res.status(400).json({ message: "Invalid admin key" });
      return;
    }
    if(!name || !phone_number){
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newAdmin = await pool.query(
      "INSERT INTO admin (name, email, password, phone_number) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, phone_number]
    );

    newAdmin.rows[0].password = undefined; 

    console.log("🆕 New admin created:", newAdmin.rows[0]);
    res.status(200).json({ message: "SUCCESS-NEWADMIN", admin: newAdmin.rows[0] });

  } catch (error) {
    console.error("❌ Error in admin registration:", error);
    res.status(500).json({ message: "Something went wrong with admin registration" });
    
  }
}

export default {userController, adminController, adminRegisterController};
