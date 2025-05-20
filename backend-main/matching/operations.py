import pandas as pd
import xlrd
import numpy as np
from numpy import linalg as LA

# Simple function to reverse a list of numbers
#Used in the selection sort function
def Reverse(lst):
    return [ele for ele in reversed(lst)]

# Simple selection sort to arrange numbers in a list in the descending order
#Used during the code that exedcutes the assignment process
def selection_sort(n):
    j = 0
    for ii in range (0,len(n)-1):
        ind = n.index(min(n[ii:]))
        n[j],n[ind]=n[ind],n[j]
        j = j + 1
    n = Reverse(n)
    return(n)

# Function to read in the mentor signup sheet and return the required contact information and area selection information
def readmentorsignup(file_loc):
    # wb = xlrd.open_workbook(file_loc)
    # wsheet = wb.sheet_by_index(0)
    wsheet = pd.read_csv(file_loc)
    print(wsheet.head())
    print(wsheet.shape)

    # numcol = wsheet.ncols
    # numrow = wsheet.nrows
    numrow = wsheet.shape[0]
    print(numrow)
    # numcol = wsheet.shape[1]
    # headers = []

    name = []
    email = []
    phonenum = []
    capacity = []
    mentorarea = []
    narrowarea = []

    # for n in range(0, numcol):
    #     # headers.append(wsheet.cell_value(0,n))
    #     headers.append(wsheet.iloc[0, n])
    # for n in range(1, numrow):
    for n in range(0, numrow):
        # name.append(wsheet.cell_value(n,0))
        # email.append(wsheet.cell_value(n,1))
        # phonenum.append(wsheet.cell_value(n,2))
        # capacity.append(wsheet.cell_value(n,3))
        # mentorarea.append(wsheet.cell_value(n,4))
        # narrowarea.append(wsheet.cell_value(n, 5))
        name.append(wsheet.iloc[n, 0])
        email.append(wsheet.iloc[n, 1])
        phonenum.append(wsheet.iloc[n, 2])
        capacity.append(wsheet.iloc[n, 3])
        mentorarea.append(wsheet.iloc[n, 4])
        narrowarea.append(wsheet.iloc[n, 5])

    # return (numrow-1, name, email, phonenum, capacity, mentorarea, narrowarea)
    return (numrow, name, email, phonenum, capacity, mentorarea, narrowarea)

# Function to read in the mentee signup sheet and return the required contact information and area selection information
def readmenteesignup(file_loc):
    # wb = xlrd.open_workbook(file_loc)
    # wsheet = wb.sheet_by_index(0)
    wsheet = pd.read_csv(file_loc)

    # numcol = wsheet.ncols
    # numrow = wsheet.nrows
    numrow = wsheet.shape[0]
    # numcol = wsheet.shape[1]
    # headers = []

    name = []
    email = []
    phonenum = []
    rollnum = []
    yearofstudy = []
    menteearea = []
    narrowarea = []
    mentorpref = []

    # for n in range(0, numcol):
    #     # headers.append(wsheet.cell_value(0,n))
    #     headers.append(wsheet.iloc[0, n])
    # for n in range(1, numrow):
    for n in range(0, numrow):
        # name.append(wsheet.cell_value(n,0))
        # email.append(wsheet.cell_value(n,1))
        # phonenum.append(wsheet.cell_value(n,2))
        # rollnum.append(wsheet.cell_value(n,3))
        # yearofstudy.append(wsheet.cell_value(n,4))
        # menteearea.append(wsheet.cell_value(n,5))
        # narrowarea.append(wsheet.cell_value(n, 6))
        # mentorpref.append(wsheet.cell_value(n, 7))
        name.append(wsheet.iloc[n, 0])
        email.append(wsheet.iloc[n, 1])
        phonenum.append(wsheet.iloc[n, 2])
        rollnum.append(wsheet.iloc[n, 3])
        yearofstudy.append(wsheet.iloc[n, 4])
        menteearea.append(wsheet.iloc[n, 5])
        narrowarea.append(wsheet.iloc[n, 6])
        mentorpref.append(wsheet.iloc[n, 7])

    # return (numrow-1, name, email, phonenum, rollnum, yearofstudy, menteearea, narrowarea, mentorpref)
    return (numrow, name, email, phonenum, rollnum, yearofstudy, menteearea, narrowarea, mentorpref)


