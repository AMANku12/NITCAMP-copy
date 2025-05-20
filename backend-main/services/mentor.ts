import { Mentor } from "../models/mentor";
import { User } from "../models/user";
import { MentorModel } from "../types/mentor";
import { sequelize } from "../config/database";
import { MentorRequestDefinition } from "../types/mentor";

const mentorRead = async (id: number): Promise<MentorModel | null> => {
  return await Mentor.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: User,
        required: true,
      },
    ],
  });
};

const mentorCount = async (): Promise<Number> => {
  return await Mentor.count();
};

const mentorRegistration = async (
  mentorDetails: MentorRequestDefinition
): Promise<void> => {
  const transaction = await sequelize.transaction();

  // The controller will sanitize all inputs to enforce non-nullability
  const user = await User.create(
    {
      name: mentorDetails.name!,
      phone: mentorDetails.phone!,
      email: mentorDetails.email!,
      dept: mentorDetails.dept!,
      availability: true,
      yearOfEnrollment: mentorDetails.yearOfEnrollment!,
      broadAreas: mentorDetails.broad_areas!,
      narrowAreas: mentorDetails.narrow_areas!,
    },
    { transaction }
  );

  await Mentor.create(
    {
      userId: user.id,
      mentoringType: mentorDetails.mentoringType!,
      maxMentees: mentorDetails.maxMentees!,
    },
    { transaction }
  );

  await transaction.commit();
};

const mentorUpdation = async (
  mentorId: number,
  mentorDetails: MentorRequestDefinition
): Promise<void> => {
  let transaction = await sequelize.transaction();

  await User.update(
    {
      name: mentorDetails.name || sequelize.col("name"),
      phone: mentorDetails.phone || sequelize.col("phone"),
      email: mentorDetails.email || sequelize.col("email"),
      dept: mentorDetails.dept || sequelize.col("dept"),
      yearOfEnrollment:
        mentorDetails.yearOfEnrollment || sequelize.col("yearOfEnrollment"),
      broadAreas: mentorDetails.broad_areas || sequelize.col("broadAreas"),
      narrowAreas: mentorDetails.narrow_areas || sequelize.col("narrowAreas"),
    },
    {
      where: {
        id: mentorId,
      },
      transaction: transaction,
    }
  );

  await Mentor.update(
    {
      maxMentees: mentorDetails.maxMentees || sequelize.col("maxMentees"),
      mentoringType:
        mentorDetails.mentoringType || sequelize.col("mentoringType"),
    },
    {
      where: {
        id: mentorId,
      },
      transaction: transaction,
    }
  );

  await transaction.commit();
};

export { mentorRead, mentorCount, mentorRegistration, mentorUpdation };
