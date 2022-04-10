console.log("Connected!");
var country = "Israel";
var continent = "Asia";
var population = 9.217;
console.log("I am from " + country + " that is in " + continent + ", and the population is " + population + " mil");
/* Mark and John are trying to compare their BMI (Body Mass Index), which is
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg
and height in meter).
Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about
whether Mark has a higher BMI than John.
Test data:
§ Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
m tall.
§ Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
m tall. */
var mark = {
    mass: 78,
    height: 1.69,
    bmi: undefined
};
var john = {
    mass: 92,
    height: 1.95,
    bmi: undefined
};
john.bmi = checkBMI(john.mass, john.height);
mark.bmi = checkBMI(mark.mass, mark.height);
var markHigherBMI = CheckWhatBMIIsBigger(mark.bmi, john.bmi);
console.log(markHigherBMI);
function CheckWhatBMIIsBigger(bmi1, bmi2) {
    if (bmi1 > bmi2) {
        return true;
    }
}
function checkBMI(kg, meters) {
    var bmi = Math.floor(kg / Math.pow(meters, 2));
    return bmi;
}
