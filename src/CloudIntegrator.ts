import { DynamoDB, RDS, config } from "aws-sdk";
import { CORE_CONTABLE_TABLE, MARKETPLACE_TABLE, ROBOT_TABLE, USER_ADM_TABLE } from "./Constants";
import { Bool } from "aws-sdk/clients/clouddirectory";

export class AwsManager{

    // La idea de este método es que genere todos los recursos de AWS
    // necesarios al iniciar la aplicación
    public initialize(){

        console.log("Initializing AWS configure")
        config.update({region: "us-east-1"})

        this.mssql_init()  
    }


    private async mssql_init(){
        try{
            const rdsClient = new RDS()

            //if (await this.check_rds(rdsClient, process.env.RDS_DB_NAME)) throw new Error("RDS instance already exists").

            const params = {
                DBInstanceIdentifier: 'instance01',
                AllocatedStorage: 10,  // Adjust the storage size as needed
                DBInstanceClass: 'db.t2.micro',  // Choose the appropriate instance type
                Engine: 'sqlserver',  // Specify the MSSQL engine
                MasterUsername: 'batmanthebest',
                MasterUserPassword: 'YlX|vd/}Mr8wytZQ',
                MultiAZ: false,  // Set to true if you want Multi-AZ deployment
                DBName: 'logsdb',  // Name of the new database
                BackupRetentionPeriod: 7,  // Set backup retention period
                PreferredBackupWindow: '00:00-00:30',  // Set preferred backup window
                PubliclyAccessible: true,  // Adjust as needed
                StorageType: 'gp2',  // Choose the storage type
                //VpcSecurityGroupIds: ['security-group-id'],  // Specify security group(s)
                Tags: [
                    {
                    Key: 'Name',
                    Value: 'Log DB',
                    },
                ],
            };

             rdsClient.createDBInstance(params, (err, data) => {
                if (err) {
                    console.error("Error creating RDS instance:", err);
                } else {
                    console.log("RDS instance created successfully:", data.DBInstance.DBInstanceIdentifier);
                }
                console.log('db creada...')
            });


        }catch(err){
            console.error(err)
        }
    }

    private async check_rds(rdsClient: RDS, databaseName: string): Promise<any> {
        const params = {
            DBInstanceIdentifier: databaseName,
          };

        rdsClient.describeDBInstances(params, (err, data) => {
            if (err) {
                console.error("Error checking RDS instance:", err);
            } else {
                const dbInstances = data.DBInstances;
                
                if (dbInstances.length === 0) {
                    console.log(`RDS instance with identifier '${databaseName}' does not exist.`);
                    return false
                } else {
                    console.log(`RDS instance with identifier '${databaseName}' already exists.`);
                    return true
                // You can further inspect 'dbInstances' to gather more information about the existing instance.
                }
            }
        });
    }

    private dynamo_init(){
        const dynamoClient = new DynamoDB()
        console.log("Initializing DynamoDB configuration...")
        console.log("Checking tables...")
        // Verificamos si existe las distintas tablas. Si no, las creamos
        this.checkTable(ROBOT_TABLE, dynamoClient)
        this.checkTable(CORE_CONTABLE_TABLE, dynamoClient)
        this.checkTable(MARKETPLACE_TABLE, dynamoClient)
        this.checkTable(USER_ADM_TABLE, dynamoClient)
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