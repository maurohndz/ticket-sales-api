Feature: Create a new customer
  In order to have customers in the platform
  As a user
  I want to register myself as a new customer

  Scenario: Create customer
    Given I send a PUT request to "/customer/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
      "names": "Jhon",
      "last_name": "Perez",
      "email": "jhonperez@yopmail.com"
    }
    """
    Then the response status code should be 201

 Scenario: An invalid non existing customer
    Given I send a PUT request to "/customer/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
      "names": 400,
      "last_name": "Perez",
      "email": "jhonperez@yopmail.com"
    }
    """
    Then the response status code should be 422