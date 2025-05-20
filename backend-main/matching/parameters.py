'''
This file contains all parameters that can be tweaked
'''

# Import packages
import os

# Define parameters
# opfile = os.path.join(data_dir, "Assigned.xlsx")
# loc1 = os.path.join(data_dir, "Mentor_test_cleaned.xls")
# loc2 = os.path.join(data_dir, "Mentee_test_cleaned.xls")
# val1 = os.path.join(data_dir, "Mentee_data_cleaned.xlsx")
# formatted_match_file = os.path.join(data_dir, "mentee_match_df.xlsx")
# opfile = "Assigned.xlsx"
opfile = "match.csv"
# loc1 = "Mentor_test_cleaned.xls"
loc1 = "mentors_clean.csv"
# loc2 = "Mentee_test_cleaned.xls"
loc2 = "mentees_clean.csv"
# val1 = "Mentee_data_cleaned.xlsx"
# formatted_match_file = "mentee_match_df.xlsx"
formatted_match_file = "match_formatted.xlsx"
broad_areas_filename = 'broad_areas_of_expertise.csv'
narrow_areas_filename = 'narrow_areas_of_expertise.csv'
# mentor_list_filename = 'mentorlist_cleaned.csv'

mentees_raw_filename = 'mentees_raw.csv'
mentors_raw_filename = 'mentors_raw.csv'

wt1 = 0.1 #Broad area list weightage
wt2 = 0.1 #Narrow area list weightage
wt3 = 0.8 #Mentee preference vec