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

## Search by Company

- Given that I’m on the “applications” screen, when I type in a search bar, then I will see a list of applications that “match” what I input into the search bar, while applications that don’t “match” are hidden

Primary "Match" was decided to be "company name starts with" the searched string, while a secondary match is "company name includes" the searched string

Current applications
![image](test3-1.png)

Primary match for "Niche"
![image](test3-2.png)
Note Varian ends in an "n", so it will show up as a secondary match

Primary match for "Niche", hiding "Varian"
![image](test3-3.png)

Secondary match for "Niche"
![image](test3-4.png)

- Given that I have typed something into a search bar, then when I delete the input, then I will see the full list of applications once more

From this state:
![image](test3-4.png)

If we delete the search bar we get both applications:
![image](test3-5.png)