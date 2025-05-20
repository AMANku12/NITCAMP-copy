'''
This file be used to create code sections to statistically analyze the assignement process and validate the mentee-mentor match
'''

# Import packages
import pandas as pd
from matching import parameters
import os

class postprocessor():
    # def __init__(self, loc1, opfile, val1, data_dir):
    def __init__(self, loc1, opfile, loc2, data_dir):
        # self.data_dir = parameters.data_dir
        self.data_dir = data_dir
        self.formatted_match_file = parameters.formatted_match_file
        # self.match_df = pd.read_excel(opfile)
        self.match_df = pd.read_csv(os.path.join(data_dir, opfile))
        # self.mentee_df = pd.read_excel(val1)
        # self.mentee_df = pd.read_excel(loc2)
        self.mentee_df = pd.read_csv(os.path.join(data_dir, loc2))
        # Drop NaN in relevant columns
        self.match_df = self.match_df.dropna(subset=['Mentee'])
        self.mentee_df = self.mentee_df.dropna(subset=['name', 'preferences'])
        # Convert mentor names to user-friendly string
        self.match_df['Mentor'] = self.match_df['Mentor'].str.strip("['").str.strip("']")
        #print(self.match_df.head())
        # print(self.mentee_df.head())
        # self.mentor_df = pd.read_excel(loc1)
        self.mentor_df = pd.read_csv(os.path.join(data_dir, loc1))
        # mentor_list_filename = parameters.mentor_list_filename
        # self.mentor_list_df = pd.read_csv(os.path.join(self.data_dir, mentor_list_filename))
        self.mentorlist = list(pd.read_csv(os.path.join(data_dir, parameters.loc1)).loc[:, 'name'].values)

    def validate(self):
        '''
        Test 1: No mentor's capacity must be exceeded
        '''
        print("************* Start TEST 1: No mentor's capacity must be exceeded")
        # Compute number of mentees assigned to each mentor
        mentor_match_stats_df = self.match_df.groupby('Mentor').agg('count').reset_index()
        mentor_match_stats_df = mentor_match_stats_df.rename(columns={'Mentee': 'n_mentees_assigned'})
        # Join mentor capacity data
        mentor_match_stats_df = mentor_match_stats_df.merge(self.mentor_df[['name', 'maximum_no_of_mentees_can_be_hold']],
                                                            left_on=['Mentor'],
                                                            right_on=['name'],
                                                            how='left').drop(columns=['name'])
        print('mentor_match_stats_df.head(): {}'.format(mentor_match_stats_df.head()))
        print('mentor_match_stats_df.columns: {}'.format(mentor_match_stats_df.columns))
        # Verify that no mentor's capacity is exceeded
        mentor_match_stats_df['mentor_capacity_violation'] = \
            mentor_match_stats_df['n_mentees_assigned'] > mentor_match_stats_df['maximum_no_of_mentees_can_be_hold']
        mentor_cap_viol_df = mentor_match_stats_df.loc[mentor_match_stats_df['mentor_capacity_violation'], :].copy()
        print('Number of mentor capacity violations: {}'.format(len(mentor_cap_viol_df)))
        print('Mentor capacity violations: {}'.format(mentor_cap_viol_df))
        # Compute number of mentors who have not been assigned any mentees
        # n_mentors_without_match = len(self.mentor_list_df) - len(mentor_match_stats_df)
        n_mentors_without_match = len(self.mentorlist) - len(mentor_match_stats_df)
        print('Number of mentors who have not been assigned any mentees: {}'.format(n_mentors_without_match))
        print("************* End TEST 1: No mentor's capacity must be exceeded")

        '''
        Test 2: No mentee must be assigned more than one mentor
        '''
        print("************* Start TEST 2: No mentee must be assigned more than one mentor")
        # Compute number of mentees assigned to each mentor
        mentee_match_stats_df = self.match_df.groupby('Mentee').agg('count').reset_index()
        mentee_match_stats_df = mentee_match_stats_df.rename(columns={'Mentor': 'n_mentors_assigned'})
        mentee_cap_viol_df = mentee_match_stats_df.loc[mentee_match_stats_df['n_mentors_assigned']>1, :].copy()
        print('Number of mentee capacity violations: {}'.format(len(mentee_cap_viol_df)))
        print('Mentee capacity violations: {}'.format(mentee_cap_viol_df))
        print("************* End TEST 2: No mentee must be assigned more than one mentor")

    def compute_stats(self):
        '''
        Task 1: Compute the number and fraction of mentees
        who have been assigned with mentors not in their preference
        '''
        print('''************* Start STATS 1: Compute the number and fraction of mentees
        who have been assigned with mentors not in their preference
        ''')
        # Create empty dataframe to store match stats
        stats_df = pd.DataFrame()
        # First column will have mentees and this will be the unique identifier column
        # TODO: create a new unique identifier ID to prevent duplicates in names
        stats_df['mentee'] = self.mentee_df['name'].copy()
        # Create a column for match status; initialize with False
        # (True: matched; False: unmatched)
        stats_df['match_status'] = False
        # Create a column for preferred mentors; initialize with False
        # (True: at least one preferred mentor matched; False: no preferred mentor matched)
        stats_df['pref_mentor_status'] = False

        #print("self.match_df['Mentee']: {}".format(list(self.match_df['Mentee'])))
        for mentee in stats_df['mentee']:
            # Fill in match status column
            match_status = mentee in list(self.match_df['Mentee'])
            stats_df.loc[stats_df['mentee']==mentee, 'match_status'] = match_status
            # Fill in preferred mentor match status column, if there is a match
            if match_status:
                # print('mentee: {}'.format(mentee))
                assigned_mentor = self.match_df.loc[self.match_df['Mentee']==mentee, 'Mentor'].values[0]
                # print('assigned_mentor: {}'.format(assigned_mentor))
                pref_mentors = self.mentee_df.loc[self.mentee_df['name'] == mentee, 'preferences'].values[0].split(',')
                # print('pref_mentors: {}'.format(pref_mentors))
                stats_df.loc[stats_df['mentee']==mentee, 'pref_mentor_status'] = \
                    assigned_mentor in pref_mentors

        # Merge mentee df and match df and save to disk
        mentee_match_df = self.mentee_df.merge(self.match_df,
                                          left_on=['name'],
                                          right_on=['Mentee'],
                                          how='inner')
        # mentee_match_df.to_excel('mentee_match_df.xlsx')
        mentee_match_df.to_excel(os.path.join(self.data_dir, self.formatted_match_file), index=False)


        # print(stats_df.head())
        #print("Number of students matched : ",stats_df['match_status'].sum())
        print("Number of Students assigned a prefered match : ",stats_df['pref_mentor_status'].sum())
        print('''************* End STATS 1: Compute the number and fraction of mentees
        who have been assigned with mentors not in their preference
        ''')

        return mentee_match_df