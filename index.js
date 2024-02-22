const input = ["racecar", "rat", "flower","flow", "flight"] 
// const input = ["dog", "racecar", "car"]

function main(input){
    let keepLogest = [];
    let keepCompatitor = {};
    if(input.length > 200){
        throw "Input limit exceed";
    }
    for(let i=0;i<input.length;i++){
        if(input[i].length > 200){
            throw `Input string ${input[i]} limit exceed`
        }
        let _input = input[i].toLowerCase()
        let _inputArr = _input.split("")
        // prepare data
        for(let x=0;x<_inputArr.length;x++){
            if(keepCompatitor.hasOwnProperty(_inputArr[x])){
                if(keepCompatitor[_inputArr[x]].index == x){
                    keepCompatitor[_inputArr[x]].total++;
                }
            }else{
                keepCompatitor[_inputArr[x]] = {
                    index: x,
                    total: 1
                }
            }
        }
    }
    // main logic
    let maxAlpabet = 0;
    for (var key in keepCompatitor) {
        if(keepLogest.length == 0){ // เก็บตัวแรกไว้ก่อน
            keepLogest.push({
                alphabet: key,
                index: keepCompatitor[key].index,
                total: keepCompatitor[key].total
            })
        }else{
            for(let l=0;l<keepLogest.length;l++){
                if(
                    keepLogest[l].index == keepCompatitor[key].index && 
                    keepLogest[l].total < keepCompatitor[key].total){ // ถ้าตัวที่เก็บไว้มีค่าน้อยกว่าตัวแรกที่เอามา
                    keepLogest[l] = {
                        alphabet: key,
                        index: keepCompatitor[key].index,
                        total: keepCompatitor[key].total
                    }
                }else if(keepCompatitor[key].index == keepLogest[keepLogest.length - 1].index + 1){ // ถ้าตัวนี้ยังไม่มีใน array และต้องเป็นตัวถัดมา
                    keepLogest.push({
                        alphabet: key,
                        index: keepCompatitor[key].index,
                        total: keepCompatitor[key].total
                    })
                }
                if(keepLogest[l].index == 0 && keepLogest[l].total > maxAlpabet){ // หาตัวที่มีมากที่สุด
                    maxAlpabet = keepLogest[l].total;
                }
            }
        }
    }
    // clean up result
    let result = []
    let lastIndex = 0;
    for(let l=0;l<keepLogest.length;l++){
        if(keepLogest[l].total >= maxAlpabet &&
            (l == 0 || keepLogest[l].index == lastIndex + 1)
        ){
            result.push(keepLogest[l])
            lastIndex = keepLogest[l].index
        }
    }
    if(maxAlpabet == 1){
        return ""
    }else{
        return result.map(row => row.alphabet).join('');
    }
}

try{
    console.log( "result: " + main(input) )
}catch(err){
    console.log(err)
}
