# Log Job Applications

## Log New Application

Given that the user is in the main *Job Applications* page

![image](mainPage.png)

When the *New Job Application* button is clicked,
![image](newButton.png)
 a form should pop up. 
 ![image](newForm.png)

If the user clicks *Cancel*, 
![image](cancelSubmitButton.png)
then they should be redirected back to the main page.
![image](mainPage.png)


If the user clicks *Submit* without filling in the necessary details, they will be shown errors. 
![image](newForm-1.png)

If the user clicks on the *Company* field, and enters a letter, a dropdown menu containing all the companies with names that contain the entered letter should appear. 
![image](newForm-2.png)

If the user clicks on one of the options from the menu, then the menu should close and the value in the field should be replaced with the selected company's name. 
![image](newForm-3.png)

The *Status* field should be filled in with *Not Applied* by default. 
![image](newForm-4.png)

If user chooses to change this, if they click on the field, a dropdown menu should appear. 
![image](newForm-5.png)


Selecting one of the options should close the menu and the value in the *Status* field should be replaced with the new status. 
![image](newForm-6.png)


If the user clicks on the *Deadline Date* field, then a mini calendar should pop up. 
![image](newForm-7.png)


Clicking on one of the dates in the calendar should close the calendar itself and the value in the field should be replaced with the selected date.
![image](newForm-8.png)


If the user enters an invalid URL, then they should see an error. 
![image](newForm-9.png)

If the user only partially fills in the form, they will be shown errors. 
![image](newForm-10.png)

If all the necessary fields are filled in with valid data, and they click *Submit*, the fields should all appear disabled, with a loading spinner displayed in the *Submit* button.
![image](newForm-11.png)

Once the new application has been successfully added, they should be redirected to the main page and the new application should be displayed. 
![image](newForm-12.png)


## Delete Entry

On the main page, if the user chooses one of the listed job applications and clicks its corresponding *Delete* button, 
![image](delete-1.png)

then a warning message should pop up. 
![image](delete-2.png)


If the user clicks *Cancel*, 
![image](cancelDeleteButton.png)
then the user should be redirected back to the main page and no deletion should occur.

If the user clicks *Delete*, then both the *Cancel* and *Delete* buttons should appear disabled, with a loading spinner being displayed in the *Delete* button. 
![image](delete-3.png)

Once the application has been successfully deleted, they should be redirected to the main page and the recently deleted application should no longer be displayed. 
![image](delete-4.png)

## Update Status
On the main page, if the user selects one of the listed job applications and clicks on the current status, 
![image](status-1.png)

a dropdown menu should appear. 
![image](status-2.png)


If the user clicks on any of the status options other than the current status, then the application should appear with the new status. 
![image](status-3.png)


## Edit Application Details
On the main page, if the user chooses one of the listed job applications and clicks its corresponding *Edit* button,
![image](edit-1.png)

then an application form should pop up.

The fields in this form should be pre-filled with the current values. 

 ![image](edit-2.png)


If the user clicks *Submit* without making any changes, 
 ![image](cancelSubmitButton.png)

they should see the *No fields were changed* error and be prompted to fill in the form again. 
 ![image](edit-3.png)

If the user clicks *Cancel*,
 ![image](cancelSubmitButton.png) 
they should be redirected back to the main page and no such changes should have been made. 

Filling in the form works the same way as in *Log New Application*. 
 ![image](edit-4.png)
 (Notice the new job title and new deadline date.)


Once the user clicks the *Submit* button, 
 ![image](cancelSubmitButton.png) 
all fields and buttons should appear disabled, with a loading spinner being displayed in the *Submit* button. 
 ![image](edit-5.png)

The user should be redirected back to the main page and see the recently edited application with its modified values. 
 ![image](edit-6.png)
