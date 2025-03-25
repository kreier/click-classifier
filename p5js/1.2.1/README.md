# New version 1.0 syntax

With the switch to version 1.0 of the [ml5 library](https://github.com/ml5js/ml5-next-gen) in 2024 my old code from 2022 no longer works. After investigating the code, it is actually only two small changes, and the old code would continue to run.

Changes:

- You have to declare the backend used by tensorflow.js for your machine learning. This is done by `ml5.setBackend("webgl");` in the setup() routine.
- The order of results from a classify call is reversed. It was `nn.classify(input, handleResults)` gets now `handleResults(results, error)`. Previous it was `handleResults(error, results)`

Actually, not that much. It was fixed fast and here is my new code:

https://editor.p5js.org/mkreier/sketches/BOY8ynRLh

Have fun!
