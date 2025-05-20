import { Admin } from "../models/admin";
import { sequelize } from "../config/database";
import { Form } from "../models/form";
import { MentorMenteeMatch } from "../models/match";
import { User } from "../models/user";
import { exec } from "child_process";

const adminViewPairs = async () => {
	const response = await MentorMenteeMatch.findAll({});
	let results: string[][] = [];
	for (let i = 0; i < response.length; i++) {
		let result_1 = await User.findOne({
			where: {
				id: response[i].menteeID,
			},
		});
		let result_2 = await User.findOne({
			where: {
				id: response[i].mentorID,
			},
		});
		if (result_1 && result_2) {
			results.push([result_1.name, result_2.name]);
		}
	}

	return results;
};

const adminMatchPairs = async () => {
	// check whether the forms have been closed
	// run the matching algorithm and get the results, insert the mentee and mentor ids
	// into the MentorMenteeMatchs model.
	let result: string = "";
	// pass the mentees' and mentors' relevant information for matching
	// from their tables as arguments to the script.
	exec("'python ../matching/main.py' arg1 arg2", (error, stdout, stderr) => {
		if (error) {
		} else if (stderr) {
		} else {
			result = stdout;
		}
	});
	// assuming that stdout looks like this: "1001 1002, 1003 1000, etc. MentorID MenteeID"
	let arr: string[][] = [];
	for (let i = 0; i < result.length; i++) {
		if (result[i] == " ") continue;
		let flag = 0;
		let str1 = "",
			str2 = "";
		for (let j = i; result[j] != ","; j++) {
			if (result[j] == " ") {
				flag = 1;
				j++;
			}
			if (flag == 0) {
				str1 += result[j];
			} else {
				str2 += result[j];
			}
		}
		arr.push([str1, str2]);
	}
	let responses: string[][] = [];
	for (let i = 0; i < arr.length; i++) {
		const res1 = await User.findOne({
			// what if there is more than name?
			attributes: ["name"],
			where: {
				id: parseInt(arr[i][0]),
			},
		});
		const res2 = await User.findOne({
			attributes: ["name"],
			where: {
				id: parseInt(arr[i][1]),
			},
		});
		if (!res1 || !res2) {
			/* some error */
		} else {
			responses.push([res1.name, res2.name]);
		}
	}
	return { responses };
};

const adminViewRegFormWindow = async (type: string) => {
	if (type === "mentor") {
		let result = await Form.findOne({
			attributes: ["formOpenDatetime", "formCloseDatetime"],
			where: {
				type: "mentor",
			},
		});
		return result?.dataValues;
	} else if (type === "mentee") {
		let result = await Form.findOne({
			attributes: ["formOpenDatetime", "formCloseDatetime"],
			where: {
				type: "mentee",
			},
		});
		return result?.dataValues;
	}
	// else
	return {};
};

const adminSetRegFormWindow = async (type: string) => {
	let response;
	if (type === "mentor") {
		// if formOpenDatetime is null initially - open the form
		// updated logic: if formOpenDatetime < formCloseDatetime and current time > formCloseDatetime
		// then open the form
		// else if formOpenDatetime > formCloseDatetime or formCloseDatetime is null
		// then close the form
		let result = await Form.findOne({
			where: {
				type: "mentor",
			},
		});
		if (result) {
			let openTime = result.dataValues.formOpenDatetime;
			let closeTime = result.dataValues.formCloseDatetime;
			if (openTime == null || openTime < closeTime) {
				// open the form
				await Form.update(
					{
						formOpenDatetime: sequelize.fn("NOW"),
					},
					{
						where: {
							type: "mentor",
						},
					}
				);
			} else if (closeTime == null || openTime > closeTime) {
				// close the form
				await Form.update(
					{
						formCloseDatetime: sequelize.fn("NOW"),
					},
					{
						where: {
							type: "mentor",
						},
					}
				);
			}
		} else {
			/* error handling */
		}
		response = await Form.findOne({
			where: {
				type: "mentor",
			},
		});
	} else if (type === "mentee") {
		let result = await Form.findOne({
			where: {
				type: "mentee",
			},
		});
		if (result) {
			let openTime = result.dataValues.formOpenDatetime;
			let closeTime = result.dataValues.formCloseDatetime;
			if (openTime == null || openTime < closeTime) {
				// open the form
				await Form.update(
					{
						formOpenDatetime: sequelize.fn("NOW"),
					},
					{
						where: {
							type: "mentee",
						},
					}
				);
			} else if (closeTime == null || openTime > closeTime) {
				// close the form
				await Form.update(
					{
						formCloseDatetime: sequelize.fn("NOW"),
					},
					{
						where: {
							type: "mentee",
						},
					}
				);
			}
		} else {
			/* error handling */
		}
		response = await Form.findOne({
			where: {
				type: "mentee",
			},
		});
	}

	return response;
};

export {
	adminViewPairs,
	adminMatchPairs,
	adminViewRegFormWindow,
	adminSetRegFormWindow,
};
