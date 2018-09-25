export default function toFixed2(number, length) {
    var b = number.toFixed(length + 1);
    var result = b.substring(0, b.length - 1)
    return result;

}