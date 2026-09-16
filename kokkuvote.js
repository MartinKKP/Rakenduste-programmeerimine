
// JAVASCRIPTI PRAKTILINE KORDAMISÜLESANNE

 
const users = [
  { id: 1, name: "Mari", age: 22, active: true },
  { id: 2, name: "Jüri", age: 17, active: false },
  { id: 3, name: "Kati", age: 31, active: true },
  { id: 4, name: "Martin", age: 19, active: false },
  { id: 5, name: "Laura", age: 26, active: true }
];
 
 

// 3.1 Kuva kõikide kasutajate nimed

// forEach() käib massiivi läbi ühe elemendi kaupa (ei tagasta uut massiivi),
// ja me lihtsalt trükime iga kasutaja "name" välja.
console.log("--- 3.1 Kõikide kasutajate nimed ---");
users.forEach(user => {
  console.log(user.name);
});
 
 

// 3.2 Leia kõik aktiivsed kasutajad (.filter)

// .filter() käib massiivi läbi ja jätab alles ainult need elemendid,
// mille kohta tingimus (funktsioon sulgudes) tagastab true.
// Siin on tingimuseks "user.active" ehk kasutaja aktiivsuse väärtus.
const activeUsers = users.filter(user => user.active === true);
console.log("--- 3.2 Aktiivsed kasutajad ---");
console.log(activeUsers);
 
 

// 3.3 Leia kõik vähemalt 18-aastased kasutajad (.filter)

// Sama loogika mis eelmises punktis, aga tingimuseks on vanus >= 18.
const adultUsers = users.filter(user => user.age >= 18);
console.log("--- 3.3 Vähemalt 18-aastased kasutajad ---");
console.log(adultUsers);
 
 

// 3.4 Loo uus massiiv ainult nimedega (.map)

// .map() käib massiivi läbi ja loob UUE massiivi, kus iga elemendi
// asemel on funktsiooni poolt tagastatud väärtus.
// Siin võtame igast kasutaja-objektist ainult "name" välja.
const userNames = users.map(user => user.name);
console.log("--- 3.4 Ainult nimede massiiv ---");
console.log(userNames);
 
 

// 3.5 Leia kasutaja, kelle id on 3 (.find)

// .find() käib massiivi läbi ja tagastab ESIMESE elemendi,
// mille kohta tingimus on true. Kui midagi ei leita, tagastab undefined.
const userWithId3 = users.find(user => user.id === 3);
console.log("--- 3.5 Kasutaja, kelle id on 3 ---");
console.log(userWithId3);
 
 

// 3.6 Tavaline funktsioon getUserStatus(user)

// Tavaline funktsioon (function keyword'iga). Kontrollime "if" abil,
// kas kasutaja on aktiivne ja tagastame vastava eestikeelse sõne.
function getUserStatus(user) {
  if (user.active) {
    return "Aktiivne";
  } else {
    return "Mitteaktiivne";
  }
}
console.log("--- 3.6 getUserStatus() test ---");
console.log(getUserStatus(users[0])); 
console.log(getUserStatus(users[1])); 
 
 

// 3.7 Arrow function getGreeting(user)

// Arrow function on lühem viis funktsiooni kirjutamiseks (=>).
// Template literal on string, mis on backtick-märkide (`) vahel ja
// kus saab kasutada ${...} süntaksit, et panna sisse muutujate väärtusi.
const getGreeting = (user) => {
  return `Tere, ${user.name}! Sa oled ${user.age} aastat vana.`;
};
console.log("--- 3.7 getGreeting() test ---");
console.log(getGreeting(users[0]));
 
 

// 3.8 Destructuring - võta name ja age välja

// Destructuring lubab objektist otse muutujatesse "lahti pakkida"
// (users[0] ehk Mari) objektist "name" ja "age".
const { name, age } = users[0];
console.log("--- 3.8 Destructuring ---");
console.log(`Nimi: ${name}, vanus: ${age}`);
 
 

// 3.9 Spread-süntaks - lisa uus kasutaja ilma originaali muutmata

// Spread-operaator (...) "laotab" olemasoleva massiivi elemendid uude
// massiivi laiali. Nii saame luua UUE massiivi, kus on kõik vanad
// kasutajad + üks uus, ning originaalne "users" massiiv jääb puutumata.
const newUser = { id: 6, name: "Karl", age: 24, active: true };
const usersWithNewUser = [...users, newUser];
 
console.log("--- 3.9 Spread: uus massiiv koos Karliga ---");
console.log(usersWithNewUser);
console.log("Originaalne users massiiv (muutumatu):");
console.log(users);
 
 

// 3.10 Optional chaining (?.) ja nullish coalescing (??)

// Lisame ÜHELE kasutajale (Marile) valikulise "address" omaduse.
// Kasutame selleks eraldi muutujat, et originaalset users massiivi
// mõttetult mitte segamini ajada.
const usersWithAddress = users.map(user => {
  if (user.id === 1) {
    // Mari saab address'i
    return { ...user, address: { city: "Tallinn" } };
  }
  return user; // teistel jääb kõik samaks
});
 
console.log("--- 3.10 Optional chaining ja nullish coalescing ---");
usersWithAddress.forEach(user => {
  // user.address?.city -> kui "address" puudub, ei tule viga, vaid tagastatakse undefined
  // ?? "Linn puudub" -> kui vasak pool on undefined/null, kasutatakse "Linn puudub"
  const city = user.address?.city ?? "Linn puudub";
  console.log(`${user.name}: ${city}`);
});
 
 

// 3.11 forEach() - kuva nimi ja staatus

// Käime kasutajad ükshaaval läbi ja kasutame punktis 3.6 loodud
// getUserStatus() funktsiooni, et printida "Nimi – Staatus".
console.log("--- 3.11 forEach: nimi ja staatus ---");
users.forEach(user => {
  console.log(`${user.name} – ${getUserStatus(user)}`);
});
 
 

// 3.12 Sorteeri kasutajad vanuse järgi (noorimast vanimani)

// .sort() muudab massiivi ennast, seega teeme kõigepealt KOOPIA
// spread-süntaksiga ([...users]), et originaal ei muutuks.
// Võrdlusfunktsioon (a, b) => a.age - b.age tähendab:
// kui tulemus on negatiivne, tuleb "a" enne "b"-d (ehk noorem ette).
const sortedByAge = [...users].sort((a, b) => a.age - b.age);
 
console.log("--- 3.12 Sorteeritud vanuse järgi (noorimast vanimani) ---");
sortedByAge.forEach(user => {
  console.log(`${user.name} (${user.age})`);
});
 
console.log("Originaalne users massiiv jäi muutumatuks:");
console.log(users.map(u => `${u.name} (${u.age})`));