# Function to use data from the mentee and mentor sign up sheets to provide a compatibility matrix to be used in the assignment process
def compatibility_rank_calc(num_mentees,num_mentors,menteeveclist,mentorveclist):
    compatibility_matrix = np.zeros((num_mentees,num_mentors))
    rowsum = np.zeros(num_mentees)
    rowmax = np.zeros(num_mentees)

    for n in range (0,num_mentees):
        for m in range (0,num_mentors):
            numerator = np.sum(np.array(mentorveclist[m])*np.array(menteeveclist[n]))
            denominator = (LA.norm(np.array(mentorveclist[m]))*LA.norm(np.array(menteeveclist[n])))
            if (numerator==0):
                compatibility_matrix[n, m] = 0
            else:
                compatibility_matrix[n,m] = numerator/denominator
        rowmax[n] = max(compatibility_matrix[n,:])
        rowsum[n] = sum(compatibility_matrix[n,:])
    return(compatibility_matrix,rowmax,rowsum)

# Function uses the max value from each row of compatibility matrix to decide the order of assignment process
def assignmentorder(rmax,num_mentees):
    #Selection sort on rowmax
    #Highest values in rowmax will be used to make the first round of assignments (best matches asssigned first)
    R1 = np.unique(rmax)
    R = R1.tolist()
    A = selection_sort(R)

    # Check for the highest values of rowmax to identify the order of mentee assignment
    indxs =[]
    for m in range (0,len(A)):
        for n in range (0,num_mentees):
            if (rmax[n]==A[m]):
                indxs.append(n)
    #print("Assignment order : ", indxs)
    return(indxs)

# Function uses the mentee compatibility scores to identify the best order in which to consider matching a mentee to appropriate mentors
def mentormatchorder(rownum, cmat):
    rowtoassign = cmat[rownum,:]
    R1 = np.unique(rowtoassign)
    R = R1.tolist()
    A = selection_sort(R)
    mentororder =[]
    for m in range (0,len(A)):
        for n in range (0,len(rowtoassign)):
            if (A[m]!=0):
                if (rowtoassign[n]==A[m]):
                    mentororder.append(n)
    #print("Mentor match order : ", mentororder)
    return(mentororder)

# Function calls the mentormatc h order function first and then uses the returned value to make assignments considering
# 1. If each mentors capacity has been reached or not
# 2. Best compatibility score is utilized in the assignment of a mentor
def singlerowassign(mentees, mentors, rownum, rowsum, cmat):
    assignment = 0
    if (rowsum[rownum] == 0):
        mentees[rownum].mentorassigned = "No match"
    else:
        mentororder = mentormatchorder(rownum, cmat)
        for n in range (0,len(mentororder)):
            if ((mentors[mentororder[n]].num_assigned < mentors[mentororder[n]].capacity) & (assignment==0) & (mentororder[n]!=0)):
                mentors[mentororder[n]].menteeassigned.append(mentees[rownum].name)
                mentors[mentororder[n]].num_assigned = mentors[mentororder[n]].num_assigned + 1
                mentees[rownum].mentorassigned.append(mentors[mentororder[n]].name)
                assignment = 1
        if (assignment==0):
            mentees[rownum].mentorassigned = "No Match"
    return(assignment)

# Function assignmentorder()  and singlerowassign() functions to
# 1. Determine order of the assignment process based on highesrt compatibility scores (highest assigned first)
# 2. Iteratively assign mentees a mentor one row at a time based on the assignment order determined
def assignment(cmat, rowmax, rowsum, mentees, mentors):
    indxs = assignmentorder(rowmax,len(mentees))
    num_assigned = 0
    for n in range (0,len(indxs)):
        assignment = singlerowassign(mentees, mentors, indxs[n], rowsum, cmat)
        if (assignment>0):
            num_assigned = num_assigned + 1
    return(mentees, mentors, num_assigned)

# Function to write out the assigned mentee mentor match list as an excel sheet