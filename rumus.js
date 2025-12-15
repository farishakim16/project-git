export function kalkulator(angka1, angka2, operator) {
    switch (operator) {
        case "+":
            return angka1 + angka2;
        case "-":
            return angka1 - angka2;
        case "*":
            return angka1 * angka2;
        case "/":
            return angka2 != 0 ? angka1 / angka2 : "Error: Pembagian dengan 0!";
        default:
            return "Operator tidak valid!";
    }
}
