Feature: NewEmployee
  As a manager, I am able to create and validate new employee record 

  @check-create_new_employee
  Scenario: 001 Check my profile information
    Given Im logged into workmotion as "aliaa+qahrmanager@workmotion.com"
    When I click on the add employee button
    And I click on the create new link of the add employee menu
    Then I should see the "Where do you want to hire?" message on the page
    When I select the "Pakistan" country from the dropdown
    And I click the get Started button on country selections page
    Then the following information should match for the contrat details page:
      | STEP1          | STEP2          | STEP3            | STEP4             | STEP5         |
      | Contract Details| Contract Clauses| Salary Calculator | Invite Employee    | Summary Review |
    When I fill the employee agreement details of step 1 using following information:
     | Talent's First Name| Talent's Last Name| Eligible To Work| Executive| Job Title               |Job Description| Upload File    | Employment Type|Working Hours|Contract Type|Contract Start Date|Contract End Date|Reimburse Expenses|Work From Home|Invoice Reference| Entity |
     | Shahzad            | Akram             |     yes         | No       | SQA Automation Engineer | QA            |<qa job details>|   full-time    | 40           | fixed-term  |2022-05-05        |2023-05-05       |  no              | yes          | Cost Center     | N/A    |
     And I click continue button
     And I fill the contract clauses details of step 2 using following information:
     | PTO  | Probationary Period| Probation Period| Termination Period| Anything Else|
     | 10   | yes                |     3           | 1                 | N/A          |
     And I click continue button
     And I fill the salary calculator details of step 3 using following information:
     | Base Salary | Bonus| Bonus Frequency| Gross Annual Bonus| Anything Else |
     | 850000      | yes  |     yearly     | 100000            | N/A          | 
     And I click on calculate button on salary calculator
     Then I should see "Estimated Onboarding Cost" section containing "OTHER PAYMENTS" "ONE TIME PAYMENTS" "MONTHLY PAYMENT" "Total Gross And Allowances" and "Employer Contributions" details on salary calculator page
     And I click continue button
     And I fill the invite employee details of step 4 using following information:
     | Talent's Email  | 
     | <random_email>  |            
     And I click continue button
     Then I should see that the summary review details on step 5 has "CONTRACT DETAILS" "CONTRACT CLAUSES" "SALARY CALCULATOR" "INVITE EMPLOYEE" "FEE ESTIMATE" sections 
     And  I should see "Estimated Onboarding Cost" section containing "OTHER PAYMENTS" "ONE TIME PAYMENTS" "MONTHLY PAYMENT" "Total Gross And Allowances" and "Employer Contributions" details on salary calculator page
     And I should be able to download agreement
     When I click the checkbox on summary review page to confirm onboarding process
     And I click finish button
     Then I should see a message "Congratulations, Onboarding has started!" on new page
     And I should see "ADDITIONAL DETAILS NEEDED" text on new page
     When I fill the additional finance details and manager details using following information:
     | Email Address       | First Name| Last Name | Manager Email |
     | qatesting@test.com  | Shahzad   | Akram     | managertesting@test.com |
     And I click finish button
     Then I should see a confirmation message "Thanks for completing the onboarding experience!"
     When I click action items link from left panel of the page 
     Then I should see "Action items" page containing "UNCOMPLETED ACTIONS" related records
     When I click mark as done button against newly created record
     Then I should see that new entry has now done status in action items page
