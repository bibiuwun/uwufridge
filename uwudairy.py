import uwuperson_v1 as person

#3500 kcal is 1 lb; lose 0.5-1% per week is healthy 
person_age = int(input("Age in Years: "))
person_sex = str(input("Sex [M or F]: "))
person_height = int(input("Height in Inches: "))
person_weight = int(input("Weight in lbs: "))
person_goal = str(input("Goal [Fat Loss, Maintain, Bulk]: "))
person_activitylvl = int(input("Activity Level [1,2,3,4]: "))

name = input("Your Name: ")
print("Created Profile!")
globals()[name] = person.Person(person_age, person_sex, person_height, person_weight, person_goal, person_activitylvl)

MAINTAIN = globals()[name].maintenance_calories()
CALORIE_GOAL_LIGHT = globals()[name].calorie_intake_lower()
CALORIE_GOAL_HARD = globals()[name].calorie_intake_upper()
PROTEIN_GOAL = globals()[name].macro_split(CALORIE_GOAL_HARD)[1]
FAT_GOAL = globals()[name].macro_split(CALORIE_GOAL_HARD)[2]
CARB_GOAL = globals()[name].macro_split(CALORIE_GOAL_HARD)[0]

Mon, Tues, Wed, Thurs, Fri, Sat, Sun = [], [], [], [], [], [], []

#
