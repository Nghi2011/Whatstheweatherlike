//Bài tập 1:Tạo hàm trả về số lượng giá trị "true" có trong một mảng
const firstArray =[true,false,false,true,false]
const secondArray = [false,false,false,false]
const emptyArray =[]
const countingTrueValueInArray =(array) => {
    let trueValueCountTimes= array.filter(value => value === true).length
    return trueValueCountTimes
}
console.log(`Số lượng giá trị true có trong array ${firstArray} là: ${countingTrueValueInArray(firstArray)}`)
console.log(`Số lượng giá trị true có trong array ${secondArray} là: ${countingTrueValueInArray(secondArray)}`)
console.log(`Số lượng giá trị true có trong array ${emptyArray}  là: ${countingTrueValueInArray(emptyArray)}`)