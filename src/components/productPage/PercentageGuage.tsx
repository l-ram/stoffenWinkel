import GuageChart from "react-gauge-chart";

interface PercentageGuageProps {
  percentage: number;
}

const PercentageGuage = ({ percentage }: PercentageGuageProps) => {
  const roundedPercentage = Math.floor(percentage);
  const addDecimal =
    roundedPercentage >= 10
      ? `0.${roundedPercentage}`
      : `0.0${roundedPercentage}`;
  const convertedNumber = Number(addDecimal);

  return (
    <GuageChart
      textColor="black"
      cornerRadius={0}
      arcPadding={0.0}
      id="gauge-chart2"
      nrOfLevels={6}
      colors={[
        "#abffb2",
        "#ddffa2",
        "#ffdd98",
        "#ffb374",
        "#ff6565",
        "#ff4545",
      ]}
      percent={convertedNumber ? convertedNumber : 0}
    />
  );
};

export default PercentageGuage;
