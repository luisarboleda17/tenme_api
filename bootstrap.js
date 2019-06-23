/**
 * Created by Luis Arboleda on 23 Jun, 2019.
 * Script to create AWS DynamoDB tables if they doesnt exist
 */

const aws = require('aws-sdk');

module.exports = () => new Promise(
  (resolve, reject) => {
    aws.config.update({
      region: "us-west-2",
      endpoint: "http://localhost:8000"
    });

    var client = new aws.DynamoDB();
    var documentClient = new aws.DynamoDB.DocumentClient();

    var tableName = "Movies";

    var params = {
      TableName: tableName,
      KeySchema: [
        { AttributeName: "year", KeyType: "HASH"},  //Partition key
        { AttributeName: "title", KeyType: "RANGE" }  //Sort key
      ],
      AttributeDefinitions: [
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
      }
    };

    client.createTable(params, function(tableErr, tableData) {
      if (tableErr) {
        console.error("Error JSON:", JSON.stringify(tableErr, null, 2));
      } else {
        console.log("Created table successfully!");
      }

      // Adding Batman movie to our collection
      var params = {
        TableName: tableName,
        Item: {
          "year": 2005,
          "title": "Batman Begins",
          "info": {
            "plot": "A young Bruce Wayne (Christian Bale) travels to the Far East.",
            "rating": 0
          }
        }
      };

      console.log("Adding a new item...");
      documentClient.put(params, function(err, data) {
        if (err) {
          console.error("Error JSON:", JSON.stringify(err, null, 2));
        } else {
          console.log("Added item successfully!");




          var table = "Movies";

          var year = 2005;
          var title = "Batman Begins";

          var params = {
            TableName: table,
            Key:{
              "year": year,
              "title": title
            }
          };

          documentClient.get(params, function(err, data) {
            if (err) {
              console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
              console.log("GetItem succeeded:", JSON.stringify(data, null, 2));

              resolve();
            }
          });




        }
      });
    });
  }
);
