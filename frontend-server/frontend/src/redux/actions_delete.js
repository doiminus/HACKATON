export const setOrganizations = (organizations) => ({
    type: 'SET_ORGANIZATIONS',
    payload: organizations,
});

export const setEvents = (events) => ({
    type: 'SET_EVENTS',
    payload: events,
});

export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
});

export const logout = () => ({
    type: 'LOGOUT',
});


export const ADD_ORGANIZATION = 'ADD_ORGANIZATION';
export const ADD_EVENT = 'ADD_EVENT';

export const addOrganization = (organization) => ({
    type: ADD_ORGANIZATION,
    payload: organization,
});
export const addEvent = (event) => ({
    type: ADD_EVENT,
    payload: event,
});
