import { Tracker } from 'meteor/tracker';
import { TestCollection } from '../imports/api/collection';
import { collectionSize } from '../imports/api/main';

// HTML elements
const loading = document.getElementById('loading');
const docs = document.getElementById('docs');
const main = document.getElementById('main');
const input = document.getElementById('input');
const submit = document.getElementById('submit');
const userContainer = document.getElementById('userid-container');
const usernameContainer = document.getElementById('username-container');
const userId = document.getElementById('user-id');
const username = document.getElementById('user-name');
const loggingIn = document.getElementById('logging-in');
const error = document.getElementById('error');

// Vars
const inputValue = new ReactiveVar(null);
const user = new ReactiveVar(null);

// Subscribe to collection
Meteor.subscribe('testCollectionData');

// Run Trackers
Tracker.autorun(() => {
  const data = TestCollection.find({}).fetch();

  // Handle HTML elements
  docs.textContent = data.length;
  if (data.length === collectionSize) {
    loading.hidden = true;
    main.classList.remove('hidden');
  }
});

Tracker.autorun(() => {
  user.set(Meteor.user());

  if (user.get()) {
    console.log(`${user.get()._id} Logged in.`);

    // Handle HTML elements
    loggingIn.classList.add('hidden');
    usernameContainer.classList.remove('hidden');
    username.textContent = user.get().username.curValue;
    submit.disabled = false;
    submit.textContent = 'Create user';
  }
});

// Handle input and submit
input.addEventListener('keyup', e => {
  submit.disabled = e.target.value.length === 0;
  inputValue.set(e.target.value);
});

submit.addEventListener('click', async () => {
  // Log out current user
  if (user.get()) {
    console.log(`${user.get()._id} Logging out...`);
    await Meteor.logout();
  }

  // Handle HTML elements
  userContainer.classList.add('hidden');
  usernameContainer.classList.add('hidden');
  loggingIn.classList.remove('hidden');
  error.classList.add('hidden');
  userId.textContent = '';
  username.textContent = '';
  submit.disabled = true;
  submit.textContent = 'Please wait...';

  try {
    // Call Meteor method
    const response = await Meteor.callAsync('createUser', inputValue.get());

    // Handle response
    if (response.userId) {
      // Handle HTML elements
      userContainer.classList.remove('hidden');
      userId.textContent = response.userId;

      // Login user with the token
      console.log(`${response.userId} Logging in...`);
      Meteor.loginWithToken(response.token.token);
    }
  } catch (e) {
    // Handle HTML elements
    error.classList.remove('hidden');
    submit.disabled = false;
    submit.textContent = 'Create user';
    error.textContent = e.reason;
  }
});
