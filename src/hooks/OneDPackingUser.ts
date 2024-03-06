import { Bin, BinResult, UserCuts } from "../types/types";

export const OneDPackingUser = (userCuts: UserCuts[], container: number) => {
  // We accept weights, and container size

  // const individualCuts = userCuts.flatMap((cut) =>
  //   Array.from({ length: cut.count }, () => ({ ...cut }))
  // );

  const sortedCuts = userCuts.sort((a, b) => b.length - a.length);
  const binResult: BinResult = {};

  for (let i = 0; i < sortedCuts.length; i++) {
    const cut = sortedCuts[i];
    const totalIndividualCuts = cut.count;

    for (let j = 0; j < totalIndividualCuts; j++) {
      let placed = false;

      for (const binId in binResult) {
        const remainingSpace = binResult[binId].remainingSpace;
        if (remainingSpace >= cut.length) {
          binResult[binId].cutIds.push(cut.id);
          binResult[binId].remainingSpace -= cut.length;
          placed = true;
          break;
        }
      }

      if (!placed) {
        const remainingSpace = container - cut.length;
        const newBinId = Object.keys(binResult).length + 1;

        binResult[newBinId] = {
          cutIds: [cut.id],
          remainingSpace,
        };
      }
    }
  }
  return binResult;
};
