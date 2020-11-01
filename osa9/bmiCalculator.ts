const bmiCalculator = (height: number, weight: number):string => {
    if(height<=0)
        return "Give correct height"
    const bmi = weight/((height/100) * (height/100))
   // console.log("bmi: ", bmi)
    if(bmi <= 16)
    return "Underweight"
    if( bmi > 16 && bmi < 25)
        return "Normal (healthy weight)"
    if(bmi >= 25)
        return "Overweight"
}


console.log(bmiCalculator(180, 74));