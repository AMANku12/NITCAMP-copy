import { Mentee } from "../models/mentee";
import { Mentor } from "../models/mentor";
import { User } from "../models/user";
import { MentorModel } from "../types/mentor";
import { sequelize } from "../config/database";
import { MenteeModel, MenteeRequestDefinition } from "../types/mentee";

const menteeRead = async (id: number): Promise<MenteeModel | null> => {
  return await Mentee.findOne({
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

const menteeCount = async (): Promise<number> => {
  return await Mentee.count();
};

const menteeRegistration = async (
  menteeDetails: MenteeRequestDefinition
): Promise<void> => {
  let transaction = await sequelize.transaction();

  const user = await User.create(
    {
      name: menteeDetails.name!,
      phone: menteeDetails.phone!,
      email: menteeDetails.email!,
      dept: menteeDetails.dept!,
      availability: true,
      yearOfEnrollment: menteeDetails.yearOfEnrollment!,
      broadAreas: menteeDetails.broad_areas!,
      narrowAreas: menteeDetails.narrow_areas!,
    },
    { transaction }
  );

  await Mentee.create(
    {
      userId: user.id,
      yearofStudy: menteeDetails.yearOfStudy!,
      rollNo: menteeDetails.rollNo!,
    },
    { transaction }
  );

  await transaction.commit();
};

const menteeUpdation = async (
  menteeId: number,
  menteeDetails: MenteeRequestDefinition
): Promise<void> => {
  let transaction = await sequelize.transaction();

  await User.update(
    {
      name: menteeDetails.name || sequelize.col("name"),
      phone: menteeDetails.phone || sequelize.col("phone"),
      email: menteeDetails.email || sequelize.col("email"),
      dept: menteeDetails.dept || sequelize.col("dept"),
      yearOfEnrollment:
        menteeDetails.yearOfEnrollment || sequelize.col("yearOfEnrollment"),
      broadAreas: menteeDetails.broad_areas || sequelize.col("broadAreas"),
      narrowAreas: menteeDetails.narrow_areas || sequelize.col("narrowAreas"),
    },
    {
      where: {
        id: menteeId,
      },
      transaction: transaction,
    }
  );

  await Mentee.update(
    {
      rollNo: menteeDetails.rollNo || sequelize.col("rollNo"),
      yearofStudy: menteeDetails.yearOfStudy || sequelize.col("yearofStudy"),
    },
    {
      where: {
        userId: menteeId,
      },
      transaction: transaction,
    }
  );

  await transaction.commit();
};

const menteePromotion = async (
  id: number,
  number: number,
  type: string
): Promise<MentorModel | null> => {
  let transaction;
  try {
    const findUser = await User.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Mentee,
          required: true,
        },
      ],
    });
    const transaction = await sequelize.transaction();

    await Mentee.destroy({
      where: {
        userId: id,
      },
      transaction: transaction,
    });
    await Mentor.create(
      {
        userId: id,
        maxMentees: number,
        mentoringType: type,
      },
      {
        transaction,
      }
    );
    await transaction.commit();
    const response = await Mentor.findOne({
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

    return response;
  } catch (err) {
    throw err;
  }
};

export {
  menteeRead,
  menteeCount,
  menteeRegistration,
  menteeUpdation,
  menteePromotion,
};
