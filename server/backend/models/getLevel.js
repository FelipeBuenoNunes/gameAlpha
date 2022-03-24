const configDb = require("../config/configDb");

class result {
  constructor(level, pieces) {
    level.stage = level.stage.stage;
    level.pieces = pieces.map(elem => {
      elem.shape = elem.shape.shape;
      return elem;
    });
    this.returnn = level;
  }
}

module.exports = async (lvl) => {
  try {
    return new result(
      (await configDb.query(`
        SELECT 
          "levels"."level",
          "difficulty"."difficulty",
          "levels"."stage"
        FROM "levels"
          JOIN "difficulty" ON "difficulty"."id" = "levels"."id_difficulty"
          WHERE "levels"."level" = ${lvl}`)).rows[0],
      (await configDb.query(`
        SELECT
          "pieces"."id",
          "shapes".shape,
          "pieces"."deg"
        FROM "pieces"
          JOIN "shapes" ON "shapes".id = "pieces"."id_shape"
          WHERE "pieces"."id_levels" = ${lvl}`)).rows).returnn;
  } catch (e) {
    console.log(e);
    return "Error"
  }
}