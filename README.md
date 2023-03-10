# lab2_software-methodology

## Description
This program implements a default circular linked list. This is one of the oldest and one of the most popular data structures. 
The main feature of linked lists is that adding/deleting elements is far more quick than in built-in arrays/lists because it doesn't need to
recreate itself. The more elements it contains, the more difference in working between linked list and array.

## Variant calculation
Defining variant formula: number of the gradebook % 4
My variant = 1326 % 4 = 2

## Instruction
The project requires node.js to be installed on your machine. I was working with 16.17.1 version.

Install all dependancies:
```bash
$ npm install
```

To run application:
```bash
$ npm start
```

To run tests:
```bash
$ npm test
```

## Reference to the commit that failed CI tests
[Failed commit](https://github.com/crazysparrow69/lab2_software-methodology/commit/b6cc4b65112f570316863b665be9699439e25a40)

## Conclusion
Personally, I had more problems with unit tests than impact. The problems are that the two variants of the application
are working totally different, and all methods are dependent from each other, so to test to run successfully I needed to
remade all methods. If I couldn't find out wheather something had broken or not during the work, these unit tests were useless.
Also I can say that I paid more attention to the tests than to the program itself. It more likely was caused by my little
experience of creating unit tests.
However, tests are very useful in commercial projects because every broken part of the application equals lost money.
