import numpy as np
import pandas as pd
import os

from matching import parameters

# Set param values
# data_dir = parameters.data_dir
broad_areas_filename = parameters.broad_areas_filename
narrow_areas_filename = parameters.narrow_areas_filename
# mentor_list_filename = parameters.mentor_list_filename

def cmp(a, b):
    return [c for c in a if c.isalpha()] == [c for c in b if c.isalpha()]

class mentor():
    def __init__(self, name, email, phonenum, capacity, mentorarea, narrowarea):
        self.name = name
        self.email = email
        self.phonenum = phonenum
        self.capacity = capacity
        self.mentorarea = mentorarea
        self.num_assigned = 0
        self.menteeassigned = []
        self.narrowarea = narrowarea

    def genmentorareavec(self, data_dir):
        marea = self.mentorarea.split(', ', 2)

        # broad_areas_of_exp = list(pd.read_csv(os.path.join(data_dir,
        #                                                    'broad_areas_of_expertise.csv'),
        #                                       header=None)[0].values)
        broad_areas_of_exp = list(pd.read_csv(os.path.join(data_dir,
                                                           broad_areas_filename),
                                              header=None)[0].values)
        mareavec = np.zeros(len(broad_areas_of_exp))
        for m in range(0, len(marea)):
            for ba in range(len(mareavec)):
                if (cmp(marea[m],broad_areas_of_exp[ba])):
                #if (marea[m] == broad_areas_of_exp[ba]):
                    mareavec[ba] = 1
        return (mareavec)

    def gennarrowareavec(self, data_dir):
        narea = self.narrowarea.split(', ', 2)
        # narrow_areas_of_exp = list(pd.read_csv(os.path.join(data_dir,
        #                                                     'narrow_areas_of_expertise.csv'),
        #                                        header=None)[0].values)
        narrow_areas_of_exp = list(pd.read_csv(os.path.join(data_dir,
                                                            narrow_areas_filename),
                                               header=None)[0].values)
        nareavec = np.zeros(len(narrow_areas_of_exp))
        for n in range(0, len(narea)):
            for na in range(len(nareavec)):
                if (cmp(narea[n],narrow_areas_of_exp[na])):
                #if (narea[n] == narrow_areas_of_exp[na]):
                    nareavec[na] = 1
        return (nareavec)


class mentee():
    def __init__(self, name,email,phonenum,rollnum,yearofstudy,menteearea,narrowarea,mentorpref):
        self.name = name
        self.email = email
        self.phonenum = phonenum
        self.rollnum = rollnum
        self.yearofstudy = yearofstudy
        self.menteearea = menteearea
        self.mentorpref = mentorpref
        self.mentorassigned = []
        self.narrowarea = narrowarea

    def genmenteeareavec(self, data_dir):
        marea = self.menteearea.split(', ', 2)
        # broad_areas_of_exp = list(pd.read_csv(os.path.join(data_dir,
        #                                                    'broad_areas_of_expertise.csv'),
        #                                       header=None)[0].values)
        broad_areas_of_exp = list(pd.read_csv(os.path.join(data_dir,
                                                           broad_areas_filename),
                                              header=None)[0].values)
        mareavec = np.zeros(len(broad_areas_of_exp))
        for m in range(0, len(marea)):
            for ba in range(len(mareavec)):
                if (cmp(marea[m],broad_areas_of_exp[ba])):
                #if (marea[m] == broad_areas_of_exp[ba]):
                    mareavec[ba] = 1
        return (mareavec)

    def gennarrowareavec(self, data_dir):
        narea = self.narrowarea.split(', ', 2)
        # narrow_areas_of_exp = list(pd.read_csv(os.path.join(data_dir,
        #                                                     'narrow_areas_of_expertise.csv'),
        #                                        header=None)[0].values)
        narrow_areas_of_exp = list(pd.read_csv(os.path.join(data_dir,
                                                            narrow_areas_filename),
                                               header=None)[0].values)
        nareavec = np.zeros(len(narrow_areas_of_exp))
        for n in range(0, len(narea)):
            for na in range(len(nareavec)):
                if (cmp(narea[n], narrow_areas_of_exp[na])):
                #if (narea[n] == narrow_areas_of_exp[na]):
                    nareavec[na] = 1
        return (nareavec)

    def genmentorprefvec(self, num_mentors, data_dir):
        narea = self.mentorpref.split(',', 2)
        # mentorlist = list(pd.read_csv(os.path.join(data_dir,
        #                                            'mentorlist.csv'),
        #                               header=None)[0].values)
        # mentorlist = list(pd.read_csv(os.path.join(data_dir,
        #                                            mentor_list_filename),
        #                               header=None)[0].values)
        print(pd.read_csv(os.path.join(data_dir, parameters.loc1)))
        mentorlist = list(pd.read_csv(os.path.join(data_dir, parameters.loc1)).loc[:, 'name'].values)
        nareavec = np.zeros(len(mentorlist))
        for m in range(0, len(narea)):
            for oa in range(len(nareavec)):
                if(cmp(narea[m],mentorlist[oa])):
                #if (narea[m] == mentorlist[oa]):
                    nareavec[oa] = 1

        return (nareavec)