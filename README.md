## Caravan

| HTTP Verb | URI                  | Request Body | Response Body | Purpose |
|-----------|----------------------|--------------|---------------|---------|
| **ADDRESS**|                     |              |               |         |
| GET       | `/api/addresses`      |              | Collection of representations of all _addresses_  | **List** or **collection** endpoint |
| GET       | `/api/addresses/3`   |              | Representation of _address_ `3` | **Retrieve** endpoint |
| POST      | `/api/addresses`      | Representation of a new _address_ | Description of the result of the operation | **Create** endpoint |
| PUT       | `/api/addresses/3`   | Representation of a new version of address `3` | | **Replace** endpoint |
| DELETE    | `/api/addresses/3`   |              | | **Delete** route |
| **ADVENTURE-CALENDARS**|                     |              |               |         |
| GET       | `/api/adventure-calendars`      |              | Collection of representations of all _adventure-calendars_  | **List** or **collection** endpoint |
| GET       | `/api/adventure-calendars/3`   |              | Representation of _adventure-calendar_ `3` | **Retrieve** endpoint |
| POST      | `/api/adventure-calendars`      | Representation of a new _adventure-calendar_  | Description of the result of the operation | **Create** endpoint |
| PUT       | `/api/adventure-calendars/3`   | Representation of a new version of adventure-calendar `3` | | **Replace** endpoint |
| DELETE    | `/api/adventure-calendars/3`   |              | | **Delete** route |
| **ADVENTURES**|                     |              |               |         |
| GET       | `/api/adventures`      |              | Collection of representations of all _adventures_  | **List** or **collection** endpoint |
| GET       | `/api/adventures/3`   |              | Representation of _adventure_ `3` | **Retrieve** endpoint |
| POST      | `/api/adventures`      | Representation of a new _adventures_  | Description of the result of the operation | **Create** endpoint |
| PUT       | `/api/adventures/3`   | Representation of a new version of adventure `3` | | **Replace** endpoint |
| DELETE    | `/api/adventures/3`   |              | | **Delete** route |
| **CATEGORIES**|                     |              |               |         |
| GET       | `/api/categories`      |              | Collection of representations of all _categories_  | **List** or **collection** endpoint |
| GET       | `/api/categories/3`   |              | Representation of _category_ `3` | **Retrieve** endpoint |
| POST      | `/api/categories`      | Representation of a new _category_  | Description of the result of the operation | **Create** endpoint |
| PUT       | `/api/categories/3`   | Representation of a new version of category `3` | | **Replace** endpoint |
| DELETE    | `/api/categories/3`   |              | | **Delete** route |
| **IMAGES**|                     |              |               |         |
| GET       | `/api/images`      |              | Collection of representations of all _images_  | **List** or **collection** endpoint |
| GET       | `/api/images/3`   |              | Representation of _image_ `3` | **Retrieve** endpoint |
| POST      | `/api/images`      | Representation of a new _image_  | Description of the result of the operation | **Create** endpoint |
| PUT       | `/api/images/3`   | Representation of a new version of image `3` | | **Replace** endpoint |
| DELETE    | `/api/images/3`   |              | | **Delete** route |
| **TRIP-CALENDARS**|                     |              |               |         |
| GET       | `/api/tripCalendars`      |              | Collection of representations of all _tripCalendars_  | **List** or **collection** endpoint |
| GET       | `/api/tripCalendars/3`   |              | Representation of _tripCalendar_ `3` | **Retrieve** endpoint |
| POST      | `/api/tripCalendars`      | Representation of a new _tripCalendar_  | Description of the result of the operation | **Create** endpoint |
| PUT       | `/api/tripCalendars/3`   | Representation of a new version of tripCalendar `3` | | **Replace** endpoint |
| DELETE    | `/api/tripCalendars/3`   |              | | **Delete** route |
| **TRIPS**|                     |              |               |         |
| GET       | `/api/trips`      |              | Collection of representations of all _trips_  | **List** or **collection** endpoint |
| GET       | `/api/trips/3`   |              | Representation of _trip_ `3` | **Retrieve** endpoint |
| POST      | `/api/trips`      | Representation of a new _trip_  | Description of the result of the operation | **Create** endpoint |
| PUT       | `/api/trips/3`   | Representation of a new version of trip `3` | | **Replace** endpoint |
| DELETE    | `/api/trips/3`   |              | | **Delete** route |
| **HOSTS**|                     |              |               |         |
| GET       | `/api/hosts`      |              | Collection of representations of all _hosts_  | **List** or **collection** endpoint |
| GET       | `/api/hosts/3`   |              | Representation of _host_ `3` | **Retrieve** endpoint |
| POST      | `/api/hosts`      | Representation of a new _host_  | Description of the result of the operation | **Create** endpoint |
| PUT       | `/api/hosts/3`   | Representation of a new version of host `3` | | **Replace** endpoint |
| DELETE    | `/api/hosts/3`   |              | | **Delete** route |
| **MESSAGES**|                     |              |               |         |
| GET       | `/api/messages/3`      |              | Collection of representations of all _messages_  | **List** or **collection** endpoint |
| GET       | `/api/messages/3`   |              | Representation of _message_ `3` | **Retrieve** endpoint |
| POST      | `/api/messages`      | Representation of a new _message_  | Description of the result of the operation | **Create** endpoint |
| PUT       | `/api/messages/3`   | Representation of a new version of message `3` | | **Replace** endpoint |
| DELETE    | `/api/messages/3`   |              | | **Delete** route |
| **TRIP-TRAVELER**|                     |              |               |         |
| GET       | `/api/tripTravelers`      |              | Collection of representations of all _tripTravelers_  | **List** or **collection** endpoint |
| GET       | `/api/tripHostTravelers`      |              | Collection of representations of all _tripHostTravelers_  | **List** or **collection** endpoint |
| GET       | `/api/tripTravelers/3`   |              | Representation of _tripTraveler_ `3` | **Retrieve** endpoint |
| POST      | `/api/trips/3/tripTravelers`      | Representation of a new _tripTraveler_  for trip 3 | Description of the result of the operation | **Create** endpoint |
| PUT       | `/api/tripTravelers/3`   | Representation of a new version of tripTraveler `3` | | **Replace** endpoint |
| DELETE    | `/api/tripTravelers/3`   |              | | **Delete** route |
| **USER**|                     |              |               |         |
| GET       | `/api/users`      |              | Collection of representations of all _users_  | **List** or **collection** endpoint |
| GET       | `/api/users/3`   |              | Representation of _users_ `3` | **Retrieve** endpoint |
| GET       | `/api/userSession`   |              | Representation of _userSession_  | **Retrieve** endpoint |
| POST      | `/api/users`      | Representation of a new _user_  | Description of the result of the operation | **Create** endpoint |
| PUT       | `/api/users/3`   | Representation of a new version of user `3` | | **Replace** endpoint |
| DELETE    | `/api/users/3`   |              | | **Delete** route |
| **USER-PROFILES**|                     |              |               |         |
| GET       | `/api/userProfiles`      |              | Collection of representations of all _userProfiles_  | **List** or **collection** endpoint |
| GET       | `/api/userProfiles/username`   |              | Representation of _userProfile_ `username` | **Retrieve** endpoint |
| GET       | `/api/homeProfile`   |              | Representation of _homeProfile_  | **Retrieve** endpoint |
| POST      | `/api/userProfiles`      | Representation of a new _userProfile_  | Description of the result of the operation | **Create** endpoint |
| PUT       | `/api/userProfiles/3`   | Representation of a new version of userProfile `3` | | **Replace** endpoint |
| DELETE    | `/api/userProfiles/3`   |              | | **Delete** route |
| **VEHICLE**|                     |              |               |         |
| GET       | `/api/vehicles`      |              | Collection of representations of all _vehicles_  | **List** or **collection** endpoint |
| GET       | `/api/vehicles/user`   |              | Representation of _vehicle_ `user` | **Retrieve** endpoint |
| GET       | `/api/vehicles/3`   |              | Representation of _vehicle_ `3` | **Retrieve** endpoint |
| POST      | `/api/vehicles`      | Representation of a new _vehicle_ | Description of the result of the operation | **Create** endpoint |
| PUT       | `/api/vehicles/3`   | Representation of a new version of vehicle `3` | | **Replace** endpoint |
| DELETE    | `/api/vehicles/3`   |              | | **Delete** route |
