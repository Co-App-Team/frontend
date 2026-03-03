# Rate-My-Co-op

## Adding company profile:

Given that I’m on the Company Wiki screen and want to create a new company entry, when I click the “Create A New
Company Profile” button within the page, then I will be directed to the Create A New Company form to create a new company profile.

On the screen, press this button
![image](test1-1.png)

After clicking, user sees the Create A New Company modal.
![image](test1-2.png)

Given that I have completely filled in the form with valid information and the company has not yet been created, when I select the “Create” option, then I will be redirected to the Company Wiki screen and see the new company I added.

Fill in the fields, then click submit
![image](test1-3.png)

When it's finished, the modal will close and user can see the company they just added.
![image](test1-4.png)

Given that I have completely filled in the form with valid information and the company has been created, when I try to create another company of the same name, then I should see a notification saying the company already exists and the company profile could not be created.

Note that "Acceptance Test" has already been created
![image](test1-4.png)

Attempting to create a company with the same name results in an error
![image](test1-5.png)
![image](test1-6.png)

Only one instance exists after attempting to create another "Acceptance Test" company
![image](test1-7.png)

Given that I have incompletely filled in the form, when I select the “Create” option, then I should remain on the form and the missing fields should be marked in red. 

![image](test1-8.png)

If we fill in one of the fields, the red error goes away for only that field.
![image](test1-9.png)

## Writing a review

Given that I’m on the Company Wiki screen, when I click on a company name, then I should be directed to the company profile.

Clicking on one of the company cards pulls up a full screen modal of the reviews
![image](test2-1.png)
![image](test2-2.png)

Given that I’m looking at a company profile, when I look at the bottom of the page, then I should see a button to “Add A New Review”.

You can see that button here
![image](test2-3.png)

Given that I’m looking at the “Add A New Review” button, when I click the button, then I should be directed to the form to add a new review.

The reviews page is replaced with a form for adding your own review
![image](test2-4.png)

Given that I have incompletely filled in the form, when I select the “Create” option, then I should remain on the form and the missing fields should be marked in red. 

![image](test2-5.png)

If we fill in one of the fields, the red error goes away for only that field.
![image](test2-6.png)

## Reading Reviews

Given that I’m on the Company Wiki screen, when I click on a company name, then I should be directed to the company profile.

If you click on a company, you'll be directed to the company's profile.
![image](test3-1.png)
![image](test3-2.png)

Given that I’m looking at a company profile and there are reviews that exist for that company, when I look at the reviews section, then I should be able to see the reviews about the company.

Each of these cards is its own review
![image](test3-3.png)

Given that I’m looking at a company profile and there are no reviews that exist for that company, when I look at the reviews section, then I should see a message saying that there's no reviews.

![image](test3-4.png)

Given that I’m looking at the reviews about the company and there are more reviews that are not displayed on the page, when I look at the top-right corner, then I should be able to see a "next page" button.

![image](test3-5.png)

Given that I click the next page button, when I look at the reviews section, then I should be able to see a new set of reviews.

Upon clicking the next page button, user gets a different set of reviews.
(In this case, a new set of one reviews, since we don't have enough reviews in the database yet to show this with larger sets of reviews)
![image](test3-6.png)

Given that I've clicked the next page button and a previous page exists, when I look at the top-right corner, then I should be able to see a "previous page" button.

Note that on the second page, the previous page button is now clickable. Where previously it was greyed out.
![image](test3-7.png)

Given that I click the previous page button, when I look at the reviews section, then I should be able to see a previous set of reviews.

Note that this set is the first page's set of reviews.
![image](test3-8.png)