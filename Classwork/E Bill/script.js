function calculateBill(){
let units = Number(document.getElementById("units").value);
let bill = 0;
if(units <= 100){

bill = units * 10;
}
else{
bill = (100 * 10) + ((units-100) * 15);
}
document.getElementById("result").innerHTML =
`
Units Consumed: ${units}<br>
Total Bill: Rs ${bill}
`;

alert(
"Electricity Bill Generated\n\nUnits: "
+ units +
"\nBill: Rs " 
+ bill
);
}