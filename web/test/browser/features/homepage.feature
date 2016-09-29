Feature: DADI Homepage
  As a user of the DADI website
  I want to see a complete homepage
  So that I can browse the website properly

  Scenario: Page Header
    Given I am on the homepage
    Then I should see a header with "DADI"

#  Scenario: Latest Movie News
#    Given I am on the homepage
#    Then I should see a section with the title 'Latest Movie News' in position 2
#    And I should see 6 articles
#    And I should see a Show All button which loads /movies/news/

#  Scenario: Latest Movie Reviews
#    Given I am on the homepage
#    Then I should see a section with the title 'Latest Movie Reviews' in position 3
#    And I should see 9 articles
#    And I should see a Show All button which loads /movies/reviews/

#  Scenario: Latest TV Show Reviews
#    Given I am on the homepage
#    Then I should see a section with the title 'Latest TV show reviews' in position 4
#    And I should see 9 articles
#    And I should see a Show All button which loads /tv/reviews/