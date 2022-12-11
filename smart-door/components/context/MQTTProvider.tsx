import { useAppSelector } from 'hooks';
import React, { createContext, memo, useEffect, useMemo, useState } from 'react'
import mqtt from 'mqtt'

type Props = {
    children: React.ReactNode;
}

const client = mqtt.connect(process.env.NEXT_PUBLIC_MQTT_URL || "", {
    host: process.env.NEXT_PUBLIC_MQTT_URL || "",
    clientId: `mqtt_234567`,
    keepalive: 60,
    // reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    username: "KhangPhamThe",
    password: "headingtonz",
    protocol: "mqtts",
    port: 443,    
});

const topics = [
    "KhangPhamThe/feeds/dadn.door",
    "KhangPhamThe/feeds/dadn.ppl-out",
    "KhangPhamThe/feeds/dadn.ppl-in",
    "KhangPhamThe/feeds/dadn.led",
    "KhangPhamThe/feeds/dadn.allow",
    "KhangPhamThe/feeds/dadn.light",
]

const MQTTContext = createContext({});

export const MQTTProvider = (props: Props) => {    
    const currUserSelection = useAppSelector(state => state.user);
    
    useEffect(() => {
        if (currUserSelection) {
            client.on('connect', () => {
                console.log('connected to adafruit')
                client.subscribe(topics, () => {
                    console.log("subscribed to all board")
                })
            });
            client.on('message', (topic:any, payload:any) => {
                console.log("received message", topic, payload.toString())
            });
        }
    }, [currUserSelection])
    
    return (
        <MQTTContext.Provider value={{}}>
          {props.children}
        </MQTTContext.Provider>
      );
  
}

export default MQTTContext;