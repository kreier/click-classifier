# click-classifier

With this example in neuronal networks you can

- create your own training data
- train the model over a period of epochs, and improve accuracy with continued training
- run interference on the trained model

And all this in your browser. Try it out for yourself! Just follow [this link](https://editor.p5js.org/mkreier/sketches/IrqaPR3nC) 

![example image](docs/click-classifier.png)

## How to use

  - Click on the red play button on the top left corner to start the p5js Javascript program. Next to the program a white canvas with 400x400 pixel will appear.
- Create your own **training data**:
  - Click anywhere in this 400x400px canvas to set the location for the note C.
  - Press the key D to switch to the note D, then click on other areas in the canvas. Continue with note E, F and G to your liking.
- **Train** your Model 
  - Press the 't' key to start training your model. A new graph with the Training Performance should appear
  - Press 'c' if you want to continue training, and improve oyur loss value to below 0.1
- Run **Interference** on your trained model
  - Click anywhere in the Canvas and see the predicted value at this region
  - Press the key 'r' to test a random location

Create a small neuronal network, create training data, train the model, and run interference on it - all interactively in a webbrowser.
