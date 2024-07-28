import { Meteor } from 'meteor/meteor';
import { TestCollection } from './collection';


Meteor.startup(async () => {
  if ((await TestCollection.find().countAsync()) === 0) {
    for (let i = 0; i < 10000; i++) {
      await TestCollection.insertAsync({ name: `DOC ####${i}`, created: new Date(), updated: new Date() });
    }
  }
});
