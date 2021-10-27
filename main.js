const str = `
  010-1234-5678
  haze@gma.com
  https://www.omdbapi.com/?apikey=abababab&s=frozen
  The quick brown fox jumps over the lazy dog.
  abbcccdddd
  http://localhost:1234
  동해물과 백두산이 마르고 닳도록
`

// 생성자 방식

const regexp1 = new RegExp('the', 'gi') // g = 플래그, i = 대소문자 구분X
console.log(str.match(regexp1))
// (2) ['The', 'the']
// 0: "The"
// 1: "the"
// length: 2

// 리터럴 방식

const regexp2 = /the/gi
console.log(str.match(regexp2))
// (2) ['The', 'the']
// 0: "The"
// 1: "the"
// length: 2


// methods

// test
const regexp3 = /fox/gi
console.log(regexp3.test(str)) // true

// replace
const regexp4 = /fox/gi
console.log(str.replace(regexp4, 'AAA')) // The quick brown AAA jumps over the lazy dog.
console.log(str) // The quick brown fox jumps over the lazy dog.
// 원본을 손상하지 않는다.
// str을 let으로 선언을 한 후 str = str.replace(regexp, 'AAA') 를 이용하면 원본을 수정할 수 있다.


// 플래그

console.log(str.match(/the/gi)) // (2) ['The', 'the']
console.log(str.match(/\./gi)) // (4) ['.', '.', '.', '.']
// 이스케이프 문자(Escape Character)란 \(백슬래시) 기호를 통해 본래의 기능에서 벗어나 상태가 바뀌는 문자를 뜻한다. 일반적인 문자로 해석함.
console.log(str.match(/\.$/gim)) // ['.']
// $ 는 앞에 있는 하나의 단어로 해당하는 줄이 끝나는 부분을 찾아서 일치시킴
// m 은 줄바꿈이 되어져 있는 각각의 줄들을 다 해석하는 것


// 패턴

// ^
console.log(
  str.match(/d$/g) // null
) // `의 바로 앞부분에 d가 없기 때문에 null 값이 나옴.

console.log(
  str.match(/d$/gm) // ['d']
) // m 플래그를 통해 매 줄마다 검색하여서 결과값으로 ['d']가 나옴

// $
console.log(
  str.match(/^t/gm) // null
) // 소문자 t로 시작하는 문장이 없기 때문에 null이 나옴
console.log(
  str.match(/^t/gim) // (2) ['The', 'the']
) // i 플래그를 이용하여 대문자 T도 찾아냄

// .
console.log(
  str.match(/h..p/g) // ['http']
) 

// a|b
console.log(
  str.match(/fox|dog/g) // (2) ['fox', 'dog']
)

// ab?
console.log(
  str.match(/https?/g) // (2) ['https', 'http']
)

// {n}
console.log(
  str.match(/d{2}/)
)
// ['dd', index: 139, input: '\n  010-1234-5678\n  haze@gma.com\n  https://www.omdb…e lazy dog.\n  abbcccdddd\n  http://localhost:1234\n', groups: undefined]

console.log(
  str.match(/d{2}/g) // (2) ['dd', 'dd']
)

console.log(
  str.match(/d{2,}/g) // ['dddd']
)

console.log(
  str.match(/d{2,3}/g) // ['ddd']
)

console.log(
  str.match(/\w{2,3}/g) // \w : 숫자, 알파벳을 포함하는 것을 의미
) 
// (39) ['010', '123', '567', 'haz', 'gma', 'com', 'htt', 'ps', 'www', 'omd', 'bap', 'com', 'api', 'key', 'aba', 'bab', 'ab', 'fro', 'zen', 'The', 'qui', 'ck', 'bro', 'wn', 'fox', 'jum', 'ps', 'ove', 'the', 'laz', 'dog', 'abb', 'ccc', 'ddd', 'htt', 'loc', 'alh', 'ost', '123']

console.log(
  str.match(/\b\w{2,3}\b/g) // \b로 경계가 만들어져서 내용을 찾음
)
// (9) ['010', 'gma', 'com', 'www', 'com', 'The', 'fox', 'the', 'dog']

// [abc]
console.log(
  str.match(/[fox]/g)
)
// (13) ['o', 'o', 'o', 'f', 'o', 'o', 'f', 'o', 'x', 'o', 'o', 'o', 'o']

// [x-y]
console.log(
  str.match(/[0-9]/g)
)
// (15) ['0', '1', '0', '1', '2', '3', '4', '5', '6', '7', '8', '1', '2', '3', '4']

// [x-y]
console.log(
  str.match(/[0-9]{1,}/g)
)
// (4) ['010', '1234', '5678', '1234']

// [한글]
console.log(
  str.match(/[가-힣]{1,}/g)
)
// (4) ['동해물과', '백두산이', '마르고', '닳도록']

// \b, \w, {n,}
console.log(
  str.match(/\bf\w{1,}\b/g) // 소문자 f로 시작하는 모든 영단어 검색
)
// (2) ['frozen', 'fox']

// \b, \w, {n,}
console.log(
  str.match(/\d{1,}/g) // 숫자 덩어리 검색
) // (4) ['010', '1234', '5678', '1234']

// \s 활용
const h = `  the hello  world    !

`
console.log(
  h.replace(/\s/g,'') // 모든 공백문자 삭제
) // thehelloworld!

// (?=)
console.log(
  str.match(/.{1,}(?=@)/g) // 1개 이상 @ 앞쪽 일치
) // ['  haze']

// (?<=)
console.log(
  str.match(/(?<=@).{1,}/g) // 1개 이상 @ 뒤쪽 일치
) // ['gma.com']