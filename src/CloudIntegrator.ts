import { DynamoDB, config } from "aws-sdk";
import { ROBOT_TABLE } from "./Constants";

export class AwsManager{

    // La idea de este método es que genere todos los recursos de AWS
    // necesarios al iniciar la aplicación
    public initialize(){

        console.log("Initializing AWS configure")
        config.update({region: "us-east-1"})
        const dynamoClient = new DynamoDB()

        console.log("Checking tables...")
        // Verificamos si existe la tabla de información de robots, si no, la creamos
        this.checkTable(ROBOT_TABLE, dynamoClient)
    }

    private checkTable(tableName: string, dynamoClient: DynamoDB){
        dynamoClient.describeTable({TableName: tableName}, async (err, data) => {
            if (err) {
                if (err.code === 'ResourceNotFoundException') {
                    console.log(`Table '${tableName}' does not exist, creating...`);
                    await this.createTable(tableName, dynamoClient)
                } else {
                    console.error('Error describing table:', err);
                }
              } else {
                    console.log(`Table '${tableName}' exists.`);
              }
        })
    }

    private async createTable(tableName: string, dynamoClient: DynamoDB): Promise<any>{
        const params = {
            TableName: tableName,
            KeySchema: [
              { AttributeName: 'eventId', KeyType: 'HASH' }, // Primary key (hash)
              { AttributeName: 'createdDate', KeyType: 'RANGE' } // Sort key (range)
            ],
            AttributeDefinitions: [
              { AttributeName: 'eventId', AttributeType: 'S' }, // Attribute type (String)
              { AttributeName: 'createdDate', AttributeType: 'N' } // Attribute type (Number)
            ],
            ProvisionedThroughput: {
              ReadCapacityUnits: 5, // Adjust as needed
              WriteCapacityUnits: 5 // Adjust as needed
            }
        };

        // Create the DynamoDB table
        dynamoClient.createTable(params, (err, data) => {
            if (err) {
                console.error('Error creating table:', err);
            } else {
                console.log(`Table '${tableName}' created successfully`);
            }
        });
    }
}