// 설명을 위한 파일 (실행 x)
function a () {
    console.log('a')
}
function b () {
    console.log('b')
}
a() // a
b() // b


function a() {
    setTimeout(function () {
        console.log('a')
    }, 1000) 
}
function b() {
    setTimeout(function () {
        console.log('b')
    }, 1000) 
}
a()
b()
// b
// a


function a(callback) {
    setTimeout(function () {
        console.log('a')
        callback()
    }, 1000)
}
function b() {
    console.log('b')
}
a(function () {
    b()
})
// a
// b


function a(callback) {
    setTimeout(function () {
        console.log('a')
        callback()
    }, 1000)
}
function b(callback) {
    setTimeout(function () {
        console.log('b')
        callback()
    }, 1000)
}
function c(callback) {
    setTimeout(function () {
        console.log('c')
        callback()
    }, 1000)
}
function d() {
    setTimeout(function () {
        console.log('d')
    }, 1000)
}

a(function () {
    b(function () {
        c(function () {
            d()
        })
    })
})


function a() {
    /*  return new Promise(function (resolve) {
            setTimeout(function () {
                console.log('a')
                resolve()  ->  로직이 마무리 되었을 때 실행됨
            }, 1000)
        })  */
    return new Promise(resolve => {
        setTimeout(function () {
            console.log('a')
            resolve()
        }, 1000)
    })
}
function b() {
    return new Promise(resolve => {
        setTimeout(function () {
            console.log('b')
            resolve()
        }, 1000)
    })
}
function c() {
    return new Promise(resolve => {
        setTimeout(function () {
            console.log('c')
            resolve()
        }, 1000)
    })
}
function d() {
    return new Promise(resolve => {
        setTimeout(function () {
            console.log('d')
            resolve()
        }, 1000)
    })
}
// a가 실행된 다음 b가 실행되는 것을 보장 받을 수 있다.
// a().then(() => {
//     b()
// })
// -----------------------------------------------------------
// a().then(() => {
//     return b()
// }).then(() => {
//     c()
// })
// -----------------------------------------------------------
// arrow function return 생략 가능하다(중괄호도 같이 생략하면 됨)
// a().then(() => b()).then(() => {
//     c()
// })
// -----------------------------------------------------------
a()
    .then(() => b())
    .then(() => c())
    .then(() => d())


// then() 메소드를 붙일려면 결과적으로 함수의 반환 값이 Promise의 instance가 나와야 한다.
// 그리고 resolve()를 통해서 어느 부분에서 실행할지를 보장해준다.

// ES8, 보통 실무에서 async await가 더 많이 쓰이고 안되는 경우 then을 이용한다.
async function asyncFunc() {
    await a()
    await b()
    await c()
    await d()
    console.log('doone')
}


// 비동기 코드에서 Error가 발생 했을 때 실행되는 reject
function a() {
    return new Promise((resolve, reject) => {
        if (isError) {
            reject(Error)
        }
        setTimeout(() => {
            console.log('a')
            resolve('done!')
        }, 1000)
    })
}

a()
  .then((response) => {
      console.log(response)
  })
  .catch((error) => {
    console.log(error)   
    alert(error.message)
  })
  .finally(() => {

  })


  async function asyncFunc() {
      try {
        const res = await a()
        console.log(res)
      } catch (error){
        console.log(error)
        alert(error.message)
      } finally {
          console.log('done!')
      }
  }
  asyncFunc()