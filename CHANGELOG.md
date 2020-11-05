
# Change Log
All notable changes to this project will be documented in this file.

## [Unreleased]
 
Upcoming release.

### To Be Added


#### Teacher's View

- Settings > Logout
- ASSIGNMENT > List
- Assignment > List > Details
    - List of submissions
- Assignment > Create
    - Form
- Assignment > Create > Question > Create
    - Form
    - Manual Description
- Assignment > Mark > Details
    - Carousel of assignment photo answers (placeholder)
    - Assignment details (hardcoded)
- Assignment > Mark > Answer Preview
    - Expanded view of photo answer
    - Triggered via 'expand' icon or 'Marking' button on Mark > Details
- Assignment > Mark > Add Feedback

#### Student's View
- Settings > Logout
- LAYOUT: 
    - Bottom navigation bar with Student's quick menus
- LOGIN
    - User Authentication
    - Redirect to Student's Home screen
    - Auto-login with token
- HOME
    - User details
    - List of active assignments(without countdown timer)
- CLASS
    - LINKS: 
        - Classmates (tab) : Displays class ranking
        - Teachers (tab) : Displays class' teachers
        - Search (icon) : Displays classmates
        - School Rank (text) : Displays ranking for whole school
- CLASS > Ranking: 
        - Lists Students ranking in the class
        - First place has medal icon
- CLASS > Teachers
        - List all teachers for the class
        - Homeroom teacher has yellow bookmark icon
- CLASS > Classmates
        - List all classmates in the class
- CLASS > School Rank
        - Currently, displaying Class Ranking (to be updated)
- ASSIGNMENT > Index
    - Placeholder for Calender
    - Assignment List (excluding marked assignments)
- ASSIGNMENT > Show
    - Placeholder for Countdown Timer, Assignment details and Submissions   
- ASSIGNMENT > Answer > Write
    - Text area
    - Save function (temporary save before Submit Answer)
- ASSIGNMENT > Answer > Write
    - Assignment title (hardcoded)
    - Edit Answer button (returns to Answer > Write with saved answer)
    - Remarks text area



### To Be Fixed

#### Teacher's View
- HOME
    - Implement countdown timer for active assignments
- STUDENTS > List > Student Detail
    - Implement radial bar with percentage for Total assignments score
    - Fix rotating color for Overall Subject Score cards (previously all cards are red)

### KIV
- Logout screen. Not available in UI design (Figma).
- UI design for null data. E.g. No classes, active assignments, submissions on Home page.    
    
## [1.0.0] - 2020-10-27
  
This is the first release for staging.
Limited to only users with Teacher role. 

### Added

- LAYOUT: Dashboard layout with dynamic bottom navbar
- LOGIN : Screen + User Authentication
- HOME
    - User details
    - List of classes (with homeroom label)
    - List of active assignments(without countdown timer)
    - Submissions (hardcoded)
- CLASS
    - Number of current teaching class
    - List of classes (with homeroom label)
- CLASS > Details
    - List of teaching subjects with students for selected class
    - Searchable student name
- STUDENTS > List
    - List of students for whole school
    - Searchable student name
- STUDENTS > List > Student Detail
    - Student's detail (name & class)
    - Student's rankings
    - Student's Badges (hardcoded)
    - Student's Assignment
    - Student's Overview
