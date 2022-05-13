function calcular(xL, xU, Ea) {
  let iteraciones = bucle(xL, xU, Ea);
  return iteraciones;
}



function bucle(xL, xU, Ea) {
  let iteraciones = [];
  let i = 0;
  const datosIniciales = {
    xL: xL,
    xU: xU,
    fxL: calcFx(xL),
    fxU: calcFx(xU)
  }

  let xR = biseccion(datosIniciales.xL, datosIniciales.xU);
  let fxR = calcFx(xR)
  let dataRes = {
    xR: xR,
    fxR: fxR,
    ...datosIniciales
  }

  iteraciones.push(dataRes);

  let orden = calcOrden(dataRes);
  let err = 0;
  do {
    i++;
    try {
      var { xL, fxL } = orden[0]
      var { xU, fxU } = orden[1]
    } catch (error) {
      return { error: "La función no se encuentra en ese intervalo"}
    }
    xR = biseccion(xL, xU);
    fxR = calcFx(xR);
    err = calcErr(xR, iteraciones[i - 1].xR);
    dataRes = {
      xR: xR,
      fxR: fxR,
      xL: xL,
      fxL: fxL,
      xU: xU,
      fxU: fxU,
      error: err
    }

    orden = calcOrden(dataRes);
    iteraciones.push(dataRes);
  } while (dataRes.error > Ea);
  return iteraciones;
}

function biseccion(x0, x1) {
  return ((x0 + x1) / 2);
}

function calcFx(x) {
  return (Math.pow(x, 3) - x - 1);
}

function calcErr(xNew, xOld) {
  let res = ((xNew - xOld) / (xNew)) * 100
  if (res < 0) {
    return res * -1
  }
  return res
}

function calcOrden(data) {
  let { xL, fxL, xR, fxR, xU, fxU } = data;
  if (fxR < 0) {
    if (fxU > 0) {
      return [
        {
          xL: xR,
          fxL: fxR
        },
        {
          xU: xU,
          fxU: fxU
        }
      ]
    }
    if (fxL > 0) {
      return [
        {
          xL: xR,
          fxL: fxR
        },
        {
          xU: xL,
          fxU: fxL
        }
      ]
    }
  } else {
    if (fxU < 0) {
      return [
        {
          xL: xU,
          fxL: fxU
        },
        {
          xU: xR,
          fxU: fxR
        }
      ]
    }
    if (fxL < 0) {
      return [
        {
          xL: xL,
          fxL: fxL
        },
        {
          xU: xR,
          fxU: fxR
        }
      ]
    }
  }
}

module.exports = { calcular }