class FormData{
  constructor(x0 = 0, x1 = 0, Ea = 0){
    this.x0 = parseFloat(x0);
    this.x1 = parseFloat(x1);
    this.Ea = parseFloat(Ea);
  }
}

module.exports = FormData;