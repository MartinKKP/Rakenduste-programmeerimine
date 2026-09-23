// ==========================================================
// 4. STRINGID JA TEMPLATE LITERAL'ID
// Example: cleaning up a name and building a greeting.
// ==========================================================
// Kasutaja sisestab nime "räpaselt" - suurte/väikeste tähtede segadus

const rawName = '   jOHN doE   ';

// .trim() eemaldab tühikud algusest/lõpust.
// .toLowerCase() teeb kõik tähed väikseks.
const cleanedName = rawName.trim().toLowerCase();

// Template literal (backtick `` ` `` + ${...}) lisab muutuja stringi sisse.
const greeting = `Tere, ${cleanedName}! Tore, et liitusid.`;

console.log("--- 4. Stringid ja template literal'id ---");
console.log(`Algne nimi: "${rawName}"`);
console.log(`Puhastatud nimi: "${cleanedName}"`);
console.log(greeting);

// ==========================================================
// 5. VÕRDLUSED, LOOGIKAOPERAATORID JA OTSUSED
// Example: checking a user's age and login status to choose a message.
// ==========================================================
// Funktsioon otsustab, mis teadet kasutajale näidata, sõltuvalt sellest,
// kas ta on sisse loginud ja kas ta on täisealine.

function getUserMessage(age, isLoggedIn) {
  // && tähendab "JA" - mõlemad tingimused peavad olema tõesed
  if (isLoggedIn && age >= 18) {
    return 'Tere tulemast! Sul on ligipääs kogu sisule.';
  }

  // ! tähendab "EI" (eitus) - pöörab true/false vastupidiseks
  if (!isLoggedIn) {
    return 'Palun logi sisse, et jätkata.';
  }

  // Kui jõuame siia, siis kasutaja on sisse loginud, aga on alaealine
  return 'Vabandust, see sisu on mõeldud ainult täiskasvanutele.';
}

console.log('--- 5. Võrdlused ja otsused ---');
console.log(getUserMessage(22, true)); // Tere tulemast!...
console.log(getUserMessage(16, true)); // Vabandust...
console.log(getUserMessage(30, false)); // Palun logi sisse...

// Sama asi lühemalt, tingimusliku (ternary) operaatoriga:
// condition ? kui-tõene : kui-väär
const age = 20;
const statusText = age >= 18 ? 'täisealine' : 'alaealine';
console.log(`20-aastane kasutaja on ${statusText}.`);

// ==========================================================
// 6. NUMBRID JA MATH OBJEKT
// Example: generating a random whole number from 1 to 6.
// ==========================================================
// Math.random() annab murdarvu vahemikus 0 (kaasa arvatud) kuni 1 (välja arvatud).
// Korrutades 6-ga saame vahemiku 0 kuni 5.999...
// Math.floor() ümardab alati alla lähima täisarvuni -> 0 kuni 5.
// Liites 1 saame lõpuks täringu tulemuse: 1 kuni 6.

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

console.log('--- 6. Numbrid ja Math objekt ---');
console.log('Täringuvise tulemus:', rollDice());
console.log('Veel üks vise:', rollDice());

// ==========================================================
// 7. MASSIIVID JA TSÜKLID
// Example: creating a list of names, updating it, and printing each name.
// ==========================================================
// Loome nimede massiivi, lisame sinna ühe nime, eemaldame ühe nime
// ja siis trükime iga järelejäänud nime tsükli abil välja.

const names = ['Mari', 'Jüri', 'Kati'];

// .push() lisab elemendi massiivi LÕPPU (muudab originaalmassiivi)
names.push('Laura');

// .pop() eemaldab massiivi VIIMASE elemendi (muudab originaalmassiivi)
names.pop(); // eemaldab "Laura" tagasi

// Lisame siiski ühe uue nime, et näidata muutust
names.push('Karl');

console.log('--- 7. Massiivid ja tsüklid ---');
console.log('Nimede massiiv pärast muutmist:', names);

// Tavaline for-tsükkel: kasutab loendurit (i), tingimust ja sammu
console.log('Väljastus for-tsükliga:');
for (let i = 0; i < names.length; i++) {
  console.log(`${i + 1}. ${names[i]}`);
}

// for...of tsükkel - lihtsam viis, kui indeksit endale vaja ei lähe
console.log('Väljastus for...of tsükliga:');
for (const name of names) {
  console.log(name);
}

// ==========================================================
// 8. OBJEKTID JA PUUDUVATE ANDMETE KÄSITLEMINE
// Example: displaying a user profile with missing information.
// ==========================================================
// Kasutaja objektil ei pruugi kõik andmed olemas olla (nt telefoninumber
// või aadress puudub). Kuvame profiili nii, et puuduvate andmete korral
// ei tuleks viga, vaid näidatakse mõistlik vaikeväärtus.

