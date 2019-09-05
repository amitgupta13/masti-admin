const a = [
  { id: 1, name: "ram", discription: "abc" },
  { id: 1, name: "Sham", discription: "efg" },
  { id: 1, name: "Bheem", discription: "hij" }
];

const search = (search, array) => {
  return array.filter(obj => {
    return obj.name.toLowerCase().indexOf(search) >= 0;
  });
};

console.log(search("ham", a));
