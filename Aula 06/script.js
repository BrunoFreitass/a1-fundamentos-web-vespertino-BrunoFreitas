const notaFinal = 7.5;
const frequencia = 80;

if (notaFinal >= 7.0 && frequencia >= 75) {
    console.log("Aprovado!");
} else if (notaFinal >= 5.0 && notaFinal < 6.9) {
    console.log("Elegível para Nivelamento");
} else {
    console.log("Reprovado");
}
