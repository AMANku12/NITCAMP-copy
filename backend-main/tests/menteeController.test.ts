import request from "supertest";
import app from "../server";
import * as menteeService from "../services/mentee";
import { Mentee } from "../models/mentee";

interface testMenteeModel {
	name: string;
	phone: string;
	email: string;
	dept: string;
	yearOfEnrollment: number;
	availability: boolean;
	broadAreas: string[];
	narrowAreas: string[];
	rollNo: string;
	yearofStudy: number;
}
jest.mock("../services/mentee");

describe("Mentee Controller", () => {
	describe("POST /mentees", () => {
		it("should create a new mentee", async () => {
			const newMentee: testMenteeModel = {
				name: "Jane Doe",
				email: "jane@example.com",
				phone: "8238244",
				dept: "CSE",
				yearOfEnrollment: 2012,
				availability: true,
				broadAreas: ["cp", "ml"],
				narrowAreas: ["leetcode", "rl"],
				rollNo: "fgnrng",
				yearofStudy: 2012,
			};
			let createMentee = menteeService.menteeRegistration;
			(createMentee as jest.Mock).mockResolvedValue(newMentee);

			const response = await request(app).post("/api/mentees").send(newMentee);

			expect(response.status).toBe(201);
			expect(response.body).toEqual(newMentee);
		});
	});
});