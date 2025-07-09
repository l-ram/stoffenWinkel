// import { Bin, UserCuts } from "../types/types";

// interface IUseOneDPacking {
//   userCuts: UserCuts[];
//   container: number;
// }

// export const UseOneDPacking = (props: IUseOneDPacking) => {
//   const { userCuts, container } = props;

//   //   const [bins, setBins] = useState<number[]>([]);
//   //   const [cuts, setCuts] = useState();

//   const sortedCuts = userCuts.sort((a, b) => b.length - a.length);
//   const bins: Bin[] = [];

//   const amount = sortedCuts.length;
//   let result = 0;
//   const bin_remaining = Array(amount).fill(0);

//   let rest = props.container + 1;

//   for (let i = 0; i < amount; i++) {
//     let placed = false;
//     let j;
//     let minimumSpace = container + 1;
//     let binIndex = 0;

//     for (j = 0; j < result; j++) {
//       if (bins[j].remainingSpace >= sortedCuts[i].length) {
//         bins[j].cuts.push(sortedCuts[i]);
//         bins[j].remainingSpace -= sortedCuts[i].length;
//         placed = true;
//         break;
//       }
//     }

//     if (!placed) {
//       bins.push({
//         cuts: [sortedCuts[i]],
//         remainingSpace: container - sortedCuts[i].length,
//       });
//       result++;
//     }
//   }
//   return bins;
// };
