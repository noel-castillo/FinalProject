## Caravan

| HTTP Verb | URI                  | Request Body | Response Body | Purpose |
|-----------|----------------------|--------------|---------------|---------|
| **Address**|                     |              |               |         |
| GET       | `/api/addresses`      |              | Collection of representations of all _addresses_  | **List** or **collection** endpoint |
| GET       | `/api/addresses/3`   |              | Representation of _address_ `3` | **Retrieve** endpoint |
| POST      | `/api/addresses`      | Representation of a new _address_ log | Description of the result of the operation | **Create** endpoint |
| PUT       | `/api/addresses/3`   | Representation of a new version of address `3` | | **Replace** endpoint |
| DELETE    | `/api/addresses/3`   |              | | **Delete** route |
