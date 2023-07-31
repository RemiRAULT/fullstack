const sql = require("./db.js");

// constructor
const Etape = function(etape) {
  this.date= etape.date;
  this.etape= etape.etape;
  this.km= etape.km;
  this.type= etape.type;
  this.remarque= etape.remarque;
};

Etape.create = (newEtape, result) => {
  sql.query("INSERT INTO etape SET ?", newEtape, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created etape: ", { id: res.insertId, ...newEtape });
    result(null, { id: res.insertId, ...newEtape });
  });
};

Etape.findById = (id, result) => {
  sql.query(`SELECT * FROM etape WHERE numero = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found etape: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found etape with the id
    result({ kind: "not_found" }, null);
  });
};

Etape.getAll = (Date, result) => {
  let query = "SELECT * FROM etape";

  if (Date) {
    query += ` WHERE Date LIKE '%${Date}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("etape: ", res);
    result(null, res);
  });
};

Etape.getAllPublished = result => {
  sql.query("SELECT * FROM etape WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("etape: ", res);
    result(null, res);
  });
};

Etape.updateById = (id, etape, result) => {
  sql.query(
    "UPDATE etape SET date = ?, etape = ?, km = ?, type = ?, remarque = ? WHERE numero = ?",
    [etape.date, etape.etape, etape.km, etape.type, etape.remarque,id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found etape with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated etape: ", { id: id, ...etape });
      result(null, { id: id, ...etape });
    }
  );
};

Etape.remove = (id, result) => {
  sql.query("DELETE FROM etape WHERE numero = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found etape with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted etape with id: ", id);
    result(null, res);
  });
};

Etape.removeAll = result => {
  sql.query("DELETE FROM etape", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} etape`);
    result(null, res);
  });
};

module.exports = Etape;