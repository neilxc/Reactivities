export const combineDateAndTime = (date, time) => {
  const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Jan is 0
  const day = date.getDate();
  const dateString = year + '-' + month + '-' + day;
  return new Date(dateString + ' ' + timeString);
};

export const isEmpty = object => Object.keys(object).length === 0;

export const setActivityProps = (activity, user) => {
  activity.date = new Date(activity.date);
  activity.isGoing = activity.attendees.some(a => a.username === user.username);
  activity.isHost = activity.attendees.some(
    a => a.username === user.username && a.isHost === true
  );
  activity.host = activity.attendees.find(a => a.isHost === true);
  activity.followingCount = activity.attendees.reduce((n, attendee) => {
    return n + (attendee.following === true);
  }, 0);
  return activity;
};

export const setProfileProps = (profile) => {
  if (profile.dateOfBirth) profile.dateOfBirth = new Date(profile.dateOfBirth);
  profile.photos && profile.photos.forEach(photo => {
    photo.dateAdded = new Date(photo.dateAdded);
  });
  return profile;
}

export const createAttendee = (user) => {
  return {
    dateJoined: new Date(),
    displayName: user.displayName,
    isHost: false,
    username: user.username,
    image: user.image
  }
}