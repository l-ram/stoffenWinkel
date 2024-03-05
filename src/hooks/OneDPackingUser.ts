import { Bin, UserCuts } from "../types/types";

export const OneDPackingUser = (userCuts: UserCuts[], container: number) => {
  // We accept weights, and container size

  const individualCuts = userCuts.flatMap((cut) =>
    Array.from({ length: cut.count }, () => ({ ...cut }))
  );

  const sortedCuts = userCuts.sort((a, b) => b.length - a.length);
  const bins: Bin[] = [];
  const cutIds: number[] = [];

  console.log("all user cuts sorted:", sortedCuts);

  for (let i = 0; i < sortedCuts.length; i++) {
    const cut = sortedCuts[i];
    const totalIndividualCuts = cut.count;

    for (let j = 0; j < totalIndividualCuts; j++) {
      let placed = false;

      for (let k = 0; k < bins.length; k++) {
        const remainingSpace = bins[k].remainingSpace;
        if (remainingSpace >= cut.length) {
          bins[k].remainingSpace -= cut.length;

          cutIds.push(bins[k].id);
          placed = true;
          break;
        }
      }

      if (!placed) {
        const remainingSpace = container - cut.length;

        if (remainingSpace >= 0) {
          const newBin: Bin = {
            id: bins.length + 1,
            remainingSpace,
          };

          bins.push(newBin);
          cutIds.push(newBin.id);
        }
      }
    }
  }
  return { bins, cutIds };
};
