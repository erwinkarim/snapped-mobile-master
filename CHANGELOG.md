
# Change Log
All notable changes to this project will be documented in this file.

## [Unreleased] - yyyy-mm-dd
 
Upcoming release.

### Addition
- STUDENTS > Ranking

### Fixes
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
