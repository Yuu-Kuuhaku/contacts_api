# Foobar

contacts api developed for college work.

## Installation

1. Clone the repository
 
1. Install the dependencies

```bash

  npm install

```
1. Create the .env file in the project root and add the `DATABASE_URL`

ex: `DATABASE_URL=mysql://user:password@localhost:3306/db-test`

1. To configure the database tables use the command below

```bash

  npx prisma db push

```

1. run `npm start`

## Usage

```python
import foobar

# returns 'words'
foobar.pluralize('word')

# returns 'geese'
foobar.pluralize('goose')

# returns 'phenomenon'
foobar.singularize('phenomena')
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)