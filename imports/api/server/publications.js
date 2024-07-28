import { Meteor } from 'meteor/meteor';
import { TestCollection } from '../collection';

Meteor.publish('testCollectionData', async () => await TestCollection.find({}));
