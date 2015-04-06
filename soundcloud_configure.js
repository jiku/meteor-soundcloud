Template.configureLoginServiceDialogForSoundcloud.helpers({
  siteUrl: function () {
    // SoundCloud doesn't recognize localhost as a domain name
    return Meteor.absoluteUrl({ replaceLocalhost: true });
  }
});

Template.configureLoginServiceDialogForSoundcloud.fields = function () {
  return [
  { property: 'clientId', label: 'Client ID' },
  { property: 'secret', label: 'Client Secret' }
  ];
};
