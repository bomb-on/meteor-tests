import { Meteor } from 'meteor/meteor';
import { TestCollection } from './collection';


export const collectionSize = 5000;

if (Meteor.isServer) {
  Meteor.startup(async () => {
    if ((await TestCollection.find().countAsync()) !== collectionSize) {
      // Remove all documents
      await TestCollection.removeAsync({});
      // Insert dummy data
      for (let i = 0; i < collectionSize; i++) {
        await TestCollection.insertAsync({ name: `DOC ####${i}`, created: new Date(), updated: new Date() });
      }
    }
  });

  // Publish the collection
  Meteor.publish('testCollectionData', async () => await TestCollection.find({}));
}
