# Neuronal Network in your Browser with p5js

This project was started in 2022, based on [the video](https://www.youtube.com/watch?v=8HEgeAbYphA) from The Coding Train by Daniel Shiffman in November 2019. It is on the [Tracks](https://thecodingtrain.com/tracks) > [A Beginner's Guide to Machine Learning in JavaScript with ml5.js](https://thecodingtrain.com/tracks/ml5js-beginners-guide) >
[Train Your Own Neural Network](https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/6-train-your-own-neural-network/1-train-the-model
).

The [Beginners Guide](https://www.youtube.com/watch?v=26uABexmOX4) is actually from March 2022, rather recently. This click-classifier "Train Your Own Neural Network" is the 5th segment in this series with 6 episodes.

As he states in his video, his work himself is based on the work of [Rebecca Fiebrink](https://researchers.arts.ac.uk/1594-rebecca-fiebrink/) and her [Wekinator project](http://www.wekinator.org/), that started in 2009. See her [presentation at Eyeo 2018](https://vimeo.com/287094397) on vimeo.


## Dimensions of the model

The file [model.json](model.json) defines the model. We will find 4 parameter files:

- Dense1.kernel [2,16] - 2x16 = 32 values
- Dense1.bias [16] - 16 values
- Dense2.kernel [16,6] - 16x6 = 96 values
- Dense2.bias [6] - 6 values

In total we have 32 + 16 + 96 + 6 = 150 values. They are all stored as `float32` and therefore need 32 bits or 4 bytes. The total model size is therefore 600 bytes. Which is the exact size of the [model.weights.bin](model.weights.bin) file.

It is actually a **feed-forward multi-layer perceptron** (see [7:14 in his video](https://youtu.be/8HEgeAbYphA?si=s1Ab45R8Duv_2Gx5&t=434)) with one hidden layer with 16 "neurons". Each of these 16 neurons is connected to the two input "neurons", the x and y value. Then these 16 neurons are connected to the 6 possible output values 'C', 'D', 'E', 'F', 'G' and 'A'. Maybe there is a way to visualize this for some examples.

The values in the Dense1.kernel give me the location of 16 points 2-dimensional, abstracted to a float32 values. It is like a location for these 16 neurons in the hidden layer. It also gives me 6 probabilities for the 6 possible outputs linked to each of the 16 neurons.

## Version 0.5.4

This is the version Daniel is using in his video from 2019. 

## Version 0.12.2

When creating the version for the AA course at SSIS the latest version for the ml5js library was the one referred in the index.html. In the following years 

## Version 1.0 from ml5js

With webGL and webGPU many more asyncronus options are introduced and switched to default for better performance. Therefore the original code from 2022 no longer works. Here is the updated version.


