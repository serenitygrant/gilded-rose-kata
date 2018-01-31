# Gilded Rose: Problem

Hi and welcome to team Gilded Rose.

As you know, we are a small inn with a prime location in a prominent city ran
by a friendly innkeeper named Allison.  We also buy and sell only the finest
goods. Unfortunately, our goods are constantly degrading in quality as they
approach their sell by date.

We have a system in place that updates our inventory for us. It was developed
by a no-nonsense type named Leeroy, who has moved on to new adventures. Your
task is to add the new feature to our system so that we can begin selling a
new category of items.

First an introduction to our system:

  - All items have a sell-in value which denotes the number of days we have to
    sell the item

  - All items have a quality value which denotes how valuable the item is

  - At the end of each day our system lowers both values for every item

Pretty simple, right? Well this is where it gets interesting:

  - Once the sell by date has passed, quality degrades twice as fast

  - The quality of an item is never negative

  - "Aged Brie" actually increases in quality the older it gets

  - The quality of an item is never more than 50

  - "Sulfuras", being a legendary item, never has to be sold or decreases in
    quality

  - "Backstage passes", like aged brie, increases in quality as it's sell-in
    value approaches; quality increases by 2 when there are 10 days or less
    and by 3 when there are 5 days or less but quality drops to 0 after the
    concert

We have recently signed a supplier of conjured items. This requires an update
to our system:

  - "Conjured" items degrade in quality twice as fast as normal items

Feel free to make any changes to the update-quality method and add any new code
as long as everything still works correctly. However, do not alter the item
function as that belongs to the goblin in the corner who will insta-rage and
one-shot you as he doesn't believe in shared code ownership.


Just for clarification, an item can never have its quality increase above 50,
however "Sulfuras" is a legendary item and as such its quality is 80 and it
never alters.

## Class Solution

### Assumptions

- Item cannot be modified, but can be moved to a Class
- Any type of Item can be Conjured (ie. Aged Brie could be conjured)

### Setting up the project and running the tests

- Use `npm install` to add all of the required package libraries
- To run the tests for the class solution, use `./node_modules/.bin/jasmine ./js/spec/ClassSolution/inn.spec.js` or `npm test`
- To see a simulation of what item qualities are after a certain number of days, use `node index.js` (currently runs for 6 days)

## Non-class Solution

### Assumptions

- Item function cannot be changed or moved for fear of the Goblin one-shotting me (I hate being one-shot and needing to make a new character)
- Any type of Item can be Conjured (ie. Aged Brie could be conjured)

### Setting up the project and running the tests

- Use `npm install` to add all of the required package libraries
- To run the tests for the class solution, open the `SpecRunner.html` file in a browser
- To see a simulation of what item qualities are after a certain number of days, open the `TexttextFixture.html` file in a browser