const userProfile = {
  name: 'Mari',
  email: 'mari@example.com',
  // telefon puudub täielikult
  address: {
    city: 'Tallinn',
    // tänav (street) puudub
  },
};

console.log('--- 8. Objektid ja puuduvad andmed ---');

// ?. (optional chaining) - kui "address" või "street" puudub,
// ei teki viga, tagastatakse lihtsalt undefined.
// ?? (nullish coalescing) - kui vasak pool on undefined/null,
// kasutatakse parempoolset vaikeväärtust.
const city = userProfile.address?.city ?? 'Linn teadmata';
const street = userProfile.address?.street ?? 'Tänav teadmata';
const phone = userProfile.phone ?? 'Telefon puudub';

console.log(`Nimi: ${userProfile.name}`);
console.log(`E-post: ${userProfile.email}`);
console.log(`Linn: ${city}`);
console.log(`Tänav: ${street}`);
console.log(`Telefon: ${phone}`);

// ==========================================================
// 10. ARROW FUNKTSIOONID JA CALLBACKID
// Example: using a callback with .forEach().
// ==========================================================
// Callback on funktsioon, mida antakse teisele funktsioonile argumendina
// ja mida see teine funktsioon ise "õigel ajal" välja kutsub.
// Siin anname .forEach()-ile arrow function'i, mis käivitatakse
// iga massiivi elemendi kohta.

const fruits = ['õun', 'banaan', 'pirn'];

console.log('--- 10. Arrow funktsioonid ja callbackid ---');

// (fruit, index) => {...} on callback - .forEach() kutsub selle
// ise välja iga elemendi ja tema indeksi jaoks.
fruits.forEach((fruit, index) => {
  console.log(`${index + 1}. ${fruit}`);
});

// ==========================================================
// 11. MASSIIVIMEETODID: map, filter, find
// Example: transforming and searching a list of products.
// ==========================================================
const products = [
  { id: 1, name: 'Sülearvuti', price: 899, inStock: true },
  { id: 2, name: 'Hiir', price: 15, inStock: true },
  { id: 3, name: 'Klaviatuur', price: 45, inStock: false },
  { id: 4, name: 'Monitor', price: 250, inStock: true },
];

console.log('--- 11. map, filter, find ---');

// .map() - teisendame tooted lihtsaks tekstiks "nimi - hind €"
const productLabels = products.map(
  (product) => `${product.name} - ${product.price}€`,
);
console.log('Toodete sildid (map):', productLabels);

// .filter() - jätame alles ainult laos olevad tooted
const inStockProducts = products.filter((product) => product.inStock);
console.log('Laos olevad tooted (filter):', inStockProducts);

// .find() - otsime esimese toote, mille hind on üle 100€
const expensiveProduct = products.find((product) => product.price > 100);
console.log('Esimene toode üle 100€ (find):', expensiveProduct);

// .find() näide, kus midagi ei leita - tagastab undefined
const nonExistentProduct = products.find(
  (product) => product.name === 'Telefon',
);
console.log('Otsing, mida ei leita (find):', nonExistentProduct); // undefined

// ==========================================================
// 14. ASÜNKROONNE JAVASCRIPT: Promises ja async/await
// Example: awaiting a provided promise and using its result.
// ==========================================================
// Promise (lubadus) esindab tulemust, mis on saadaval alles HILJEM.
// Sellel on 3 olekut: pending (ootel), fulfilled (täidetud), rejected (tagasi lükatud).

// Loome oma lihtsa "antud" promise'i, mis simuleerib nt andmete
// laadimist serverist 1 sekundi pärast.
function fetchUserFromServer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true; // saame simuleerida ka viga, kui panna false

      if (success) {
        resolve({ id: 1, name: 'Mari' }); // promise "täidetud"
      } else {
        reject(new Error('Serveriga ei õnnestunud ühendust saada')); // promise "tagasi lükatud"
      }
    }, 1000); // 1000 ms = 1 sekund
  });
}

// async funktsioon lubab kasutada "await" - see OOTAB, kuni promise
// on täidetud, ja alles siis jätkab järgmise reaga.
// async funktsioon tagastab ALATI promise'i, isegi kui sees on "return" tavaväärtus.
async function showUser() {
  console.log('--- 14. Promises ja async/await ---');
  console.log('Alustan kasutaja laadimist...');

  try {
    // await "peatab" funktsiooni siin, kuni promise on valmis
    const user = await fetchUserFromServer();
    console.log('Kasutaja laaditud:', user);
  } catch (error) {
    // kui promise "reject'itakse", püüab catch selle vea kinni
    console.log('Viga kasutaja laadimisel:', error.message);
  }
}

// Kutsume async funktsiooni välja
showUser();
