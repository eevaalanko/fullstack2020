interface calculateBMI {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): calculateBMI => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error("Provided values were not numbers!");
  }
  if (Number(args[2]) <= 0) {
    throw new Error("Give correct height");
  }
  return {
    value1: Number(args[2]),
    value2: Number(args[3]),
  };
};

export const bmiCalculator = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) * (height / 100));
  // console.log("bmi: ", bmi)
  if (bmi <= 16) return "Underweight";
  if (bmi > 16 && bmi < 25) return "Normal (healthy weight)";
  if (bmi >= 25) return "Overweight";
  return "";
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(bmiCalculator(value1, value2));
} catch (e) {
  console.log("Error, something bad happened,: ", e);
}

// bmiCalculator(180, 74);
