import pandas as pd

from matching import people
from matching import operations
from matching import postprocess
import numpy as np
from matching import parameters
import os

'''
TODO: 
I. Data Cleaning
1. Remove duplicate mentors (DONE)
a. Removed duplicates from mentorlist.csv and saved it as mentorlist_cleaned.csv (DONE)
b. Removed duplicates from Mentor_test.csv and saved it as Mentor_test_cleaned.csv. (DONE) 
Need to verify if the top to bottom of the list follows chronological order of sign up.
2. Remove duplicate mentees (DONE)
b. Removed duplicates from Mentee_test.csv and saved it as Mentee_test_cleaned.csv. (DONE) 
3. Drop mentors with no data in required columns (NOT DONE)
4. Drop mentees with no data in required columns (NOT DONE)

II. Tests
1. No mentor's capacity must be exceeded
2. No mentee must be assigned more than one mentor

III. Output Statistics/Data
1. Print: How many mentors have leftover capacity, and how much is the total leftover capacity
2. Save: Excel file with details of mentors with leftover capacity
3. Print: Number and % of mentees who got preferred mentors
4. Save: Excel file with matched mentors' and mentees' details. 
This excel file must have a column that specifies whether match was preferred by mentee or not.
5. Print, save: Department-wise statistics of number of alumni signed up, number of students signed up, 
number of mentors and mentees matched, leftover capacity details, number and % of mentees who got
preferred mentors, ...
'''

