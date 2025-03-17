import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.linkWithTwitch = function(options, callback) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402, 'Please login to an existing account before link.');
  }
  if (!Package['marblear:accounts-twitch']) {
    throw new Meteor.Error(403, 'Please include marblear:accounts-twitch packages');
  }

  if (!callback && typeof options === 'function') {
    callback = options;
    options = null;
  }

  const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
  Package['marblear:accounts-twitch'].TwitchAccounts.requestCredential(
    options,
    credentialRequestCompleteCallback
  );
};
