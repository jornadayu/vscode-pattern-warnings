const danger = {
  someThingDangerous(dangerText: string) {
    console.log('danger!', dangerText);
  }
};

danger.someThingDangerous('more danger');

function someFunction(someParam: string) {
  console.log(someParam);

  danger.someThingDangerous('more danger');
}
