import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Accounts.createUserAsync = async options => {
  // Add additional data...
  const extraData = {};
  const user = {
    username: options.username,
    services: { web3: { extraData } },
  };

  return await Accounts._createUserCheckingDuplicates({ user, options });
};

Meteor.users.createIndexAsync('username', { unique: true, sparse: true });

Meteor.methods({
  createUser: async username => {
    const user = await Meteor.users.findOneAsync({ username });
    if (user) throw new Meteor.Error(400, 'User already exists.');

    const userId = await Accounts.createUserAsync({ username });

    const token = Accounts._generateStampedLoginToken();
    Accounts._insertLoginToken(userId, token);
    return { userId, token };
  },
});
