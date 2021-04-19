//CRUD create read update delete delete

const mongodb = require("mongodb");
const { MongoClient, ObjectId } = mongodb;

const connectionURL = "mongodb://127.0.0.1:27017";

const databaseName = "findMyRestaurant";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to MongoDB");
    }
    console.log("Connected correctly");

    const db = client.db(databaseName);

    /* 

    // --- 1.1 ---
    db.collection("Restaurant")
      .find()
      .toArray((error, result) => {
        if (error) {
          return console.log("Unable to fetch");
        }
        console.log(result);
      });

    // --- 1.2 ---
    db.collection("Restaurant")
      .find({ cuisine: "indian" })
      .toArray((error, result) => {
        if (error) {
          return console.log("Unable to fetch");
        }
        console.log(result);
      });

    // --- 1.3 ---
    db.collection("Restaurant")
      .find({ kosher: true })
      .toArray((error, result) => {
        if (error) {
          return console.log("Unable to fetch");
        }
        console.log(result);
      });

    // --- 1.4 ---
    db.collection("Restaurant")
      .find({ "address.city": "Holon" })
      .toArray((error, result) => {
        if (error) {
          return console.log("Unable to fetch");
        }
        console.log(result);
      });

    // --- 1.5 +  1.6 ---
    db.collection("Restaurant").findOne({ name: "bombay" }, (error, result) => {
      if (error) {
        return console.log("Unable to fetch");
      }
      console.log(
        result.address.street +
          " - " +
          result.address.city +
          " : " +
          result.address.coordinates
      );
    });

    // --- 1.7 ---
    db.collection("Restaurant")
      .find()
      .sort({ name: 1 })
      .toArray((error, result) => {
        if (error) {
          return console.log("Unable to fetch");
        }
        console.log(result);
      });

    // --- 1.8 ---
    db.collection("Restaurant")
      .find({ "address.city": "Holon" })
      .sort({ name: 1 })
      .toArray((error, result) => {
        if (error) {
          return console.log("Unable to fetch");
        }
        console.log(result);
      });

    // --- 1.9 ---
    const updatePromise = db
      .collection("Restaurant")
      .updateOne(
        { name: "falafel 5 shekels" },
        { $set: { name: "falafel 7 shekels" } }
      );

    updatePromise
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    // --- 1.10 ---
    const updatePromise = db.collection("Restaurant").updateOne(
      { name: "asian delight" },
      {
        $set: {
          "reviews.3": {
            date: new Date("2019-01-01T00:00:00.000Z"),
            score: 6.0,
          },
        },
      }
    );

    updatePromise
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    // --- 1.11 ---
    db.collection("Restaurant")
      .updateMany({}, { $set: { kosher: true } })
      .then((result) => {
        console.log(result.modifiedCount);
      })
      .catch((error) => {
        console.log(error);
      });

    // --- 1.12 ---
    db.collection("Restaurant")
      .deleteOne({ _id: new ObjectId("607d89166996aaa22c277759") })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    // --- 1.13 ---
    db.collection("Restaurant")
      .deleteMany({})
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    // --- 1.14  + 1.15---
    db.collection("Restaurant")
      .updateOne(
        { _id: new ObjectId("607dccc7a6f81142daa49773") },
        { $inc: { "reviews.0.score": 2 } }
      )
      .then((result) => {
        console.log(result.modifiedCount);
      })
      .catch((error) => {
        console.log(error);
      });

    // --- 2.2 ---
    db.collection("Restaurant")
      .find()
      .forEach(function (restart) {
        console.log("city: " + restart.address.city);
      });
   
    // --- 3.1 ---
    db.collection("Restaurant")
      .find({ name: { $regex: "bo" } })
      .toArray((error, result) => {
        if (error) {
          return console.log("Unable to fetch");
        }
        console.log(result);
      });

    // --- 3.2 ---
    db.collection("Restaurant")
      .find()
      .count()
      .then((res) => {
        console.log(res);
      });
    */

    // --- 3.3 ---
    db.collection("Restaurant")
      .find()
      .forEach(function (restart) {
        dates = restart.reviews.map((review) => review.date);

        const haveReview = dates.some((date) =>
          isSameDate(new Date("2020-01-01"), date)
        );

        if (haveReview) console.log(restart.name);
      });
  }
);

function isSameDate(a, b) {
  return Math.abs(a - b) < 1000 * 3600 * 24 && a.getDay() === b.getDay();
}
