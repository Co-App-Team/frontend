# Application Filtering/Search

## Sort by date

- Given that I’m on the applications screen, when I click on an “up arrow” button next to the date applied field, then I will be shown the list of applications in order of the date ascending

First click the calendar filter button
![image](test1-1.png)

Then, click the arrow to switch it from "down" to "up"
![image](test1-2.png)

Now the arrow points up, and the dates are in ascending order
![image](test1-3.png)

- Given that I’m on the applications screen, when I click on an “down arrow” button next to the date applied field, then I will be shown the list of applications in order of the date descending

First click the calendar filter button
![image](test1-1.png)

By default, it sorts descending.

- Given that I’m on the applications screen and have previously selected one of the up or down arrows, when I clicked on the arrow that I selected, then the list will be returned to its “default” ordering

First click the calendar filter button
![image](test1-1.png)

By default, it sorts descending.

If we click the arrow to switch it from "down" to "up"
![image](test1-2.png)

Then arrow points up, and the dates are in ascending order
![image](test1-3.png)

If we then click the arrow to switch it from "up" to "down", we see the arrow points down and the dates are now in descending order
![image](test1-4.png)

## Filter by status

- Given that I’m on the applications screen, when I click on a “filter by status” button, then I will be shown a list of statuses that I can select from

Clicking on "status filters" will show all available statuses to filter by
![image](test2-1.png)

- Given that I see the list of statuses, when I click on one or more of the statuses, then I will only see applications that have statuses that match my selections.

Clicking on just "Accepted"
![image](test2-2.png)

Clicking on "Accepted" and "Interviewing"
![image](test2-3.png)

- Given that I see the list of statuses and have previously selected statuses to filter by, when I click on one or more of the statuses that I have previously selected, then I have de-selected those statuses as filters.

No filters
![image](test2-4.png)

Applied and accepted
![image](test2-5.png)

Removal of applied, just accepted
![image](test2-6.png)

Removal of accepted. No filters
![image](test2-7.png)