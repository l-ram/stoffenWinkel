import { Bin, UserCuts } from "../types/types";

export const OneDPackingUser = (userCuts: UserCuts[], container: number) => {
  // We accept weights, and container size

  const individualCuts = userCuts.flatMap((cut) =>
    Array.from({ length: cut.count }, () => ({ ...cut }))
  );

  const sortedCuts = userCuts.sort((a, b) => b.length - a.length);
  const bins: Bin[] = [];
  const cutIds: number[] = [];

  for (let i = 0; i < sortedCuts.length; i++) {
    let placed = false;

    for (let j = 0; j < sortedCuts[i].count; j++) {
      let placed = false;

      for (let k = 0; k < bins.length; k++) {
        const remainingSpace = bins[k].remainingSpace;
        if (remainingSpace >= sortedCuts[i].length) {
          bins[k].remainingSpace -= sortedCuts[i].length;

          cutIds.push(bins[k].id);
          placed = true;
          break;
        }
      }

      if (!placed) {
        const remainingSpace = container - sortedCuts[i].length;

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
