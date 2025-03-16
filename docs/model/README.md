# Dimensions of the model

The file [model.json](model.json) defines the model. We will find 4 layers:

- Dense1.kernel [2,16] - 2x16 = 32 values
- Dense1.bias [16] - 16 values
- Dense2.kernel [16,6] - 16x6 = 96 values
- Dense2.bias [6] - 6 values

In total we have 32 + 16 + 96 + 6 = 150 values. They are all stored as `float32` and therefore need 32 bits or 4 bytes. The total model size is therefore 600 bytes. Which is the exact size of the [model.weights.bin](model.weights.bin) file.