def match(cwd):
    """Code to read the mentor and mentee signup sheets and then do calcualtions to consider
        1. Match between mentee requirements and mentor preferences
        2. Mentee preference for a mentor
        3. Mentor capacity for mentees
        as the main criteria for matching mentee to potential mentors and writing out a list of assignment
    # loc1 = "/Users/vignesh/PycharmProjects/NITCAMP_matching/Mentor_form.xls"
    # loc2 = "/Users/vignesh/PycharmProjects/NITCAMP_matching/Mentee_form.xls"
    """
    data_dir = os.path.join(cwd, 'data')

    # Set param values
    # opfile = parameters.opfile
    # loc1 = parameters.loc1
    # loc2 = parameters.loc2
    # val1 = parameters.val1
    opfile = os.path.join(data_dir, parameters.opfile)
    loc1 = os.path.join(data_dir, parameters.loc1)
    loc2 = os.path.join(data_dir, parameters.loc2)
    # val1 = os.path.join(data_dir, parameters.val1)
    wt1 = parameters.wt1 #Broad area list weightage
    wt2 = parameters.wt2 #Narrow area list weightage
    wt3 = parameters.wt3 #Mentee preference vec

    # Generate

    [num_mentors,mentorname,mentoremail,mentorphonenum,mentorcapacity,mentorarea,mentornarrowarea] = operations.readmentorsignup(loc1)
    mentorveclist = []
    mentornarrveclist = []
    mentors = []
    for n in range (0,num_mentors):
        print(n)
        mentors.append(people.mentor(mentorname[n],mentoremail[n],mentorphonenum[n],mentorcapacity[n],mentorarea[n],mentornarrowarea[n]))
        mentorareavec = people.mentor.genmentorareavec(mentors[n], data_dir)
        mentornarrowareavec = people.mentor.gennarrowareavec(mentors[n], data_dir)
        mentorveclist.append(mentorareavec)
        mentornarrveclist.append(mentornarrowareavec)
    #print(mentornarrveclist)

    [num_mentees,menteename,menteeemail,menteephonenum,rollnum,yearofstudy,menteearea,menteenarrowarea,menteepref] = operations.readmenteesignup(loc2)
    menteeveclist = []
    menteenarrveclist = []
    cmat2 = np.zeros([num_mentees, num_mentors])
    print("Number of mentees :", num_mentees)
    print("Number of mentors :", num_mentors)
    mentees = []
    for n in range (0,num_mentees):
        mentees.append(people.mentee(menteename[n],menteeemail[n],menteephonenum[n],rollnum[n],yearofstudy[n],menteearea[n],menteenarrowarea[n],menteepref[n]))
        menteeareavec = people.mentee.genmenteeareavec(mentees[n], data_dir)
        menteenarrowareavec = people.mentee.gennarrowareavec(mentees[n], data_dir)
        mentorprefvec = people.mentee.genmentorprefvec(mentees[n], num_mentors, data_dir)
        menteeveclist.append(menteeareavec)
        menteenarrveclist.append(menteenarrowareavec)
        cmat2[n,:]=mentorprefvec
    #print(menteenarrveclist)

    rowsum2 = np.zeros(num_mentees)
    rowmax2 = np.zeros(num_mentees)
    for n in range (0,num_mentees):
        rowmax2[n] = max(cmat2[n,:])
        rowsum2[n] = sum(cmat2[n,:])

    [cmat,rowmax,rowsum] = operations.compatibility_rank_calc(int(num_mentees),int(num_mentors),menteeveclist,mentorveclist)
    #print(np.shape(cmat))

    [cmat1, rowmax1, rowsum1] = operations.compatibility_rank_calc(int(num_mentees), int(num_mentors), menteenarrveclist, mentornarrveclist)
    #print(np.shape(cmat1))
    rowsum1 = np.zeros(num_mentees)
    rowmax1 = np.zeros(num_mentees)
    for n in range (0,num_mentees):
        rowmax1[n] = max(cmat1[n,:])
        rowsum1[n] = sum(cmat1[n,:])

    #print(np.shape(cmat2))
    # wt1 = 0.1 #Broad area list weightage
    # wt2 = 0.1 #Narrow area list weightage
    # wt3 = 0.8 #Mentee preference vec
    CMAT = wt1*cmat + wt2*cmat1 + wt3*cmat2
    #print(CMAT)

    """
    ROWMAX = rowmax2
    ROWSUM = rowsum2
    """
    ROWMAX = wt1*rowmax + wt2*rowmax1 + wt3*rowmax2
    ROWSUM = wt1*rowsum + wt2*rowsum1 + wt3*rowsum2
    
    mentee_assigned, mentor_assigned, num_assigned = operations.assignment(CMAT, ROWMAX, ROWSUM, mentees, mentors)
    #print(CMAT)

    # workbook = xlsxwriter.Workbook(opfile)
    # worksheet = workbook.add_worksheet()
    # worksheet.write(0, 0, 'Mentee')
    # worksheet.write(0, 1, 'Mentor')
    # for n in range (0,num_mentees):
    #     worksheet.write(n+1, 0, str(mentee_assigned[n].name))
    #     worksheet.write(n+1, 1, str(mentee_assigned[n].mentorassigned))

    assigned_df = pd.DataFrame()
    mentee_col_values = [str(mentee_assigned[n].name) for n in range(0, num_mentees)]
    mentor_col_values = [str(mentee_assigned[n].mentorassigned) for n in range(0, num_mentees)]
    assigned_df['Mentee'] = mentee_col_values
    assigned_df['Mentor'] = mentor_col_values
    assigned_df.to_csv(os.path.join(data_dir, opfile), index=False)

    """
        print("Mentee Name: ",mentee_assigned[n].name)
        print("Mentor assigned to mentee: ", mentee_assigned[n].mentorassigned)
        
    for n in range (0,num_mentors):
        print("Mentor Name: ",mentor_assigned[n].name)
        print("Mentees assigned to mentor: ", mentor_assigned[n].menteeassigned)
    """

    # workbook.close()
    print("Number of Students :", num_mentees)
    print("Nummber of Students assigned : ", num_assigned)
    print("Nummber of Mentors assigned : ", len(mentor_assigned))

    # Validate results by running tests
    # postprocess.postprocessor(loc1, opfile, val1, data_dir).validate()
    postprocess.postprocessor(loc1, opfile, loc2, data_dir).validate()
    # Compute statistics and save post-processed output
    # postprocess.postprocessor(loc1, opfile, val1, data_dir).compute_stats()
    postprocess.postprocessor(loc1, opfile, loc2, data_dir).compute_stats()


# if __name__ == '__main__':
#     main(cwd)