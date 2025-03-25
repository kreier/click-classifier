# Neuronal Network in your Browser with p5js

This project was started in 2022, based on [the video](https://www.youtube.com/watch?v=8HEgeAbYphA) from The Coding Train by Daniel Shiffman in November 2019.

As he states in his video, his work himself is based on


## Dimensions of the model

The file [model.json](model.json) defines the model. We will find 4 layers:

- Dense1.kernel [2,16] - 2x16 = 32 values
- Dense1.bias [16] - 16 values
- Dense2.kernel [16,6] - 16x6 = 96 values
- Dense2.bias [6] - 6 values

In total we have 32 + 16 + 96 + 6 = 150 values. They are all stored as `float32` and therefore need 32 bits or 4 bytes. The total model size is therefore 600 bytes. Which is the exact size of the [model.weights.bin](model.weights.bin) file.

## Version 0.12.2

When creating the version for the AA course at SSIS the latest version for the ml5js library was the one referred in the index.html. In the following years 

## Version 1.0 from ml5js

With webGL and webGPU many more asyncronus options are introduced and switched to default for better performance. Therefore the original code from 2022 no longer works. Here is the updated version.


