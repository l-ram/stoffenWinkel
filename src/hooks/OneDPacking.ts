export const OneDPacking = (weights: number[], container: number) => {
  // We accept weights, and container size

  const sortedWeights = weights.sort((a, b) => b - a);
  const amount = sortedWeights.length;

  console.log(sortedWeights, amount);

  // We sort the weight size decreasing and get the amount of weights

  // The amount of bins and an array that has an entry for each weight, starting with 0
  let result = 0;
  const bin_remaining = Array(amount).fill(0);

  // The main loop, looks through the weights
  for (let i = 0; i < amount; i++) {
    // J is our variable to track the bins
    // Miniumum space tells us how much space is in each bin
    // binIndex tells us where there is a bin with enough for our weight
    let j;
    let minimumSpace = container + 1;
    let binIndex = 0;

    // Sub-loop to look through existing bins
    for (j = 0; j < result; j++) {
      // Loop lasts as long as there is results (amount of bins)
      // At first there are no bins (j is 0, results is 0), so nothing will happen with this loop at first
      if (
        // The first time there is a bin will look at the value and it will be at first posiiton: 0 ( so j = 0m result is 1)
        bin_remaining[j] >= sortedWeights[i] &&
        // If the remaining space is bigger than or equal to the current weight
        bin_remaining[j] - sortedWeights[i] < minimumSpace
        // AND the space left after the adding weight is still less than container
      ) {
        binIndex = j;
        // Binindex gets updated to the index of the current bin that has the space to fit the weight
        minimumSpace = bin_remaining[j] - sortedWeights[i];
      }
    }

    if (minimumSpace === container + 1) {
      // No existing bins, then at the index of [result] in bin_remaining array, assign the weight
      bin_remaining[result] = container - sortedWeights[i];
      // Now we've used a bin, add to result
      result++;
    } else {
      // There is an existing bin at binIndex which we got from the J loop, that has enough space, so assign the weight to it. Here is where the weight is placed in the optimal bin if there are any bins.
      bin_remaining[binIndex] -= sortedWeights[i];
    }
  }
  console.log(result);
  return result;
};
