import {
	adminViewPairs,
	adminMatchPairs,
	adminViewRegFormWindow,
	adminSetRegFormWindow,
} from "../services/admin";

import { Request, Response } from "express";

const getAdminViewPairs = async (req: Request, res: Response) => {
	try {
		const details = await adminViewPairs();
		return res.json(details);
	} catch (err) {}
};

const postAdminMatchPairs = async (req: Request, res: Response) => {
	try {
		const details = adminMatchPairs();
		return res.json(details);
	} catch (err) {}
};

const getAdminRegFormWindow = async (req: Request, res: Response) => {
	try {
		const details = adminViewRegFormWindow(req.params.type);
		return res.json(details);
	} catch (err) {}
};

const patchAdminRegFormWindow = async (req: Request, res: Response) => {
	try {
		const details = adminSetRegFormWindow(req.params.type);
		return res.json(details);
	} catch (err) {}
};

export {
	getAdminViewPairs,
	postAdminMatchPairs,
	getAdminRegFormWindow,
	patchAdminRegFormWindow,
};
