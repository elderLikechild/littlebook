function fontmap(num){
  let number = parseInt(num)
  if(Math.floor(number/10000) >= 1){
    let floatnum = Math.ceil(number/1000);
    return floatnum/10 + "万";
  }else{
    return number
  }
}

export default fontmap