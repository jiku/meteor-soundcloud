Template.configureLoginServiceDialogForSoundCloud.helpers({
  siteUrl: function () {
    // SoundCloud doesn't recognize localhost as a domain name
    return Meteor.absoluteUrl({ replaceLocalhost: true });
  }
});

Template.configureLoginServiceDialogForSoundCloud.fields = function () {
  return [
  { property: 'clientId', label: 'Client ID' },
  { property: 'secret', label: 'Client Secret' }
  ];
};
