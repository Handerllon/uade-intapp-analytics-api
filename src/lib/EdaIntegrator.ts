import { Client } from "@stomp/stompjs";
import { WebSocket } from "ws";
import { AdminPersonalStrategy } from "./Strategy/Strategies/AdminPersonalStrategy";
import { AnaliticaStrategy } from "./Strategy/Strategies/AnaliticaStrategy";
import { CoreBancarioStrategy } from "./Strategy/Strategies/CoreBancarioStrategy";
import { CoreContableStrategy } from "./Strategy/Strategies/CoreContableStrategy";
import { MarketplaceStrategy } from "./Strategy/Strategies/MarketplaceStrategy";
import { RobotStrategy } from "./Strategy/Strategies/RobotsStrategy";
import { UsuariosStrategy } from "./Strategy/Strategies/UsuariosStrategy";

var fs = require('fs')
Object.assign(global, { WebSocket });

export class EDA{

    private brokerURL: string
    private client: Client
    private adminPersonalStrategy: AdminPersonalStrategy
    private analiticaStrategy: AnaliticaStrategy
    private coreBancarioStrategy: CoreBancarioStrategy
    private coreContableStrategy: CoreContableStrategy
    private marketplaceStrategy: MarketplaceStrategy
    private robotStrategy: RobotStrategy
    private usuariosStrategy: UsuariosStrategy


    public initialize(){
        console.log("Initializing Strategy Constructors...")
        this.adminPersonalStrategy = new AdminPersonalStrategy
        this.analiticaStrategy = new AnaliticaStrategy
        this.coreBancarioStrategy = new CoreBancarioStrategy
        this.coreContableStrategy = new CoreContableStrategy
        this.marketplaceStrategy = new MarketplaceStrategy
        this.robotStrategy = new RobotStrategy
        this.usuariosStrategy = new UsuariosStrategy

        console.log("Initializing EDA connection...")
        this.brokerURL = "ws://intappscore.azurewebsites.net/analitica"
        this.eda_init()
        this.client.activate()
        console.log("Finished EDA init...")
    }

	private parseJson(jsonString: string): any {
		const parsedObject = JSON.parse(jsonString, (key, value) => {
		  if (typeof value === 'string') {
			try {
			  // Attempt to parse the value as JSON
			  return JSON.parse(value);
			} catch (error) {
			  // If parsing fails, return the original string value
			  return value;
			}
		  }
		  return value;
		});
		return parsedObject;
	  }

    private process_analytics(data: string){
        const jsonData = this.parseJson(data)

        try{
          	this.analiticaStrategy.processLog(jsonData.content)
        }
        catch (err){
			console.log(err.message)
			fs.appendFile('logs.txt', data + "\n", function (err) {
				if (err) {
					console.log("EDA Analytics error" + err.message)
				}
			})
        }
    }

    private process_robots(data: string){
        const jsonData = this.parseJson(data)

        try{
          	this.robotStrategy.processLog(jsonData.content)
        }
        catch (err){
			console.log(err.message)
			fs.appendFile('logs.txt', data + "\n", function (err) {
				if (err) {
					console.log("EDA Robots error" + err.message)
				}
			})
        }
    }

    private process_core_bancario(data: string){
		const jsonData = this.parseJson(data)

        try{
          	this.coreBancarioStrategy.processLog(jsonData.content)
        }
        catch (err){
			console.log(err.message)
			fs.appendFile('logs.txt', data + "\n", function (err) {
				if (err) {
					console.log("EDA Core Bancario error" + err.message)
				}
			})
        }
    }

    private process_core_contable(data: string){
		const jsonData = this.parseJson(data)

        try{
          	this.coreContableStrategy.processLog(jsonData.content)
        }
        catch (err){
			console.log(err.message)
			fs.appendFile('logs.txt', data + "\n", function (err) {
				if (err) {
					console.log("EDA Core Contable error" + err.message)
				}
			})
        }
    }

    private process_marketplace(data: string){
		const jsonData = this.parseJson(data)

        try{
          	this.marketplaceStrategy.processLog(jsonData.content)
        }
        catch (err){
			console.log(err.message)
			fs.appendFile('logs.txt', data + "\n", function (err) {
				if (err) {
					console.log("EDA Marketplace error" + err.message)
				}
			})
        }
    }

    private process_usuarios(data: string){
		const jsonData = this.parseJson(data)

        try{
          	this.usuariosStrategy.processLog(jsonData.content)
        }
        catch (err){
			console.log(err.message)
			fs.appendFile('logs.txt', data + "\n", function (err) {
				if (err) {
					console.log("EDA Usuarios error" + err.message)
				}
			})
        }
    }

    private process_admin_personal(data: string){
		const jsonData = this.parseJson(data)

        try{
          	this.adminPersonalStrategy.processLog(jsonData.content)
        }
        catch (err){
			console.log(err.message)
			fs.appendFile('logs.txt', data + "\n", function (err) {
				if (err) {
					console.log("EDA Admin Personal error" + err.message)
				}
			})
        }
    }

    // Vamos a quedarnos escuchando las diferentes colas aca
    // Como no sabemos la info que nos va a llegar, vamos a meter todos los mensajes
    // en un archivo hasta que sepamos procesarlos todos
    private eda_init(){
        this.client = new Client({
            brokerURL: this.brokerURL,
            onConnect: (frame) => {
                // Sub a Analytics
                var sub_analytics = this.client.subscribe("/topic/analitica",(message) => this.process_analytics(message.body));
                
                // Sub a Robots
                var sub_robots = this.client.subscribe("/topic/robots",(message) => this.process_robots(message.body));

                // Sub a Core Bancario
                var sub_core_bancario = this.client.subscribe("/topic/core-bancario",(message) => this.process_core_bancario(message.body));

                // Sub a Core Contable
                var sub_core_contable = this.client.subscribe("/topic/core-contable",(message) => this.process_core_contable(message.body));

                // Sub a Marketplace
                var sub_marketplace = this.client.subscribe("/topic/marketplace",(message) => this.process_marketplace(message.body));

                // Sub a Usuarios
                var sub_usuarios = this.client.subscribe("/topic/usuarios",(message) => this.process_usuarios(message.body));

                // Sub a Adm de personal
                var sub_adm_pesonal = this.client.subscribe("/topic/admin-personal",(message) => this.process_admin_personal(message.body));
            },
            onDisconnect: () => {
                console.log("Disconnected from websocket");
            },
            onStompError: (frame) => {
                console.log("Broker reported error: " + frame.headers["message"]);
                console.log("Additional details: " + frame.body);
            },
        });
    }
}