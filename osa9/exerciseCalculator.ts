interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const originalTargetValue = 2;

const calculateRating = (average: number): number => {
  if (average >= originalTargetValue) return 3;
  if (originalTargetValue - average < 1) return 2;
  return 1;
};

const getRatingDescription = (rating: number): string => {
  switch (rating) {
    case 1:
      return "you lazy #€%&";
    case 2:
      return "not too bad but could be better";
    case 3:
      return "Excellent";
    default:
      throw new Error("rating out of range");
  }
};

const parse = (args: Array<string>): Array<number> => {
  args.shift()
  args.shift()
  if (args.length < 1) throw new Error("Not enough arguments");
  if (args.find((a) => isNaN(Number(a)))) {
    throw new Error("Provided values were not numbers!");
  }
  return args.map((a) => Number(a));
};

const calculateExercises = (dailyValues: Array<number>): ExerciseResults => {
  console.log("whee");
  const trainingDays = dailyValues.filter((v) => v !== 0);
  const success = dailyValues.every((v) => v >= originalTargetValue);
  const average = dailyValues.reduce((p, c) => p + c, 0) / dailyValues.length;
  const rating = calculateRating(average);

  return {
    periodLength: dailyValues.length,
    trainingDays: trainingDays.length,
    success,
    rating,
    ratingDescription: getRatingDescription(rating),
    target: originalTargetValue,
    average,
  };
};

try {
  const values = parse(process.argv);
  console.log(calculateExercises(values));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

// const dailyValues = [3, 0, 2, 4.5, 0, 3, 1];
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));
