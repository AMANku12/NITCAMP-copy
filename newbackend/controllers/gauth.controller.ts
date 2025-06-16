import { Request, Response } from "express"

const gAuthController = async(req:Request, res:Response)=>{
    const {googletoken} = req.body;
    console.log(googletoken);
    res.json({message: "SUCCESS"});
}

export default gAuthController;