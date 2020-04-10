import database from '../src/database';

export default function truncate(tables) {
  return Promise.all(
    Object.keys(database.connection.models).map((key) => {
      if (tables.includes(key)) {
        return database.connection.models[key].destroy({
          force: true,
          truncate: true,
        });
      }
      return database.connection.models[key];
    })
  );
}
