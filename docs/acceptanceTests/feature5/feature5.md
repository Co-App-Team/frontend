# Interview Calendar

## Log Interview Date
Given that the user is in the *Interview Calendar* page
![image](calendarPage.png)

When the *New Job Interview* button is clicked,
![image](newButton.png)
a form should pop up.
![image](newForm-1.png)

If the user clicks *Cancel*, 
![image](cancelSubmitButton.png)
then they should be redirected back to the *Interview Calendar* page.
![image](calendarPage.png)

If the user clicks *Submit* without filling in the necessary details, they will be shown errors. 
![image](newForm-2.png)

If the user clicks on the *Job Application* field, a dropdown menu containing all the job titles of applications that are in either NOT APPLIED or APPLIED stage show up. 
![image](newForm-3.png)

Once the user selects an application from the dropdown, the value in the *Job Application* field gets replaced with the job title followed by the company that the application is for. 
![image](newForm-4.png)

Clicking *Submit* at this point should display an error. 
![image](newForm-5.png)

If the user clicks on the *Interview Date and Time* field, a date and time picker should pop up.
![image](newForm-6.png)

Once all the necessary fields are filled in and the user clicks *Submit*, the fields should all appear disabled, with a loading spinner displayed in the *Submit* button.
![image](newForm-7.png)

Once the new interview has been successfully added, they should be redirected to the *Interview Calendar* page and the new interview should be displayed. 
![image](newForm-8.png)


## Monthly Calendar View
Given that the user is in the *Interview Calendar* page, 
![image](calendarPage.png)
then the calendar should be in the current month by default. 
![image](calendar-1.png)

Looking at the calendar, the current day should be highlighted with a blue circle. 
![image](calendar-3.png)


If the user clicks the *<* button, 
![image](switchButtons.png)
then the calendar should switch to the previous month.
![image](calendar-2.png)

If the user clicks the *Today* button, 
![image](switchButtons.png)
then the calendar should switch to the current month. 
![image](calendarPage.png)

If the user clicks the *>* button, 
![image](switchButtons.png)
then the calendar should switch to the next month. 
![image](calendar-4.png)

If the user creates a new job interview, 
![image](calendar-5.png)
when the user navigates to the month in which the interview is scheduled, then the interview should be visible on the specific day it was scheduled for. 
![image](calendar-6.png)

## Quick Navigation
